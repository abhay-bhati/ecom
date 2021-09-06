const Products = require('../model/products');

exports.allProds = (req, res, next) => {
    console.log('all prods');
    Products.fetch((result) => {
        console.log(result)
        res.json(result);
    })
}

exports.prodById = (req, res, next) => {
    const prodId = req.body.prodId;
    console.log('prod by id');
    Products.prodbyid(prodId, (result) => {
        console.log(result);
        res.json(result);
    })

};

exports.addToCart = (req, res, next) => {
    console.log('add to cart');
    console.log(req.body);
    Products.addtocart(req.user, req.body, () => {
        console.log('uououououu')
        console.log('done');
    })

}

exports.fetchCart = (req, res, next) => {
    console.log('fetch cart');
    console.log(req.user);
    Products.fetchCart(req.user, (result) => {
        console.log('232');
        console.log(result);
        res.json(result);
    })
}