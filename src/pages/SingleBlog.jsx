import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const { documentId } = useParams();
  const [blog, setBlog] = useState(null);
  const API_URL = "https://unelma-platform-backend.onrender.com";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/articles/${documentId}?populate=*`,
        );
        const data = await res.json();

        if (data.data) {
          setBlog(data.data); // set the whole data object
        } else {
          console.error("Blog not found");
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      }
    };

    if (documentId) fetchBlog();
  }, [documentId]);

  if (!blog) return <div className="text-center py-20">Loading...</div>;

  const coverUrl = blog.cover?.url ? `${API_URL}${blog.cover.url}` : null;

  return (
    <article className="max-w-4xl mx-auto py-20 px-4">
      {/* Blog Cover */}
      {coverUrl && (
        <img
          src={coverUrl}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-8 shadow-lg"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      {/* Published Date */}
      <p className="text-gray-500 mb-8">
        {blog.publishedAt
          ? new Date(blog.publishedAt).toLocaleDateString()
          : ""}
      </p>

      {/* Blog Description */}
      <div className="prose prose-lg max-w-none">
        {blog.description && <p>{blog.description}</p>}

        {/* Render blocks if available */}
        {blog.blocks?.map((block) => (
          <p key={block.id || block.__component} className="mb-4">
            {block.body}
          </p>
        ))}
      </div>
    </article>
  );
};

export default SingleBlog;
