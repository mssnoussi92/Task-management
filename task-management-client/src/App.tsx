import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskStatusChart from "./components/TaskStatusChart";
import { getTasks } from "./api";
import type { Task } from "./types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    setSelectedTask(null);
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task Management Dashboard
      </h1>
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Task Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskStatusChart tasks={tasks} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Add or Edit Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm
                  selectedTask={selectedTask}
                  onTaskCreated={handleTaskCreated}
                  onTaskUpdated={handleTaskUpdated}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Task List</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={fetchTasks}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;
