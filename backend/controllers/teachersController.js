const User = require("../models/UserModel");
const mongoose = require("mongoose");

// List all teachers
exports.listteachers = async (req, res) => {
  try {
    const teachers = await User.find({ userType: "TEACHER" }).lean();
    return res.status(200).json({
      success: true,
      message: "Teachers list fetched successfully",
      data: {
        teachers 
      }
    });
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).send("Error loading teachers list");
  }
};



// Update teacher data
exports.editteacherdata = async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log("req data teachers ->", req.body);
    const updatedTeacher = await User.findOneAndUpdate(
        { _id: id },
        { $set: { name } },
        { new: true }
    )
    return res.status(200).json({
      success: true,
      message: "Edited teacher data successfully",
      data: {
            updatedTeacher
      }
    });
  } catch (err) {
    console.error("Error editing teacher:", err);
    res.status(500).send("Error editing teacher");
  }
};

// Delete teacher
exports.deleteteacherdata = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Removed teacher successfully",
      data: {
        teacher
      }
    });
  } catch (err) {
    console.error("Error deleting teacher:", err);
    res.status(500).send("Failed to delete teacher");
  }
};