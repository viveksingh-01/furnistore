const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

const productsRoute = require('./routes/products');

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS middleware
app.use(cors());

// Products route
app.use('/products', productsRoute);

// Handle errors related to invalid routes
app.use((req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

// Handle any error which occurs in the application
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`The server is running at Port ${PORT}`);
});
