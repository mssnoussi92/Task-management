# Task Management System

This project is a simple Task Management System that shows how to implement a hexagonal architecture with NestJS.

## Tech Stack

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Containerization**: Docker

### Frontend

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI**: Shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Docker

### Running the Backend

1.  Navigate to the `task-management-api` directory:

    ```bash
    cd task-management-api
    ```

2.  Install the dependencies:

    ```bash
    pnpm install
    ```

3.  Start the database using Docker Compose:

    ```bash
    docker-compose up -d
    ```

4.  Run the application:
    `bash
pnpm run start:dev
`
    The API will be available at `http://localhost:3000`. You can access the Swagger documentation at `http://localhost:3000/api-docs`.

### Running the Frontend

1.  Navigate to the `task-management-client` directory:

    ```bash
    cd task-management-client
    ```

2.  Install the dependencies:

    ```bash
    pnpm install
    ```

3.  Run the application:
    `bash
pnpm run dev
`
    The frontend will be available at `http://localhost:5173`.
