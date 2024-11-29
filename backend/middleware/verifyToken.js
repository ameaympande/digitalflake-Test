const jwt = require("jsonwebtoken");
const KEY = process.env.PRIVATE_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
