
// app/page.js
import Head from 'next/head';
import TodoList from '../components/TodosList';
import Link from 'next/link';
import useVueLikeReactivity from '@/components/useVueLikeReactivity';
import Completed from './completed';
export default function Page() {   
  return (
    <div>
      <Head>
        <title>Next.js Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Next.js Todo List</h1>

        <TodoList />
        <Link href="/completed">View Completed Todos</Link>

      </main>
    </div>
  );
}
