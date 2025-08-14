import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { Task, TaskStatus } from '../types';
import { TaskStatusValues } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskStatusChartProps {
    tasks: Task[];
}

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ tasks }) => {
    const statusCounts = {
        [TaskStatusValues.TODO]: tasks.filter(task => task.status === TaskStatusValues.TODO).length,
        [TaskStatusValues.IN_PROGRESS]: tasks.filter(task => task.status === TaskStatusValues.IN_PROGRESS).length,
        [TaskStatusValues.DONE]: tasks.filter(task => task.status === TaskStatusValues.DONE).length,
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