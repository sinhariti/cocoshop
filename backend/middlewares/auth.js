const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting: Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    req.userID = decoded.userId; // This was set in your login route
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authenticate;



// const jwt = require("jsonwebtoken");

// module.exports = function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];
//     try {
//       const payload = jwt.verify(token, "your-secret-key");
//       req.userID = payload.userID;
//       return next();
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//   }

//   return res.status(401).json({ message: "Unauthorized" });
// };
