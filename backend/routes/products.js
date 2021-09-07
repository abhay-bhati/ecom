const express = require('express');
const productsController = require('../controller/products')
const authorization = require('../authorization');

const router = express.Router();


router.get('/all-products', productsController.allProds);

router.post('/product-by-id', productsController.prodById);

router.post('/add-to-cart',authorization, productsController.addToCart)

router.get('/cart',authorization, productsController.fetchCart);

router.post('/cart-increment', authorization, productsController.incrementCart)



module.exports = router;