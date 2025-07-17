import Tasks from "../models/task.model.js";
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Tasks.create({ title, description });
    res.status(201).json({ message: "Task Created", task });
    console.log("Task Created");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.mesage);
  }
};
export const getSingleTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Tasks.findById({ id });
    res.status(200).json({ message: "Single Task Collected", task });
    console.log("Single Task Collected");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.mesage);
  }
};
export const getAllTask = async (req, res) => {
  try {
    const task = await Tasks.find();
    res.status(200).json({ message: "Task Collected", task });
    console.log("Task Collected");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.mesage);
  }
};
export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedTask = await Tasks.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Task updated", updatedTask });
    console.log("Task updated");
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.mesage);
  }
};
export const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await Tasks.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted" });
    console.log("Task deleted");
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.mesage);
  }
};
