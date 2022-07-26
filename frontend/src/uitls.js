import axios from "axios";

const api_url = process.env.REACT_APP_TASK_API_URL;

const updateRemoteTask = async (id, { complete }) => {
  const updatedTask = await axios.put(`${api_url}/${id}`, {
    complete: complete,
  });
  return updatedTask;
};

const createRemoteTask = async (task) => {
  const response = await axios.post(`${api_url}`, {
    ...task,
  });
  const newTask = await response.data;
  return newTask.task;
};

const deleteRemoteTask = async (id) => {
  const deletedTask = await axios.delete(`${api_url}/${id}`);
  return deletedTask;
};

const getAllRemoteTask = async () => {
  const response = await axios.get(`${api_url}`);
  const allTasks = await response.data;
  return allTasks.task;
};

const getRemoteTaskById = async ({ id }) => {
  const task = await axios.get(`${api_url}/${id}`);
  return task;
};

export {
  updateRemoteTask,
  createRemoteTask,
  deleteRemoteTask,
  getAllRemoteTask,
  getRemoteTaskById,
};
