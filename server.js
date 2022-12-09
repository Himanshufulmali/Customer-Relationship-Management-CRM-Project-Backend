const express = require("express");
const mongoose = require("mongoose");
const {PORT} = require("./configs/serverConfig");
const bodyParser = require("body-parser");
const userModels = require("./models/userModel");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json({urlencoded:true}));

/// to remove mongoose deprecation warning ///

mongoose.set('strictQuery', true); 

/// mongoose connection ///

mongoose.connect(process.env.mongo);
const db = mongoose.connection;
db.on("error",() => {
    console.log("error while connecting mongo");
});
db.once("open", () => {
    console.log("connected to mongo successfully");
    init();
})


const init = async() => {
  try{
    ////  to drop collection  ///

    // await userModels.collection.drop();
    // console.log("collections have been dropped successfully");

    const user = await userModels.findOne({userId : "admin"})
   if(user){
   console.log("admin is already present");
   return;
   }

   ///  we are creating admin ///

   const admin = await userModels.create({
    userId : "admin",
    name : "Himanshu",
    email : "str.piyush@gmail.com", 
    password : bcrypt.hashSync(process.env.adminPass,6),
    userType : "ADMIN"
   })
     console.log(admin);
  }catch{
    res.status(400).send("error while creating Admin");
  }
}


/// importing routes ///

require("./routes/authRoute")(app);
require("./routes/userRoute")(app);


/// starting server ///

const start = async(err) => {
    if(err){
        console.log("error while connecting server");
    }
    await app.listen(PORT);
    console.log("connected to server successfully on : ", PORT);
}
start();