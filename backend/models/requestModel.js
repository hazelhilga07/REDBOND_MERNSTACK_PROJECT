import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    attendeeMobile: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    requiredDate: { type: Date, required: true },
    units: { type: Number, required: true, min: 1 },
    location: { type: String, required: true, trim: true },
    critical: { type: Boolean, default: false },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

const BloodRequest = mongoose.model("BloodRequest", requestSchema);

export default BloodRequest;