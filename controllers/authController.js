const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {constant} = require("../utils/constants");

/// creating handler for user signup ///

exports.signup = async(req,res) => {
    try{
     if(req.body.userType !== constant.customer){
        req.body.userStatus = constant.pending
        }
const userObj = {
    userId : req.body.userId,
    name : req.body.name,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password,6),
    userType : req.body.userType,
    userStatus : req.body.userStatus
}
const createdUser = await userModel.create(userObj);

const response = {
   userId : createdUser.userId,
   name : createdUser.name,
   email : createdUser.email,
   userType : createdUser.userType,
   userStatus : createdUser.userStatus,
   createdAt : createdUser.createdAt,
   updatedAt : createdUser.updatedAt
}
 return res.status(201).send(response);

     }catch{
         res.status(400).send("error while signup");
     }
} 

/// creating handler for user signin ///

exports.signin = async(req,res) => {
    try{
    const user = await userModel.findOne({email : req.body.email});

    if(user === null){ 
       return res.status(400).send("user is not registered");
    }
    const validPass = bcrypt.compareSync(req.body.password,user.password);

    if(!validPass){
       return res.status(400).send("password is not valid");
    }

    const token = jwt.sign({
        id : user.email
    },process.env.secret,{
     expiresIn : 600
    });
   
    const response = {
        userId : user.userId,
        name : user.name,
       email : user.email,
       userType : user.userType,
       userStatus : user.userStatus,
       accessToken : token,
       createdAt : user.createdAt,
       updatedAt : user.updatedAt
    }
   
    return res.status(200).send(response);

}catch{
    res.status(400).send("error in signin");
}
}