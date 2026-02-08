
# Health Frontend

A simple, production-ready React application built with Vite and TanStack Query to monitor system health status.

## Features

- **Real-time Health Check**: Fetches status from `/api/health`.
- **Modern UI**: Styled with Tailwind CSS, fully responsive.
- **Robust Data Fetching**: Uses TanStack Query for caching, retries, and loading states.
- **Production Ready**: Optimized multi-stage Docker build.

## Prerequisites

- Node.js (v18+)
- Docker (optional, for containerization)
- A running backend service at `http://localhost:3000` (for local development) that exposes a GET `/api/health` endpoint.

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   The development server proxies `/api` requests to `http://localhost:3000`.
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Configuration

- **Vite Config**: The project is configured with `base: './'` to support relative paths in deployment (critical for subpath hosting or reverse proxies).
- **Proxy**: In development, `/api` is proxied to `http://localhost:3000`.
- **Query Client**: configured with:
  - Retry: 1 attempt
  - Stale Time: 5 minutes

## Deployment

### Docker

Build and run the container:

```bash
# Build the image
docker build -t health-frontend .

# Run the container (mapping host port 3000 to container port 80? No, usually frontend is on 80)
# If you want to access it at localhost:8080:
docker run -p 8080:80 health-frontend
```

### Coolify (or other PaaS)

This repository is ready for deployment on Coolify.

1. **Source**: Connect your GitHub repository.
2. **Build Pack**: select **Docker Integration** (it will auto-detect the Dockerfile).
   - Alternatively, you can use the Static Site (Nixpacks) builder if you prefer not to use Docker, but the Dockerfile provides a consistent Nginx environment.
3. **Port**: Expose port `80`.
4. **Proxy**: Ensure your Coolify instance routes `/api/health` to your actual backend service. This frontend expects `/api/health` to be reachable relative to the domain root (e.g., `https://mydomain.com/api/health`).

## Project Structure

- `src/`: Source code
  - `App.jsx`: Main component with fetch logic and UI
  - `main.jsx`: Entry point with QueryProvider setup
- `vite.config.js`: Configuration for proxy and base path
- `Dockerfile`: Multi-stage build definition
