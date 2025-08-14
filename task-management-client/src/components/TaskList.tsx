import React from "react";
import type { Task, TaskStatus } from "../types";
import { deleteTask } from "../api";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface TaskListProps {
    tasks: { data: Task[]; total: number } | null;
    onEdit: (task: Task) => void;
    onTaskUpdated: () => void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    sortBy: keyof Task;
    setSortBy: React.Dispatch<React.SetStateAction<keyof Task>>;
    sortOrder: "asc" | "desc";
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    status: TaskStatus | "ALL";
    setStatus: React.Dispatch<React.SetStateAction<TaskStatus | "ALL">>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onEdit,
    onTaskUpdated,
    page,
    setPage,
    limit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    status,
    setStatus,
    search,
    setSearch,
}) => {
    const handleDelete = async (id: string) => {
        await deleteTask(id);
        onTaskUpdated();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "TODO":
                return <Badge className="bg-yellow-500 text-white">To Do</Badge>;
            case "IN_PROGRESS":
                return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
            case "DONE":
                return <Badge className="bg-green-500 text-white">Done</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center space-x-2">
                    <select
                        onChange={(e) =>
                            setStatus(e.target.value as TaskStatus | "ALL")
                        }
                        value={status}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="ALL">All</option>
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                    <select
                        onChange={(e) => setSortBy(e.target.value as keyof Task)}
                        value={sortBy}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="title">Title</option>
                        <option value="status">Status</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                    <select
                        onChange={(e) =>
                            setSortOrder(e.target.value as "asc" | "desc")
                        }
                        value={sortOrder}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {tasks && tasks.data && tasks.data.length > 0 ? (
                        tasks.data.map((task) => (
                            <TableRow key={task.id} className="hover:bg-muted/50">
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{getStatusBadge(task.status)}</TableCell>
                                <TableCell>
                                    {new Date(task.dueDate).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" onClick={() => onEdit(task)}>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No tasks found.
                            </TableCell>
                        </TableRow>
                    )}
                </tbody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <p>
                    Showing {tasks?.data?.length || 0} of {tasks?.total || 0} tasks
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        disabled={page * limit >= (tasks?.total || 0)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
