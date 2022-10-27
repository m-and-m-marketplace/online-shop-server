const router = require("express").Router();
const mongoose = require("mongoose")

const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const User = require('../models/User.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// POST /api/orders  -  Creates a new order
router.post('/order', isAuthenticated, (req, res, next) => {
//    const { customer, products } = req.body;

    const newOrder = {
        customer,
        products: []
    };

    Order.create(newOrder)
        .then(response => res.json(response))
        .catch(err => {
            console.log("error creating a new order...", err);
            res.status(500).json({
                message: "error creating a new order",
                error: err
            })
        }
        );
});


// GET /api/orders  -  Get list of orders
router.get('/orders', (req, res, next) => {
    Order.find()
    //  .populate('tasks')
      .then(allOrders => res.json(allOrders))
      .catch(err => {
        console.log("error getting list of orders...", err);
        res.status(500).json({
            message: "error getting list of orders",
            error: err
        })
    });
  });


//  GET /api/orders/:orderId -  Retrieves a specific order by id
router.get('/orders/:orderId', (req, res, next) => {
    const { orderId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    Order.findById(orderId)
   //   .populate('tasks')
      .then(order => res.json(order))
      .catch(err => {
        console.log("error getting specific order...", err);
        res.status(500).json({
            message: "error getting specific order",
            error: err
        })
    });
  });


// PUT  /api/orders/:orderId  -  Updates a specific order by id
router.put('/orders/:orderId', isAuthenticated, (req, res, next) => {
    const { orderId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndUpdate(orderId, req.body, { new: true })
      .then((updatedOrder) => res.json(updatedOrder))
      .catch(err => {
        console.log("error updating specific order...", err);
        res.status(500).json({
            message: "error updating specific order",
            error: err
        })
    });
  });


// DELETE  /api/orders/:orderId  -  Deletes a specific order by id
router.delete('/orders/:orderId', isAuthenticated, (req, res, next) => {
    const { orderId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Order.findByIdAndRemove(orderId)
      .then(() => res.json({ message: `Order with ${orderId} is removed successfully.` }))
      .catch(err => {
        console.log("error deleting specific order...", err);
        res.status(500).json({
            message: "error deleting specific order",
            error: err
        })
    });
  });



module.exports = router;