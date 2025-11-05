<<<<<<< HEAD
// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 
=======
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import errorHandler from "./middleware/error.js";
import productsRouter from "./routes/products.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(logger);
app.get("/", (req, res) => res.json({ message: "Hello World" }));
app.use("/api", auth);
app.use("/api/products", productsRouter);
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server listening on http://localhost:${port}`));
>>>>>>> 312dc1d (Week 2: Express.js REST API with middleware and README setup)
