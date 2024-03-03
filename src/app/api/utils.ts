import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
};

const getTokenFromHeader = (req: any) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split(" ")[1]; // Extract the token
  }
  return null;
};

export const verifyToken = (req: any, res: any) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    // Token is valid, you can access decoded token payload if needed
    req.user = decoded; // Example: Add decoded info to request object
    // Proceed to the next middleware or route handler
  });
};
