import BloodRequest from "../models/requestModel.js";

// Create a new blood request
export const createRequest = async (req, res) => {
  try {
    const {
      patientName,
      attendeeMobile,
      bloodGroup,
      requiredDate,
      units,
      location,
      critical,
      note,
    } = req.body;

    // Basic validation
    if (
      !patientName ||
      !attendeeMobile ||
      !bloodGroup ||
      !requiredDate ||
      !units ||
      !location
    ) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newRequest = new BloodRequest({
      patientName,
      attendeeMobile,
      bloodGroup,
      requiredDate,
      units,
      location,
      critical: !!critical,
      note,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating request", error: error.message });
  }
};

// Get all blood requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};