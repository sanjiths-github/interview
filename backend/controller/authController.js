import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'


export const registerController = async(req,res) => {
    try {
        const{name,email,password} =req.body

        //validation
        
        if(!name){
            return res.send({message:"Name is required"})
        }
        if(!email){
            return res.send({message:"Email is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }

        //existing user

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"already resiger please login"
            })
        }


        const user = await new userModel({name,email,password}).save()
        res.status(201).send({
            success:true,
            message:"user register succesfullu",
            user,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        message:'error in registration',
        error
        })
    }
}


export const loginController = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email not registered'
            })
        }
        
const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
    expiresIn: "7d"
})
res.status(200).send({
    success:true,
    message:"login successfully",
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,

    },
    token,
})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        })
        
    }
}

export const testController = (req,res) => {
  res.send('Protected')
}