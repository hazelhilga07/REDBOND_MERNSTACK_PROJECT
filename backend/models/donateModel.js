// models/donateModel.js
import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    dob: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    units: { type: Number, required: true, min: 1 },
    available: { type: Boolean, default: true },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
