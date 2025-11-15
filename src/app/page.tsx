import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to My Todo App!</h1>
      <p className="mt-4 text-lg">Get started by adding your tasks.</p>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
         
          <Link href="/auth/signin" className="ml-2">Go to Sign In</Link>
        </button>
      </div>
    </main>
  );
}
