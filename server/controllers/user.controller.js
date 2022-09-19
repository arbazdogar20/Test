const User = require('../models/User.model');
const CryptoJS = require('crypto-js');

const signup = async (req,res) => {
    try {
        const checkUser = await User.findOne({email: req.body.email});
        if(checkUser) return res.status(409).json({message: "User Already Exist"});
        const user = new User({
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString(),
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

const login = async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).json({message: 'User Not Found'});
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SECRET);
        const passwords = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(passwords !==  req.body.password) return res.status(401).json({message:"Invalid Email or Password"});
        const {password, ...others} = user._doc;
        res.status(200).json({...others});
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

module.exports = {signup, login};