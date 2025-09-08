// components/Login.tsx
"use client";
import { useState } from "react";

interface User {
  username: string;
  password: string;
}

interface LoginProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Login({ users, setUsers, setUser }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username || !password) return alert("Fill all fields!");
    if (users.find((u) => u.username === username))
      return alert("User already exists!");
    const newUser = { username, password };
    setUsers([...users, newUser]);
    setUser(newUser);
    setIsSignup(false);
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) return alert("Invalid credentials!");
    setUser(foundUser);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        {isSignup ? "Signup" : "Login"}
      </h2>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-2 rounded text-black w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 rounded text-black w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isSignup ? (
        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      )}
      <p
        className="mt-2 cursor-pointer underline"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "New user? Signup here"}
      </p>
    </div>
  );
}