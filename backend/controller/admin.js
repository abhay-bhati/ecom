const Products = require('../model/products');

module.exports = (req, res, next) => {
    console.log(req.body)
    res.json({message:'successful'});
    Products.save(req.body, () => {
        console.log('product added to the database');
    })

}