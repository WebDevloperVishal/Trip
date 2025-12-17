import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaCalendarAlt } from "react-icons/fa";
import api from "../utils/api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/blogs/${imgName}`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/800x400";
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading blog details...
      </div>
    );

  const imageUrl =
    blog.image && !blog.image.startsWith("http")
      ? getImageUrl(blog.image)
      : blog.image;

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-orange-50 py-12 px-6 md:px-16 border-t-4 border-green-400">
     
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center text-orange-600 hover:underline mb-6 font-semibold"
      >
        <FaArrowLeft className="mr-2" /> Back to Blogs
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaUser className="text-orange-400" />{" "}
              {blog.author || "VitalTrip Team"}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-orange-400" />{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {blog.title}
          </h1>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto mt-8 flex justify-center">
        <button
          onClick={() => navigate("/#blogs")}
          className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-600 transition-all duration-200"
        >
          <FaArrowLeft className="text-sm" />
          Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
