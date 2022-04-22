const mongoose = require ("mongoose");
const ProfileSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "user"
  },
  age: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  Address: {
    type: String,
    required: true,
  },

  follows: {
    type: Number,
  },
pays :{
  type:String,
  required:true,
},
  tags: {
    type: Number,
  },
  social : {
    facebook:{
      type: String
    },
    instagram:{
      type: string 
    },
  }
});
module.exports =Profile = mongoose.model("profile", ProfileSchema);