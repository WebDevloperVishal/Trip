import User from "../models/user.model.js";
import ResetToken from "../models/resetToken.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { sendResetEmail } from "../utils/mailer.js";


export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { fullname, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      console.log("Duplicate signup attempt:", normalizedEmail);
      return res.status(409).json({ message: "User already exists, please login." });
    }

    const user = new User({
      fullname,
      email: normalizedEmail,
      password,
    });
    await user.save();

    const token = user.generateAuthToken();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      role: "user",
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    console.log("Found user:", user ? "Yes" : "No");

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    console.log("Stored password hash (length):", user.password?.length || "none");

    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: "user",
      user,
    });
  } catch (err) {
    console.error("❗Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};


export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No image uploaded" });

    const imageUrl = `uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      imageUrl,
      user,
    });
  } catch (err) {
    console.error("Upload image error:", err);
    res.status(500).json({ success: false, message: "Error uploading profile image" });
  }
};


export const updateUserCredentials = async (req, res) => {
  try {
    const { newEmail, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password" });

    if (newEmail) user.email = newEmail.toLowerCase();
    if (newPassword) user.password = newPassword; 
    await user.save();

    res.status(200).json({
      success: true,
      message: "Credentials updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update credentials error:", err);
    res.status(500).json({ message: "Error updating credentials" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    await ResetToken.deleteMany({ userId: user._id, userModelType: "user" });

    const token = crypto.randomBytes(32).toString("hex");
    await ResetToken.create({
      userId: user._id,
      userModelType: "user",
      token,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }
};


export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const resetToken = await ResetToken.findOne({ token, userModelType: "user" });

    if (!resetToken)
      return res
        .status(400)
        .json({ valid: false, message: "Invalid or expired reset token" });

    const user = await User.findById(resetToken.userId).select("email");
    res.status(200).json({
      valid: true,
      message: "Valid token",
      email: user?.email,
    });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(500).json({ valid: false, message: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetToken = await ResetToken.findOne({ token, userModelType: "user" });
    if (!resetToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = await User.findById(resetToken.userId).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Reset flow - old hash length:", user.password?.length || "none");

    const isSame = await user.comparePassword(password);
    if (isSame) {
      console.log("New password equals old password (rejected)");
      return res
        .status(400)
        .json({ message: "New password cannot match old password" });
    }

    user.password = password; 
    await user.save();

    const refreshed = await User.findById(user._id).select("+password");
    console.log("✅ Reset flow - new hash length:", refreshed.password?.length || "none");

    await resetToken.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Error resetting password" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await blacklistTokenModel.create({ token });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};
