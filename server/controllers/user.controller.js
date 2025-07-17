import userModel from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.create({ username, password });
    res.status(201).json({ message: "user created", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
