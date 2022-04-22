const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (!existingEmail) {
      if (!existingPhoneNumber) {
        bcrypt.hash(password, 12, async (err, hash) => {
          if (err) {
            res.status(200).json({ status: false, message: err });
          } else if (hash) {
            const user = await User.create({
              fullName,
              email,
              phoneNumber,
              password: hash,
            });
            res
              .status(200)
              .json({ status: true, message: "user created", data: user });
          }
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: " phoneNumber already used" });
      }
    } else {
      res.status(200).json({ status: true, message: " email already used" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

router.post("/login" , async(req,res)=> {
  const {email,password}= req.body;
     const existingEmail = await User.findOne({ email });
  if (existingEmail){
    bcrypt.compare(password,existingEmail.password,async(err, result)=> {
      if (err)
      {
        res.status(200).json({ status : true , message :"invalid credentials"});
      }else if (result) {
        const token =  await jwt.sign({email,fullName:existingEmail.fullName},
          process.env.SECRET_KEY , 
          {expiresIn: "2m" }
          );
        res.status(200).json({status : true , message:"you are connected",token:token})
       
      }else{
         res.status(200).json({ status: true, message: "invalid credentials" });
      }
    })
  }else {
    res.status(200).json({status : true , message:"invalid credentials"});
  }
  try{
   
  }catch (err){
    res.status(500).json({ status : false , message: err});
  }
  
    
  });
 router.get("/hello", async (req, res) => {
   try {
     res.send("hello");
   } catch (err) {
     res.status(500).json({ status: false, message: err });
   }
 });
  
module.exports = router;
