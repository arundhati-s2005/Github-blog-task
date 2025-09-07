"use client";

import { useState } from "react";

interface User {
  username: string;
  password: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]); // Registered users
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // --- AUTHENTICATION ---
  const handleSignup = () => {
    if (!username || !password) return alert("Enter all fields");
    if (users.find((u) => u.username === username))
      return alert("User already exists!");

    const newUser = { username, password };
    setUsers([...users, newUser]);
    setUser(newUser);
    setUsername("");
    setPassword("");
    setIsSignup(false);
  };

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) return alert("Invalid credentials");

    setUser(foundUser);
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => setUser(null);

  // --- POSTS ---
  const handleCreatePost = () => {
    if (!title || !content || !user) return;

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      category,
      author: user.username,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    setPosts([...posts, newPost]);
    setTitle("");
    setContent("");
    setCategory("General");
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = (id: number, newTitle: string, newContent: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title: newTitle, content: newContent } : post
      )
    );
  };

  // Like & Dislike
  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleDislike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  // Add comment
  const handleAddComment = (id: number, text: string) => {
    if (!user || !text) return;
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), text, author: user.username },
              ],
            }
          : post
      )
    );
  };

  // Search filter
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans max-w-2xl mx-auto p-6 bg-blue-600 shadow-lg rounded-xl mt-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">LET'S BLOG</h1>

      {/* AUTH SECTION */}
      {!user ? (
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
      ) : (
        <div className="mb-6">
          <h2 className="text-xl">Welcome, {user.username}</h2>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {/* CREATE POST */}
      {user && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Create a Post</h3>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-2 rounded text-black font-bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border p-2 w-full mb-2 rounded text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            className="border p-2 w-full mb-2 rounded text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Tech">Tech</option>
            <option value="Life">Life</option>
            <option value="Travel">Travel</option>
          </select>
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full font-bold"
          >
            Post
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="border p-2 w-full rounded text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* POSTS */}
      <h3 className="text-2xl font-semibold mb-4">All Posts</h3>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded mb-4 shadow-sm bg-blue-500"
          >
            <h4 className="text-xl font-bold">{post.title}</h4>
            <p className="mb-2">{post.content}</p>
            <p className="text-sm">
              By: {post.author} | Category: {post.category}
            </p>

            {/* Like/Dislike */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                {post.likes}
                <img src="assets\Likes.png" alt="" />
              </button>
              <button
                onClick={() => handleDislike(post.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                  {post.dislikes}
                  <img src="assets\Dislikes.png" alt="" />
              </button>
            </div>

            {/* Author-only edit/delete */}
            {user?.username === post.author && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() =>
                    handleEditPost(
                      post.id,
                      prompt("New title:", post.title) || post.title,
                      prompt("New content:", post.content) || post.content
                    )
                  }
                  className="bg-yellow-400 text-black px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  🗑 Delete
                </button>
              </div>
            )}

            {/* Comments */}
            <div className="mt-4">
              <h5 className="font-semibold">Comments</h5>
              {post.comments.length === 0 ? (
                <p className="text-sm">No comments yet.</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="text-sm">
                      <strong>{comment.author}: </strong>
                      {comment.text}
                    </li>
                  ))}
                </ul>
              )}

              {user && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="border p-1 flex-1 rounded text-black"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(
                          post.id,
                          (e.target as HTMLInputElement).value
                        );
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
