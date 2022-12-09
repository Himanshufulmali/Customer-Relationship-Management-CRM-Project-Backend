const userModels = require("../models/userModel");
const {constant} = require("../utils/constants");

/// creating validation for user while signup ///

exports.signupValidation = async(req,res,next) => {
    try{

    if(!req.body.userId){
        return res.status(400).send("userId is not provided");
    }

    const user = await userModels.findOne({userId : req.body.userId})
    if(user !== null){
        return res.status(400).send("userId is already taken");
    } 

    if(!req.body.name){
        return res.status(400).send("Name is not provided"); 
    }

    if(!req.body.email){
        return res.status(400).send("Email is not provided"); 
    }

    const validEmail = await userModels.findOne({email : req.body.email});
    if(validEmail !== null){
        return res.status(400).send("Email is already registered"); 
    }

    if(!isValidEmail(req.body.email)) {
        return res.status(400).send("Email is not valid");
    } 

    if(req.body.userType === constant.admin){
        return res.status(400).send("User cant apply for Admin");
        }
       
        const users = [constant.customer,constant.engineer];
        if(!users.includes(req.body.userType)){
            return res.status(400).send("User can only apply for CUSTOMER || ENGINEER");
        }
       

    if(!req.body.password){
        return res.status(400).send("Password is not provided");
    }

    next();

}catch{
    res.status(400).send("error in signup validation")
}
}

/// checking email validation /// 

const isValidEmail = (email) => {
    return String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


/// signin validation ///

exports.signinValidation = async(req,res,next) => {
 
    try{

    if(!req.body.email){
        return res.status(400).send("Email is not provided");
    }

    if(!req.body.password){
        return res.status(400).send("Password is not provided");
    }

    next();
    
}catch{
    res.status(500).send("error in signin validation");
}
}

