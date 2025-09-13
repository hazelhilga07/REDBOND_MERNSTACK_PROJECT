import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "../controllers/authController.js";


router.get("/", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
