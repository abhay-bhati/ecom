const Products = require('../model/products');

exports.allProds = (req, res, next) => {
    console.log('all prods');
    Products.fetch((result) => {
        console.log(result)
        console.log(req.user);
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuu');
        console.log(req.name);
        res.json({result:result,user_info:[req.user, req.name]});
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
};

exports.incrementCart = (req, res, next) => {
    console.log(req.body);
    console.log('inc cart');
    console.log(req.user);
    Products.fetchCart(req.user, (result) => {
        console.log('contro prod.js 46');
        console.log(result);
        const targetIndex = result.findIndex(element => element.id === req.body.product_id);
        console.log(targetIndex);
        if(req.body.action==='plus'){
            if(result[targetIndex].quantity < 5){
                result[targetIndex].quantity += 1;
            }
        }
        else if(req.body.action==='minus'){
            if(result[targetIndex].quantity > 1){
                result[targetIndex].quantity -= 1
            }
        }
        else{
            result.splice(targetIndex,1);
        }
        console.log('51');
        console.log(result);
        Products.updateCart(req.user, result, () => {
            console.log('update done');
            console.log(result);
            res.json(result);
        }) 

    })

}