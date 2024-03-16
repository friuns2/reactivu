import React, { useState } from 'react';
/**
 * Custom hook that mimics Vue's reactivity system within a React component by using a Proxy.
 * This hook allows for the state to be directly mutated while still triggering React's state updates.
 * 
 * @param {Object} initialState - The initial state object that the component will use. This object
 *                                can contain nested properties, which will also be made reactive.
 * @returns {Proxy} A proxy-wrapped version of the state. This proxy intercepts and handles all
 *                  operations performed on the state object, ensuring the component re-renders
 *                  appropriately when the state changes.
 */

export default function useVueLikeReactivity(initialState) {
 

    const [state, setState] = useState(JSON.parse(JSON.stringify(initialState)));//todo get underlying object of proxy
  
    const updateState = (path, value) => {
      setState((currentState) => {
        let newState = { ...currentState };
        let currentLevel = newState;
        path.slice(0, -1).forEach((key) => {
          if (!currentLevel[key] || typeof currentLevel[key] !== 'object') {
            currentLevel[key] = {};
          }
          currentLevel[key] = Array.isArray(currentLevel[key]) ? [...currentLevel[key]] : { ...currentLevel[key] };
          currentLevel = currentLevel[key];
        });
        const lastKey = path[path.length - 1];
        if (Array.isArray(currentLevel[lastKey])) {
          currentLevel[lastKey] = [...currentLevel[lastKey], ...value];
        } else {
          currentLevel[lastKey] = value;
        }
        return newState;
      });
    };
  
    const createProxy = (target, path = []) => {
      return new Proxy(target, {
        get(target, property) {
  
          if (typeof target[property] === 'object' && target[property] !== null) {
            //console.log('target[property]', target[property]);
            return createProxy(target[property], path.concat(property));
          }
          return target[property];
        },
        set(target, property, value) {
          const newPath = path.concat(property);
          updateState(newPath, value);
          return true;
        },
        // Handling array operations like 'push' specially
        apply(target, thisArg, argumentsList) {
          if (typeof target === 'function') {
            const result = Reflect.apply(target, thisArg, argumentsList);
            // Trigger state update only for operations that modify the array
            if (['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].includes(target.name)) {
              updateState(path, thisArg);
            }
            return result;
          }
        }
      });
    };
  
    return createProxy(state);
  }