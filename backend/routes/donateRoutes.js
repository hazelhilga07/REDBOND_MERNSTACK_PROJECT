// server/routes/donateRoutes.js
import express from "express";
import {
  getAllDonors,
  createDonor,
  getDonorById,
  updateDonor,
  deleteDonor,
} from "../controllers/donateController.js";

const router = express.Router();

// Block root
router.get("/", (req, res) => {
  res.status(401).json({ message: "Not authorized, no token" });
});

// Allow creating a donor
router.post("/", createDonor);

// Fetch all donors on a separate route
router.get("/all", getAllDonors);

// Optional: individual donor operations (protected by ID)
router.get("/:id", getDonorById);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);

export default router;
