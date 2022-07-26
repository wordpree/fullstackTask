import Task from "../model/index.js";

const getAllTasks = async (req, res) => {
  const task = await Task.find();
  res.json({ task });
};

const getTaskById = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return res.json({ msg: "task not found" });
  }
  res.json({ task });
};

const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body });
  res.json({ task });
};

const deleteById = async (req, res) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.id });
  res.json({ task });
};

const updateById = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    { complete: req.body.complete },
    { new: true }
  );
  res.json({ task });
};

export { getAllTasks, getTaskById, createTask, updateById, deleteById };
