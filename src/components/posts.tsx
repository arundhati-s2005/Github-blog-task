// components/Posts.tsx
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

interface PostsProps {
  user: User;
}

export default function Posts({ user }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");

  const handleCreatePost = () => {
    if (!title || !content) return;
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
    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setCategory("General");
  };

  const handleDeletePost = (id: number) =>
    setPosts(posts.filter((post) => post.id !== id));

  const handleEditPost = (id: number, newTitle: string, newContent: string) =>
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title: newTitle, content: newContent } : post
      )
    );

  const handleLike = (id: number) =>
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );

  const handleDislike = (id: number) =>
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );

  const handleAddComment = (id: number, text: string) =>
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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl mb-4">Welcome, {user.username} 🎉</h2>

      {/* Create post */}
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

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="border p-2 w-full rounded text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Posts grid */}
      <h3 className="text-2xl font-semibold mb-4">All Posts</h3>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow-md bg-white text-black"
            >
              <h4 className="text-xl font-bold">{post.title}</h4>
              <p className="mb-2">{post.content}</p>
              <p className="text-sm text-gray-600">
                By: {post.author} | Category: {post.category}
              </p>

              {/* Like/Dislike */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  👍 {post.likes}
                </button>
                <button
                  onClick={() => handleDislike(post.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  👎 {post.dislikes}
                </button>
              </div>

              {/* Edit/Delete */}
              {user.username === post.author && (
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
                    ✏ Edit
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
                  <p className="text-sm text-gray-600">No comments yet.</p>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
