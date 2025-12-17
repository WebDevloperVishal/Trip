import jwt from "jsonwebtoken";
import Captain from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const verifyCaptainAccess = async (req, res, next) => {
  try {
    
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Unauthorized: No token provided" });

    
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted)
      return res.status(401).json({ message: "Token has been revoked" });

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const captain = await Captain.findById(decoded.id || decoded._id).select("-password");

    if (!captain)
      return res
        .status(403)
        .json({ message: "Access denied: Captain account not found" });

   
    req.user = captain;
    req.captain = captain;

    next();
  } catch (err) {
    console.error("verifyCaptainAccess error:", err);
    res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      error: err.message,
    });
  }
};
