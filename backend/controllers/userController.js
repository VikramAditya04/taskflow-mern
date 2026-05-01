import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name email role")
      .sort({ name: 1 });

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
