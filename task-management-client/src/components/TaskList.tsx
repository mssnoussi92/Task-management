import React from "react";
import { motion } from "framer-motion";
import type { Task } from "../types";
import { deleteTask } from "../api";
import {
    Table,
    TableBody,
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
            case "TO_DO":
                return <Badge variant="outline">To Do</Badge>;
            case "IN_PROGRESS":
                return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
            case "DONE":
                return <Badge className="bg-green-500 text-white">Done</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
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
                <motion.tbody
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {tasks.map((task) => (
                        <motion.tr
                            key={task.id}
                            variants={itemVariants}
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
                        </motion.tr>
                    ))}
                </motion.tbody>
            </Table>
        </div>
    );
};

export default TaskList;