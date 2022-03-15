require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "home2go", (err, user) => {
            if(err) reject(err)
            resolve(user);
        });
    });
}


module.exports = async (req, res, next) => {

    if(!req.headers.authorization)
        return res.status(400).send({err: "Headers not present"});

    
    if(!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({err: "Invalid Header"});

    const token = req.headers.authorization.split(" ")[1];
    let user;
    try {
        user = await verifyToken(token);
    } catch(e) {
        return res.status(400).send({err: "Invalid Token"});
    }
    req.user = user.user;
    return next();
};