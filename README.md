```markdown
# Task Management API

A simple RESTful API for managing tasks, built with Node.js and Express. This project demonstrates basic routing, error handling, and API endpoints for a task list.

## Setup Instructions

Follow these steps to get the API running locally:

1. **Clone the repository** (or download the files):
   ```
   git clone https://github.com/afsanaashaa/380_asha_WDP_lab.git
   cd task-management
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the server**:
   ```
   npm start
   ```
   - The server will run at `http://localhost:3000`.
   - Open in your browser or use Postman to test.

4. **Test endpoints** (examples below).

## API Endpoints

| Method | Endpoint       | Description                  | Example Response |
|--------|----------------|------------------------------|------------------|
| GET    | `/`            | Root – checks if API is live | `"Task Management API is running!"` |
| GET    | `/health`      | Health check with uptime     | `{"status":"healthy","uptime":45.67}` |
| GET    | `/tasks`       | Get all 5 tasks              | Array of task objects (see below) |
| GET    | `/tasks/:id`   | Get single task by ID        | Task object or error |

### Example `/tasks` Response
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-10-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Build REST API",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-10-02T00:00:00.000Z"
  },
  {
    "id": 3,
    "title": "Set up database",
    "completed": true,
    "priority": "medium",
    "createdAt": "2025-10-03T00:00:00.000Z"
  },
  {
    "id": 4,
    "title": "Write tests",
    "completed": false,
    "priority": "low",
    "createdAt": "2025-10-04T00:00:00.000Z"
  },
  {
    "id": 5,
    "title": "Deploy application",
    "completed": false,
    "priority": "medium",
    "createdAt": "2025-10-05T00:00:00.000Z"
  }
]
```

### Error Examples
- Invalid ID (`/tasks/abc`): `{"error":"Invalid ID format"}` (400)
- Not found (`/tasks/999`): `{"error":"Task not found"}` (404)

## Project Structure
```
task-management/
├── package.json          # Project config and dependencies
├── .gitignore            # Ignores node_modules, logs, etc.
├── README.md             # This file!
├── api-responses.txt     # Postman test documentation
├── tasks-response.json   # Saved /tasks response
└── src/
    ├── index.js          # Main server file
    └── routes/
        └── tasks.js      # Task routes (with Express Router)
```

## Testing with Postman
- Import the endpoints or manually create GET requests.
- Save responses as shown in `tasks-response.json` and `api-responses.txt`.

## Git Branches
- `main`: Initial setup and merge.
- `features/routes`: Refactored routes using Express Router.

Built for WDP Lab 1 – November 2025.
```

Copy-paste this **exactly** into your `README.md` file. Save it, commit, and push:

```bash
git add README.md
git commit -m "Add complete README.md with setup, endpoints, and structure"
git push origin main  # or your current branch
```

