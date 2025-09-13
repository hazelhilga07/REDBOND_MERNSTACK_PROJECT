import express from "express";
import { createRequest, getAllRequests } from "../controllers/requestController.js";

const router = express.Router();

// Block root
router.get("/", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// Allow creating a request
router.post("/", createRequest);

// If you still want to fetch all requests, give it a different path
router.get("/all", getAllRequests);

export default router;
