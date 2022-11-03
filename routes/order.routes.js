const router = require("express").Router();
const mongoose = require("mongoose")

const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const User = require('../models/User.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

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

// POST /api/orders/create  -  Creates a new order
router.post('/orders/create', isAuthenticated, (req, res, next) => {   //
//    const { customer, products } = req.body;

    const newOrder = {
        customer: req.payload._id,
        items: req.body.items,
    };
    //Product.findById()
    Order.create(newOrder)
        .then(response => {
          console.log(response);
          res.json(response)
        })
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
router.get('/orders', isAuthenticated, (req, res, next) => {
 
    Order.find({customer: req.payload._id})
     // .populate('Product')
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
      .populate('items.product')
      .then(order => {
        console.log(order);
        res.json(order)
      })
      .catch(err => {
        console.log("error getting specific order...", err);
        res.status(500).json({
            message: "error getting specific order",
            error: err
        })
    });
  });


// PUT  /api/orders/:orderId  -  Updates a specific order by id
router.put('/orders/:orderId', isAuthenticated, (req, res, next) => {  //
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
router.delete('/orders/:orderId', isAuthenticated, (req, res, next) => {   // 
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