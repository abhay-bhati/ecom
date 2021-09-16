const express = require('express');
const productsController = require('../controller/products')
const authorization = require('../authorization');

const router = express.Router();


router.get('/all-products',authorization, productsController.allProds);

router.post('/product-by-id',authorization, productsController.prodById);

router.post('/add-to-cart',authorization, productsController.addToCart)

router.get('/cart',authorization, productsController.fetchCart);

router.post('/cart-increment', authorization, productsController.incrementCart);

router.post('/add-to-orders', authorization, productsController.addToOrders);

router.get('/myorders', authorization, productsController.fetchOrders);

router.post('/add-to-wishlist', authorization, productsController.addToWishlist);

router.get('/mywishlist', authorization, productsController.fetchWishlist);


module.exports = router;