import React from "react";
import type { Task } from "../types";
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

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
    const handleDelete = async (id: string) => {
        await deleteTask(id);
        onDelete();
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
                    {tasks.map((task) => (
                        <TableRow
                            key={task.id}
                            className="hover:bg-muted/50"
                        >
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
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TaskList;