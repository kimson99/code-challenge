# Task

Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. Interface functionalities:
   1. Create a resource.
   2. List resources with basic filters.
   3. Get details of a resource.
   4. Update resource details.
   5. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide [README.md](http://README.md) for the configuration and the way to run application.

---

I'm choosing Todo items a the resource of the task

# Todo API Backend

A TypeScript Express.js backend crudee server with CRUD operations for managing todo items.

## Requirements

Install the followings:

1. [Node.js](https://nodejs.org/en/download)
2. [pnpm](https://pnpm.io/installation)

## Setup and Installation

1. Install dependencies:

```bash
pnpm install
```

2. Build the project:

```bash
pnpm run build
```

## Running the Application

### Development Mode

```bash
pnpm run dev
```

### Production Mode

```bash
pnpm run build
pnpm start
```

## Environment variables

The application can be started without setting any environment variable. Although you can set it to your liking by creating a `.env` following the example of `.evn.example`.

## API Endpoints

### Health Check

- `GET /health` - Check if the API is running

### Todo Endpoints

All todo endpoints are prefixed with `/api/todos`.

- `GET /api/todos` - List todo items with filters (by completion status, priority)
- `GET /api/todos/:id` - Get todo item details
- `POST /api/todos` - Create a new todo item
- `PUT /api/todos/:id` - Update todo item detail
- `DELETE /api/todos/:id` - Delete todo item
  For conveniences, I included a Postman collection `Todo.postman_collection.json` for you to easily try it out

## Database

The application uses SQLite with TypeORM. The database file (`todos.db`) will be created automatically when the application starts. TypeORM is configured with `synchronize: true` for development, so the schema will be automatically created and updated.

# Possible improvements

If this application were to goes beyond a crude server, here's a few improvements:

- Using a logging library as `winston`, `pino` instead of `console.log` for more detailed and structured logs.
- Adding authentication and authorization (JWT tokens) to make todos user-specific rather than global.
- Proper database migrations instead of auto synchornize.
- Rate limit to protect endpoints from abuse.
