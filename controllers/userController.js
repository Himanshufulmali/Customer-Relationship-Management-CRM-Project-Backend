const User = require("../models/userModel");

/// handler for getting all user list /// 

exports.findAllData = async(req,res) => {
    try{
   const users = await User.find();
   const user =  users.map((data) => {
    return {

        mongoDbId : data.id,
        userId : data.userId,
        name : data.name,
        email : data.email,
        userType : data.userType,
        userStatus : data.userStatus,
        createdAt : data.createdAt,
        updatedAt : data.updatedAt
    }
   })
    return res.status(200).send(user);

    }catch{
        res.status(200).send("error while get call");
    }
}