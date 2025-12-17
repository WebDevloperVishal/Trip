import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaCalendarAlt } from "react-icons/fa";
import api from "../utils/api";

const AllBlogs = () => {
  const navigate = useNavigate();
  const blogSectionRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="blogs"
      ref={blogSectionRef}
      className="min-h-screen bg-linear-to-b from-orange-50 to-white pt-32 pb-20 px-6 md:px-12 border-t-4 border-green-400"
    >
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
          All Travel Blogs
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover captivating travel stories, hidden gems, and firsthand
          experiences shared by explorers around Maharashtra.
        </p>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full shadow-md"></div>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog, index) => (
            <div
              key={blog._id}
              onClick={() =>
                window.open(`/blogs/${blog._id}`, "_blank", "noopener,noreferrer")
              }
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-transparent hover:border-orange-300"
              style={{
                animation: `fadeInUp 0.5s ease ${index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <img
                src={blog.image || "https://via.placeholder.com/400x250"}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {blog.category || "Travel"}
                </span>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {blog.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-orange-400" />{" "}
                    {blog.author || "VitalTrip Team"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-orange-400" />{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No blogs available yet.
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-14 gap-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-5 py-2 rounded-full font-semibold border text-sm md:text-base ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
              } transition-all duration-200`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* BACK BUTTON */}
      <div className="max-w-4xl mx-auto mt-10 flex justify-center">
        <button
          onClick={() => navigate("/#blogs")}
          className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-600 transition-all duration-200"
        >
          <FaArrowLeft className="text-sm" />
          Back
        </button>
      </div>
    </section>
  );
};

export default AllBlogs;
