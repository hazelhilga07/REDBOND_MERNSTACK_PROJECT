import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  role: { type: String, enum: ["donor", "recipient"] },
  bloodGroup: { 
  type: String, 
  enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] 
},
  dob: { type: Date }
});

userSchema.set("timestamps", true);

export default mongoose.model("User", userSchema);
