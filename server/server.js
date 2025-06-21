// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// In-memory data store
let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    imageUrl: "data:image/jpeg;base64,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",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop",
    description: "Latest smartphone with advanced camera features"
  },
  {
    id: 3,
    name: "Laptop",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop",
    description: "Powerful laptop for work and gaming"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
    description: "Fitness tracking smart watch with health monitoring"
  }
];

let nextId = 5;

// Helper function to find product by ID
const findProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// API Routes

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  try {
    console.log('GET /api/products - Fetching all products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/products/${id} - Fetching product`);
    
    const product = findProductById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products - Add new product
app.post('/api/products', (req, res) => {
  try {
    const { name, price, imageUrl, description } = req.body;
    
    console.log('POST /api/products - Adding new product:', { name, price, imageUrl });
    
    // Validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    // Create new product
    const newProduct = {
      id: nextId++,
      name: name.trim(),
      price: parseFloat(price),
      imageUrl: imageUrl || '',
      description: description || ''
    };
    
    products.push(newProduct);
    
    console.log('Product added successfully:', newProduct);
    res.status(201).json(newProduct);
    
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, imageUrl, description } = req.body;
    
    console.log(`PUT /api/products/${id} - Updating product`);
    
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    
    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: name.trim(),
      price: parseFloat(price),
      imageUrl: imageUrl || products[productIndex].imageUrl,
      description: description || products[productIndex].description
    };
    
    console.log('Product updated successfully:', products[productIndex]);
    res.json(products[productIndex]);
    
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`DELETE /api/products/${id} - Deleting product`);
    
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    console.log('Product deleted successfully:', deletedProduct);
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Product Store API',
    version: '1.0.0',
    endpoints: {
      'GET /api/products': 'Get all products',
      'POST /api/products': 'Create new product',
      'DELETE /api/products/:id': 'Delete product',
    }
  });
});

// 404 handler - FIXED: Removed the problematic '*' route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📦 Products endpoint: http://localhost:${PORT}/api/products`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});