import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { createTask, updateTask } from "@/api";
import type { Task } from "src/types";
import { TaskStatusValues } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    dueDate: z.string(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

interface TaskFormProps {
    selectedTask: Task | null;
    onTaskCreated: () => void;
    onTaskUpdated: () => void;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
    selectedTask,
    onTaskCreated,
    onTaskUpdated,
    onCancel,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            status: "TODO",
        },
    });

    useEffect(() => {
        if (selectedTask) {
            form.reset({
                title: selectedTask.title,
                description: selectedTask.description,
                dueDate: selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toISOString().substring(0, 16)
                    : "",
                status: selectedTask.status,
            });
        } else {
            form.reset({
                title: "",
                description: "",
                dueDate: "",
                status: "TODO",
            });
        }
    }, [selectedTask, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (selectedTask) {
            await updateTask(selectedTask.id, values);
            onTaskUpdated();
        } else {
            await createTask(values);
            onTaskCreated();
        }
    };

    return (
        <Form {...form}>
            <h3 className="text-lg font-semibold">
                {selectedTask ? "Edit Task" : "Add Task"}
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Task title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Task description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {selectedTask && (
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Status</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {Object.values(TaskStatusValues).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <div className="flex space-x-2">
                    <Button type="submit">{selectedTask ? "Update" : "Create"}</Button>
                    {selectedTask && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default TaskForm;