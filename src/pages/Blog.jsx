import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const API_URL = "https://unelma-platform-backend.onrender.com";
  console.log(blogsData?.blog_banner_title);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/articles?populate=*`);
        const data = await res.json();
        setBlogs(data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const Blogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog?populate=*`);
        const data = await res.json();
        setBlogsData(data.data || []);
      } catch (error) {
        console.error("Error fetching blogs Page Content:", error);
      }
    };
    Blogs();
  }, []);

  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3780B2cc] via-[#008081cc] to-black/60"></div>
        <h1 className="relative text-3xl md:text-5xl font-bold z-10 drop-shadow-lg">
          {blogsData?.blog_banner_title}
        </h1>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{blogsData?.blog_title}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {blogsData?.blog_description}
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={`${API_URL}${blog.cover?.url}`}
                  alt={blog.title}
                  className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 hover:text-[#008081] transition-colors">
                  <a href={`/blog/${blog.documentId}`}>{blog.title}</a>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description ||
                    blog.blocks?.[0]?.body?.slice(0, 150) + "..."}
                </p>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  <Link
                    to={`/blog/${blog.documentId}`}
                    className="text-[#008081] hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
