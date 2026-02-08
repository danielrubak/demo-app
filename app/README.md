# Health Backend

A simple Node.js/Express backend service designed for health checks.

## Features

- **Single Endpoint**: `GET /api/health` returns `{"message": "OK"}`.
- **Port**: Listens on port 3000 (configurable via `PORT` environment variable).
- **CORS**: Enabled for all origins.
- **Production Ready**: Includes a multi-stage Dockerfile optimized for size and security.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server** (with hot-reload via nodemon):
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

3.  **Start the production server**:
    ```bash
    npm start
    ```

## Verification

To verify the server is running correctly, make a GET request to:
`http://localhost:3000/api/health`

Expected response:
```json
{
  "message": "OK"
}
```

## Docker Deployment

This application includes a multi-stage `Dockerfile` creating a lightweight production image.

### Build the Image

```bash
docker build -t health-backend .
```

### Run the Container

```bash
docker run -p 3000:3000 health-backend
```

Access the health check at `http://localhost:3000/api/health`.

## Deployment on Coolify

- **Build Pack**: Node.js or Dockerfile
- **Port**: 3000
- **Health Check Path**: `/api/health`
- **Start Command**: `npm start`
