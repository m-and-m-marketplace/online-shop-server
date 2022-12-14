const router = require("express").Router();
const mongoose = require("mongoose");

const Product = require("../models/Product.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const fileUploader = require("../config/cloudinary.config");

// GET /api/products Get list of products
router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProducts) => res.json(allProducts))
    .catch((err) => {
      console.log("error getting list of products...", err);
      res.status(500).json({
        message: "error getting list of products",
        error: err,
      });
    });
});

// GET /api/products/:productId  Retrieves a specific product by id
router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Product.findById(productId)
    .then((product) => res.json(product))
    .catch((err) => {
      console.log("error getting specific product...", err);
      res.status(500).json({
        message: "error getting specific product",
        error: err,
      });
    });
});




// POST /api/products/upload-image - Uploads Image
router.post("/products/upload-image", isAuthenticated, fileUploader.single("image_URL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
    
  res.json({ image_URL: req.file.path });
});


// POST /api/products/create  -  Creates a new product
router.post("/products/create", isAuthenticated, (req, res, next) => {
    const { title, description, price, image_URL, specs, rating } = req.body;
    const isAdmin = req.payload.admin

    const newProduct = {
      title,
      description,
      price,
      image_URL,
      specs,
      rating,
    };

    if(isAdmin){
      Product.create(newProduct)
        .then((response) => res.json(response))
        .catch((err) => {
          console.log("error creating a new product...", err);
          res.status(500).json({
            message: "error creating a new product",
            error: err,
          });
        });
    }
  }
);

// PUT  /api/products/:productId  -  Updates a specific product by id
router.put("/products/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;
  const isAdmin = req.payload.admin

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  if (isAdmin){
    Product.findByIdAndUpdate(productId, req.body, { new: true })
      .then((updatedProduct) => res.json(updatedProduct))
      .catch((err) => {
        console.log("error updating specific product...", err);
        res.status(500).json({
          message: "error updating specific product",
          error: err,
        });
      });
  }
});

// DELETE  /api/products/:productId  -  Deletes a specific product by id
router.delete("/products/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;
  const isAdmin = req.payload.admin

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (isAdmin){
    Product.findByIdAndRemove(productId)
      .then(() =>
        res.json({
          message: `Product with ${productId} is removed successfully.`,
        })
      )
      .catch((err) => {
        console.log("error deleting specific product...", err);
        res.status(500).json({
          message: "error deleting specific product",
          error: err,
        });
      });
  }

});

module.exports = router;
