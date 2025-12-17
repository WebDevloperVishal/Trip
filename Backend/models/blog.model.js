import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    
    content: { 
      type: String,
      required: true 
    },

    category: {
      type: String,
      enum: ["Culture", "Nature", "Adventure", "Food", "Travel"],
      required: true,
    },

    image: { 
      type: String 
    },
    isApproved: { 
      type: Boolean, 
      default: false 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "authorModelType",
    },
    authorModelType: {
      type: String,
      required: true,
      enum: ["User", "Captain"],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
