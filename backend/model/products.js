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
                const newCart = [...result.cart, product];
                console.log(newCart);
                db.collection('auth').updateOne({ email: email }, { $set: { cart:newCart}},(err, result) => {
                    if(err){
                        throw new Error(err);
                    }
                    if(result){
                        cb();
                    }
                })


            }
        })

    }

    static fetchCart (email, cb) {
        const db = getDb();
        db.collection('auth').findOne({email:email}, (err, result) => {
            if(err){
                throw new Error(err)
            }
            if(result){
                console.log('ee');
                console.log(result);
                cb(result.cart);
            }
        })
    }
}


module.exports = Products;