import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskStatusChart from "./components/TaskStatusChart";
import type { Task, PaginatedTasks, TaskStatus } from "./types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { getTasks } from "./api";

const App: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<PaginatedTasks | null>(null);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy, setSortBy] = useState<keyof Task>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [status, setStatus] = useState<TaskStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks({
      page,
      limit,
      sortBy,
      sortOrder,
      status: status === "ALL" ? undefined : status,
      search,
    });
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [taskUpdated, page, sortBy, sortOrder, status, search]);

  const handleTaskCreated = () => {
    setTaskUpdated(!taskUpdated);
  };

  const handleTaskUpdated = () => {
    setSelectedTask(null);
    setTaskUpdated(!taskUpdated);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCancel = () => {
    setSelectedTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task Management Dashboard
      </h1>
      <div className="mb-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Task Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskStatusChart tasks={tasks} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Add or Edit Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm
                  selectedTask={selectedTask}
                  onTaskCreated={handleTaskCreated}
                  onTaskUpdated={handleTaskUpdated}
                  onCancel={handleCancel}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="md:col-span-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Task List</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onTaskUpdated={handleTaskUpdated}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  status={status}
                  setStatus={setStatus}
                  search={search}
                  setSearch={setSearch}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
