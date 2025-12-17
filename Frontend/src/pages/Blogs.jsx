import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import api from "../utils/api";
import { localBlogs } from "../pages/localBlogs";

const Blogs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState(localBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem("activeSection", "blogs");
    return () => sessionStorage.removeItem("activeSection");
  }, []);

  const isFullPage = location.pathname === "/blogs";
  const defaultPageSize = isFullPage ? 6 : 3;
  const [pageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        if (res.data.blogs && res.data.blogs.length > 0) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.warn("Backend offline — using local previews.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [blogs, pageSize]);

  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/blogs/${imgName}`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/400x250";
    }
  };

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blogs...
      </section>
    );

  const totalItems = blogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const visibleBlogs = blogs.slice(startIndex, startIndex + pageSize);

  const goToPage = (n) => {
    const next = Math.max(1, Math.min(totalPages, n));
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="blogs"
      className="min-h-screen bg-linear-to-b from-white to-orange-50 py-16 px-6 md:px-12 border-t-4 border-green-400"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4">
        Travel Stories & Blogs
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Dive into inspiring travel tales, destination guides, and hidden gems
        shared by our explorers.
      </p>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
            onClick={() =>
              window.open(`/blogs/${blog._id}`, "_blank", "noopener,noreferrer")
            }
          >
            <img
              src={
                blog.image && !blog.image.startsWith("http")
                  ? getImageUrl(blog.image)
                  : blog.image || "https://via.placeholder.com/400x250"
              }
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 text-left">
              <span className="inline-block bg-teal-100 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {blog.category || "Travel"}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {blog.summary ||
                  (blog.content ? blog.content.slice(0, 150) + "..." : "")}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaUser className="text-orange-400" />{" "}
                  {blog.author || "VitalTrip Team"}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-400" />{" "}
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-full shadow-sm font-semibold transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-orange-50"
              }`}
            >
              ← Prev
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-full shadow-sm font-semibold transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-orange-50"
              }`}
            >
              Next →
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} · {totalItems} blog
            {totalItems > 1 ? "s" : ""}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
