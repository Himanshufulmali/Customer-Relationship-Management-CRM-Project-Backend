const mongoose = require("mongoose");
const {constant} = require("../utils/constants")


const User = new mongoose.Schema({

  userId : {
    type : String,
    unique : true,
    required : true
  },
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    minLength : 4
  },
  password : {
    type : String,
    required : true,
    minLength : 6
  },
  createdAt : {
  type : Date,
  immutable : true,
  default : () => {
    return Date.now()
  }
},
  updatedAt : {
    type : Date,
    default : () => {
        return Date.now()
    }
  },
  userType: {
    type : String,
    required : true,
    default : constant.customer
  },
  userStatus : {
    type : String,
    required : true,
    default : constant.approved
  } 
});

module.exports = mongoose.model("users",User);