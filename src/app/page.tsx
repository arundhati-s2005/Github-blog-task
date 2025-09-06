"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication logic (for demonstration purposes only)
    if (username === "user" && password === "password") {
      setLoggedInUser(username);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };
  return (
    <div className="font-sans max-w-xl mx-auto p-6 text-center bg-blue-600 shadow-lg rounded-xl mt-10">
      <h1 className="text-5xl font-bold mb-6">
        Blog Home Page  
      </h1>
      {!loggedInUser ? (
        <div className="mb-6"> 
        <h2 className= "text-3xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
         <div className="flex flex-col text-left">
          <label htmlFor="username" className="mb-1 font-medium">
            Username:
            </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-lg p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
         </div>
         <div className="flex flex-col text-left">
          <label htmlFor="password" className="mb-1 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         </div>
          <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium">
            Login
          </button>
        </form>
      </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {loggedInUser}!</h2>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 font-medium"
          >
            Logout
          </button>
        </div>
      )}
      <p className="mt-4 text-lg ">
        This is a simple blog home page. You can add more content here.
      </p>
    </div>
  );
}
