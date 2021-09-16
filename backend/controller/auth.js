const Auth = require('../model/auth');
const jwt = require('jsonwebtoken');

exports.loginController = (req, res, next) => {
    console.log('login');
    console.log(req.body);
    Auth.authenticate(req.body, (result) => {
        console.log(result);
        if (result === null) {
            console.log('no user found')
            res.json({ message: 'no user found' });
            return
        }
        if (result.password === req.body.password) {
            const token = jwt.sign({ email: result.email, name:result.fullName }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            res.json({ token: token })
        }
        else {
            res.json({message:'password is incorrect'});
        }


    })
};

exports.registerController = (req, res, next) => {
    console.log('register');
    console.log(req.body);
    const data = {...req.body, cart:[], myorders:[], mywishlist:[]};
    console.log('2323323');
    console.log(data);
    console.log('sdlf;asdf');
    Auth.save(data, (result) => {
        console.log(result)
    })

}