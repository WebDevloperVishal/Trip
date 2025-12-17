import Captain from "../models/captain.model.js";
import ResetToken from "../models/resetToken.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { sendResetEmail } from "../utils/mailer.js";


export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password, accessKey } = req.body;

  try {
    if (accessKey !== process.env.CAPTAIN_ACCESS_KEY)
      return res.status(403).json({ message: "Invalid Access Key" });

    const existing = await Captain.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Captain already exists" });

    const captain = new Captain({ fullname, email, password });
    await captain.save();

    const token = captain.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "Captain registered successfully",
      token,
      role: "captain",
      captain,
    });
  } catch (err) {
    console.error("Register Captain error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginCaptain = async (req, res) => {
  const { email, password } = req.body;

  try {
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = captain.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: "captain",
      captain,
    });
  } catch (err) {
    console.error("Captain Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};


export const getCaptainProfile = async (req, res) => {
  try {
    const captain = await Captain.findById(req.user?._id).select("-password");
    if (!captain) return res.status(404).json({ message: "Captain not found" });

    res.status(200).json({ success: true, captain });
  } catch (err) {
    console.error("Get Captain Profile Error:", err);
    res.status(500).json({ message: "Error fetching captain profile" });
  }
};

export const updateCaptainProfile = async (req, res) => {
  try {
    const captain = await Captain.findById(req.user._id);
    if (!captain)
      return res.status(404).json({ success: false, message: "Captain not found" });

    if (req.body["fullname.firstname"])
      captain.fullname.firstname = req.body["fullname.firstname"];
    if (req.body["fullname.lastname"])
      captain.fullname.lastname = req.body["fullname.lastname"];
    if (req.body.email)
      captain.email = req.body.email.toLowerCase();
    if (req.body.bio !== undefined)
      captain.bio = req.body.bio;

    if (req.file) {
      captain.profileImage = `uploads/${req.file.filename}`;
    }

    await captain.save();

    res.status(200).json({
      success: true,
      message: "Captain profile updated successfully",
      captain,
    });
  } catch (err) {
    console.error("Update Captain Profile Error:", err);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const captain = await Captain.findOne({ email });
    if (!captain)
      return res.status(404).json({ message: "Captain not found" });

    await ResetToken.deleteMany({ userId: captain._id, userModelType: "captain" });

    const token = crypto.randomBytes(32).toString("hex");

    await ResetToken.create({
      userId: captain._id,
      userModelType: "captain",
      token,
    });

    const resetLink = `${process.env.FRONTEND_URL}/captain/reset-password/${token}`;
    console.log("Reset Link:", resetLink);

    if (sendResetEmail) await sendResetEmail(captain.email, resetLink);

    res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
      token,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

export const verifyCaptainResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const resetToken = await ResetToken.findOne({
      token,
      userModelType: "captain",
    });

    if (!resetToken)
      return res.status(400).json({ valid: false, message: "Invalid or expired token" });

    const captain = await Captain.findById(resetToken.userId).select("email");
    res.status(200).json({ valid: true, message: "Valid token", email: captain?.email });
  } catch (err) {
    console.error("verifyCaptainResetToken error:", err);
    res.status(500).json({ valid: false, message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetToken = await ResetToken.findOne({
      token,
      userModelType: "captain",
    });

    if (!resetToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const captain = await Captain.findById(resetToken.userId);
    if (!captain)
      return res.status(404).json({ message: "Captain not found" });

    captain.password = password;
    await captain.save();
    await resetToken.deleteOne();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const checkOldPasswordCaptain = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) return res.status(404).json({ samePassword: false });

    const isSame = await bcrypt.compare(password, captain.password);
    res.status(200).json({ samePassword: isSame });
  } catch (err) {
    console.error("checkOldPasswordCaptain error:", err);
    res.status(500).json({ samePassword: false });
  }
};

export const logoutCaptain = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await blacklistTokenModel.create({ token });

    res.status(200).json({ success: true, message: "Captain logged out successfully" });
  } catch (err) {
    console.error("logoutCaptain error:", err);
    res.status(500).json({ message: "Logout error" });
  }
};
