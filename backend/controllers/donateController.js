// controllers/donateController.js
import Donor from "../models/donateModel.js";

// @desc    Get all donors
// @route   GET /api/donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
};

// @desc    Create new donor
// @route   POST /api/donors
export const createDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    const savedDonor = await donor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    res.status(400).json({ message: "Failed to register donor", error });
  }
};

// @desc    Get donor by ID
// @route   GET /api/donors/:id
export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donor", error });
  }
};

// @desc    Update donor
// @route   PUT /api/donors/:id
export const updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: "Error updating donor", error });
  }
};

// @desc    Delete donor
// @route   DELETE /api/donors/:id
export const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json({ message: "Donor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error });
  }
};
