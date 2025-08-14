import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Task, PaginatedTasks } from '../types';
import { TaskStatusValues } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskStatusChartProps {
    tasks: PaginatedTasks | null;
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
    if (!tasks) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (tasks.data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>No tasks to display</p>
            </div>
        );
    }

    const statusCounts = {
        [TaskStatusValues.TODO]: tasks.data.filter((task: Task) => task.status === TaskStatusValues.TODO).length,
        [TaskStatusValues.IN_PROGRESS]: tasks.data.filter((task: Task) => task.status === TaskStatusValues.IN_PROGRESS).length,
        [TaskStatusValues.DONE]: tasks.data.filter((task: Task) => task.status === TaskStatusValues.DONE).length,
    };

    const chartData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: '# of Tasks',
                data: [statusCounts.TODO, statusCounts.IN_PROGRESS, statusCounts.DONE],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="relative w-full max-w-xs mx-auto h-64">
            <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default TaskStatusChart;