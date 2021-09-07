const jwt = require('jsonwebtoken');


function authorization(req, res, next) {
    console.log('auth');
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, result) => {
        if (err) {
            console.log(err);
            req.user = ''
            req.name = ''
            next();
        }
        else {
            if (result !== null) {
                console.log('aaaaaaaaaaaaaaaaauuuuuuuuu');
                console.log(req.user);
                console.log(req.name);
                req.user = result.email;
                req.name = result.name
                next();
            }
            else {
                console.log(result);
            }
        }
    })

};


module.exports = authorization;