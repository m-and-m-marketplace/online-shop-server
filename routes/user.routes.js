const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");


// POST /api/orders/shopping-cart  -  adds items to shopping cart
router.post('/orders/shopping-cart', isAuthenticated, (req, res, next) => {
    const userId = req.payload._id
    const newItems = {
      product: req.body.items.product,
      amount: req.body.items.amount
    }
  
  
  User.findByIdAndUpdate(userId, { $push: { shoppingCart: newItems } }, {new: true})
          .then(response => res.json(response))
          .catch(err => {
              console.log("error adding to shopping cart...", err);
              res.status(500).json({
                  message: "error adding to shopping cart",
                  error: err
              })
          }
          );
  });

  // POST /api/products/:productId/add  Retrieves a specific product by id
router.post("/products/:productId/add", isAuthenticated, (req, res, next) => {
    // const { id } = req.params;
    const newProduct  = req.body.newItem;
    const userId = req.payload._id
  
  
    User.findByIdAndUpdate(userId, { $addToSet: { watchlist: newProduct } }, {new: true})
      .then((result) => {
        console.log(result);
        // res.redirect("/");
      })
      .catch((err) => {
        console.log("error adding to watchlist...", err);
        res.status(500).json({
          message: "error adding to watchlist...",
          error: err,
        });
      });
  });

  router.get("/account", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id

    User.findById(userId)
    .populate("shoppingCart.product")
    .populate("watchlist")
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        console.log(error)
    })
  } )

  router.put("/orders/checkout", isAuthenticated, (req,res,next) => {
    const userId = req.payload._id

    User.findById(userId)
    .populate("shoppingCart.product")
    .populate("shoppingCart.amount")
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        console.log(error)
    })
  })

  module.exports = router;