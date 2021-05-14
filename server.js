require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const mongoDBConnect = require('./config/db');
const testimonialRouter = require('./routes/testimonal.routes');

const PORT = process.env.PORT || 3000;

// db Connection
mongoDBConnect();

// Initializing express
const app = express();

// CORS
app.use(cors());

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/testimonial', testimonialRouter);

// Unhandled routes
app.use('*', (req, res) => {
    res.status(404).send(`Url not found: ${req.originalUrl}`);
})

// global error handling
app.use((err, req, res, next) => {
    res.status(500).send(`Internal server error, ${err.message}`);
})

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));

module.exports.handler = serverless(app);