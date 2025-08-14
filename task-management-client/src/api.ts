import axios from "axios";
import type { Task } from "./types";

const API_URL = "http://localhost:3000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Omit<Task, "id">
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
