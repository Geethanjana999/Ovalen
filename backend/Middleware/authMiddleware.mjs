import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // extract token

  if (!token) {
    return res.json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // return-> id -> { id: user._id } // because we generated token using { id }
    req.user = decoded; // Attach user info to req
    next(); // Move to the next middleware/controller
  } catch (error) {
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
