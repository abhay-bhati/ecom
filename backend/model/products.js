const getDb = require('../database').getDb;
const objectID = require('mongodb').ObjectId;

class Products {
    static save(data, cb) {
        const db = getDb();
        db.collection('products').insertOne(data, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            cb();
        })
    }

    static fetch(cb) {
        const db = getDb();
        db.collection('products').find({}).toArray((err, result) => {
            if (err) {
                throw new Error(err)
            }
            cb(result);
        })
    }

    static prodbyid(id, cb) {
        console.log(id);
        const db = getDb();
        console.log(objectID(id));
        db.collection('products').findOne({ _id: objectID(id) }, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            cb(result);
        })
    }

    static addtocart(email, product, cb) {
        const db = getDb();

        db.collection('auth').findOne({ email: email }, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            if (result) {
                console.log('model prod.js 45');
                console.log(result.cart);
                console.log('47');
                const existingProd = result.cart.filter(element => element.id === product.id);
                console.log(existingProd);
                let newCart;
                if (existingProd.length === 0) {
                    console.log('50');
                    console.log(result.cart);
                    newCart = [...result.cart, { ...product, quantity: 1 }]
                }
                else {
                    console.log('53');
                    console.log(result.cart);
                    const newResult = result.cart.filter(element => element.id !== product.id)
                    console.log('59');
                    console.log(existingProd)
                    console.log(existingProd[0].quantity);
                    let prevQuant = existingProd[0].quantity;
                    newCart = [...newResult, { ...product, quantity: prevQuant + 1 }];
                }
                console.log('64');
                console.log(newCart);
                db.collection('auth').updateOne({ email: email }, { $set: { cart: newCart } }, (err, result) => {
                    if (err) {
                        throw new Error(err);
                    }
                    if (result) {
                        cb();
                    }
                })


            }
        })

    }

    static fetchCart(email, cb) {
        const db = getDb();
        db.collection('auth').findOne({ email: email }, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            if (result) {
                console.log('ee');
                console.log(result);
                cb(result.cart);
            }
        })
    }

    static updateCart(email, cart, cb) {
        const db = getDb();
        db.collection('auth').updateOne({ email: email }, { $set: { cart: cart } }, (err, result) => {
            if (err) {
                throw new Error(err)
            }
            else {
                cb();
            }
        })
    }

    static addtoorders(email, cartdata, cb) {
        console.log('johnnn')
        const db = getDb();
        console.log(cartdata);

        let user_id;
        db.collection('auth').findOne({ email: email }, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log('134');
            console.log(result);
            console.log(result._id);
            user_id = result._id

            db.collection('orders').insertOne({ user_id, ...cartdata }, (err, res) => {
                console.log('inserted in orders db');
                console.log('142');
                console.log(result);
                console.log(result.myorders);
                let order_id = res.insertedId
                let newOrdersArr = [...result.myorders, {order_id, ...cartdata}];
                console.log(res.insertedId)
                console.log('144');

                // db.collection('auth').findOne({ email: email }, (err, result) => {
                //     console.log('johngal')
                //     console.log(cartdata);
                //     console.log(result);
                //     console.log('1');
                //     // console.log(result.myorders);
                //     // let newOrdersArr = [...result.myorders, cartdata];
                //     console.log('2');
                //     console.log(newOrdersArr);
                db.collection('auth').updateOne({ email: email }, { $set: { myorders: newOrdersArr } }, (err, result) => {
                    if (err) {
                        console.log('err');
                        console.log(err);
                    }
                    console.log(result);
                    cb();
                })

            })

        })

    }

    static fetchorders (email, cb) {
        const db = getDb();
        db.collection('auth').findOne({email:email}, (err, result) => {
            if(err){
                throw new Error(err);
            }
            console.log('163');
            console.log(result);
            if(result===null){
                cb(result);
            }
            console.log(result.myorders);
            cb(result.myorders);
        })
    }



}



module.exports = Products;