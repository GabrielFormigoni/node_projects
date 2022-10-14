const Task = require("../model/Task");
const asyncWraper = require("../middleware/async");
const { createCustomError } = require("../error/customErrorHandler");
const { nextTick } = require("process");

const getAllTasks = asyncWraper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWraper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWraper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`Nenhuma tarefa com o ID: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWraper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`Nenhuma tarefa com o ID: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWraper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`Nenhuma tarefa com o ID: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
};
