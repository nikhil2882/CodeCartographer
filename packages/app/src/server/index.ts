import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client')));

// API routes will be added here
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeCartographer server is running' });
});

// Serve React app for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 CodeCartographer server running on http://localhost:${PORT}`);
});
