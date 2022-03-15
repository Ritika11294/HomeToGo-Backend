require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

const newToken = (user) => {
    return jwt.sign({user},"secret");
}

const login = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send({errors});

        let user;

        user = await User.findOne({email: req.body.email});

        if(!user) return res.status(400).send({err : "Email does not Exists"});

        const isValid = user.matchPassword(req.body.password);

        if(!isValid) return res.status(400).send({err : "Invalid password"});

        const token = newToken(user);

        return res.status(200).send({user, token});

    } catch(e) {
        return res.status(500).send({err: e.message})
    }
};

const register = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send({errors});
    
        let user;

        user = await User.findOne({email:req.body.email}).lean().exec();

        if(user) return res.status(400).send({err : "User Email Exists"});

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        let token = newToken(user);

        return res.status(200).send({user, token});

    } catch(e) {
        return res.status(500).send({err: e.message})
    }
};

module.exports = {login, register};