import Blog from "../models/blog.model.js";


export const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const image = req.file ? `uploads/${req.file.filename}` : undefined;

    const blog = await Blog.create({
      title,
      content,
      category,
      image,
      
      author: req.user?._id || req.captain?._id,
      authorModelType: req.user ? "User" : "Captain",
     
      isApproved: req.user ? false : true,
    });

    res.status(201).json({
      success: true,
      message: req.user
        ? "Blog submitted successfully! Awaiting approval."
        : "Blog created and published successfully!",
      blog,
    });
  } catch (err) {
    console.error("❌ Create Blog error:", err);
    res.status(500).json({ message: "Server error creating blog" });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ count: blogs.length, blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    
    if (!blog.isApproved) {
      return res
        .status(403)
        .json({ message: "This blog is pending approval." });
    }

    res.status(200).json({ blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};


export const getPendingBlogs = async (req, res) => {
  try {
    const pending = await Blog.find({ isApproved: false }).populate("author");
    res.status(200).json({ count: pending.length, pending });
  } catch (err) {
    console.error("Error fetching pending blogs:", err);
    res.status(500).json({ message: "Error fetching pending blogs" });
  }
};

export const approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog approved successfully!", blog });
  } catch (err) {
    console.error("Error approving blog:", err);
    res.status(500).json({ message: "Error approving blog" });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    
    if (!req.captain)
      return res
        .status(403)
        .json({ message: "Unauthorized. Only captains can delete blogs." });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Error deleting blog" });
  }
};
