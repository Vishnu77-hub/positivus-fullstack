// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   const token = authHeader?.replace("Bearer ", "");

//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;


const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Auth header received:", authHeader);

  const token = authHeader?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
