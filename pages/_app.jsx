import "@/styles/globals.css";
import useVueLikeReactivity from '@/components/useVueLikeReactivity';

export default function App({ Component, pageProps }) {
  console.log("init");
  /** @type {typeof globalThis.db} */
  globalThis.db= useVueLikeReactivity(globalThis.db);
  return <Component {...pageProps} />;
}

globalThis.db = {
  todos: [],
  newTodoText: ''

}

