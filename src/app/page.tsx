// app/page.tsx (or your main Home.tsx)
"use client";
import { useState } from "react";
import Login from  "../components/login";
import Posts from "../components/posts";

interface User {
  username: string;
  password: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
      backgroundImage: "url('assets/bg2.jpg')",
      }}
    >
      <nav className="bg-black/60 p-4 flex justify-between">
      <h1 className="text-2xl font-bold">LET'S BLOG</h1>
      {user && (
        <button
        onClick={() => setUser(null)}
        className="bg-red-500 px-3 py-1 rounded"
        >
        Logout
        </button>
      )}
      </nav>

      <div className="max-w-5xl mx-auto p-6 bg-black/60 mt-6 rounded-xl">
      {!user ? (
        <Login users={users} setUsers={setUsers} setUser={setUser} />
      ) : (
        <Posts user={user} />
      )}
      </div>

      <footer className="bg-black/60 text-center py-4 mt-10">
      <p>© {new Date().getFullYear()} Let's Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
