const express = require('express');
const router = express.Router();
const fs = require('fs');

const productsDataPath = './data/products.json';

router.get('/', (req, res) => {
  productsData = fs.readFileSync(productsDataPath);
  res.status(200).json(JSON.parse(productsData));
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;
  productsData = fs.readFileSync(productsDataPath);
  const { products } = JSON.parse(productsData);
  const product = products.find(product => product.id === id);
  res.status(200).json(product);
});

module.exports = router;
