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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
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
}

const TaskForm: React.FC<TaskFormProps> = ({
    selectedTask,
    onTaskCreated,
    onTaskUpdated,
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
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent position="popper">
                                        {Object.values(TaskStatusValues).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button type="submit">{selectedTask ? "Update" : "Create"}</Button>
            </form>
        </Form>
    );
};

export default TaskForm;