const jwt = require('jsonwebtoken');


function authorization(req, res, next){
    console.log('auth');
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, result) => {
        if(err){
            throw new Error(err)
        };
        if(result !== null){
            req.user = result.email;
            next();
        }
        else{
            console.log(result);
        }
    })

};


module.exports = authorization;