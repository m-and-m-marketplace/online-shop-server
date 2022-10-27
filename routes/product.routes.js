const router = require("express").Router();
const mongoose = require("mongoose")


const Product = require('../models/Product.model');

// GET /api/products Get list of products
router.get('/products', (req, res, next) => {
    Product.find()
      .then(allProducts => res.json(allProducts))
      .catch(err => {
        console.log("error getting list of products...", err);
        res.status(500).json({
            message: "error getting list of products",
            error: err
        })
    });
  });


    // GET /api/products/:productId  Retrieves a specific product by id
router.get('/products/:productId', (req, res, next) => {
    const { productId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Product.findById(productId)
      .then(product => res.json(product))
      .catch(err => {
        console.log("error getting specific product...", err);
        res.status(500).json({
            message: "error getting specific product",
            error: err
        })
    });
  });


module.exports = router;