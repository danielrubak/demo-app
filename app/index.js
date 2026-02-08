const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Routes
// Backend expects requests at /api/health directly
// Coolify/Traefik handles stripping path prefixes if needed, 
// but local dev usually accesses http://localhost:3000/api/health
app.get('/api/health', (req, res) => {
    console.log("Health check");
    res.json({ message: 'OK' });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
