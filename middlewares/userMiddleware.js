const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const {constant} = require("../utils/constants");

exports.verifyJwtToken = (req,res,next) => {
try{
    const token = req.headers["access-token"];

    if(!token){
        return res.status(403).send("No access token provided");
    }

      jwt.verify(token,process.env.secret,(err,decoded) => {
        if(err){
            return res.status(400).send("UnAuthorized token")
        }

        req.email = decoded.id;
        next();

     });


}catch{
    res.status(400).send("error while verifyJwtToken");
}
}


/// only admin is allowed to perform certain activities ///

exports.adminRights = async(req,res,next) => {
    try{

 const user = await Users.findOne({email : req.email});
    //console.log(user);

if(user && user.userType === constant.admin){    
    next();
}else {
   return res.status(400).send("Only Admin can have these rights.")
}

    }catch{
        res.status(400).send("error in Admin Rights");
    }
}