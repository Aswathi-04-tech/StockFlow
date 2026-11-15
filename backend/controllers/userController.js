const User=require("../models/UserModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");


exports.CreateEmployee=async(req,res)=>{
    try{
        const{name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({ success: false, message: "Please fill all the fields" })
        }

        if(password.length<6){
            return res.status(400).json({ success: false, message: "Password must contain at least 6 characters" })
        }

        const existingEmployee=await User.findOne({email})
        if(existingEmployee){
            return res.status(400).json({ success: false, message: "Employee already exists" })
        }   

        const hashedPassword=await bcrypt.hash(password,10)
        const employee=await User.create({
            name,
            email:email.toLowerCase().trim(),
            password:hashedPassword,
            role:"employee"
        })
        res.status(201).json({ success: true, message: "Employee created successfully", employee:{ name: employee.name, email: employee.email, role: employee.role } })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}