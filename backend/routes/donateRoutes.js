import express from "express";

const router = express.Router();

// @route   GET /api/donors
router.get("/", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// @route   POST /api/donors
router.post("/", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// @route   GET /api/donors/:id
router.get("/:id", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// @route   PUT /api/donors/:id
router.put("/:id", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// @route   DELETE /api/donors/:id
router.delete("/:id", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

export default router;
