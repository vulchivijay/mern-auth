const express = require('express');
const app = express();

// import routes
const authRoutes = require('./routes/auth.js');

// middleware
app.use('/api', authRoutes);

// port
const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
})
