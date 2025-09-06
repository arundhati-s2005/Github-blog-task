
"use client";

import { useState } from "react";

interface User {
  username: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  // Mock login
  const handleLogin = (username: string) => setUser({ username });
  const handleLogout = () => setUser(null);

  // Create post
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

  // Filter posts
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="font-sans max-w-2xl mx-auto p-6 bg-blue-600 shadow-lg rounded-xl mt-10">
      <h1 className="text-4xl font-bold text-center mb-6">LET'S BLOG</h1>

      {!user ? (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <button
            onClick={() => handleLogin("User1")}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Login as User1
          </button>
          <button
            onClick={() => handleLogin("User2")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login as User2
          </button>
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

      {user && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Create a Post</h3>
          <input
            type="text font-bold"
            placeholder="Title"
            className="border p-2 w-full mb-2 rounded font-sans font-bold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border p-2 w-full mb-2 rounded font-sans font-bold"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            className="border p-2 w-full mb-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General" className="bg-blue-400 text-white font-sans font-semibold">General</option>
            <option value="Tech " className="bg-blue-400 text-white font-sans font-semibold">Tech</option>
            <option value="Life" className="bg-blue-400 text-white font-sans font-semibold">Life</option>
            <option value="Travel" className="bg-blue-400 text-white font-sans font-semibold">Travel</option>
          </select>
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full font-sans font-bold"
          >
            Post
          </button>
        </div>
      )}

      <div className="mb-6 text-white font-sans font-semibold">
        <input
          type="text"
          placeholder="Search posts..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h3 className="text-2xl text-white font-semibold mb-4">All Posts</h3>
      {filteredPosts.length === 0 ? (
        <p className="text-white">No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded mb-4 shadow-sm bg-blue-500 text-white"
          >
            <h4 className="text-xl font-bold">{post.title}</h4>
            <p className="text-white mb-2">{post.content}</p>
            <p className="text-sm text-white">
              By: {post.author} | Category: {post.category}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                {post.likes}
                <img src="assets\likes.png" alt="" />
              </button>
              <button
                onClick={() => handleDislike(post.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                {post.dislikes}
                <img src="assets\Dislikes.png" alt="" />
              </button>
            </div>

            {/* Comment Section */}
            <div className="mt-4">
              <h5 className="font-semibold bg-blue-500 text-white">Comments</h5>
              {post.comments.length === 0 ? (
                <p className="text-sm text-white bg-blue-500">No comments yet.</p>
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
                    className="border p-1 flex-1 rounded"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id, (e.target as HTMLInputElement).value);
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
