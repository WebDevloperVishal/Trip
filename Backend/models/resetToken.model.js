import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userModelType", 
  },
  userModelType: {
    type: String,
    required: true,
    enum: ["user", "captain"],
  },
  token: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,  // 10 minutes
  },
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);


export default ResetToken;
