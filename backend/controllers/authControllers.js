const User=require("../models/UserModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


//register user
exports.registerUser=async(req,res)=>{
    try{
   const {name,email,password}=req.body
   //check the  required feilds
   if(!name || !email || !password){
    return res.status(400).json({ success: false, message: "Please fill all the fields" })
   }
   //check password length

    // 2. Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters",
      });
    }

//check if user already exists
   const existingUser=await User.findOne({email})
   if(existingUser){
    return res.status(400).json({ success: false, message: "User already exists" })
   }

    //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "employee",
    });
        // 6. Send response without password
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    }
    catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//login user

exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        //check the required fields
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }
    const token=jwt.sign({id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"})
    res.status(200).json({ success: true, message: "User logged in successfully", token ,  user: {
    email: user.email,
    name: user.name,
    role: user.role
  }})
    }catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}


//
// Get logged-in user profile
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.updateProfile = async (req, res) => {
  try {
  res.status(200).json({
      success: true,
      message: "admin profile updated successfully",
      user: req.user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
