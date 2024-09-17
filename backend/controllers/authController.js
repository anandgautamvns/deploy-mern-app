const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/user");

const signup = async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if(user){
      return res.status(409)
        .json({
          message: "user already exit, you can login", 
          success: false
        })
    }
    const userModel = new UserModel({ name, email, password })
    userModel.password = await bcrypt.hash(password, 10)
    await userModel.save();
    return res.status(201)
        .json({
          message: "signup successfully", 
          success: true
        })
  } catch (error) {
    return res.status(500)
      .json({
        message: "Internal Server Error",
        success: false
      })
  }
}

const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    const errorMessage = 'Auth failed email or password wrong'
    if(!user){
      return res.status(403)
        .json({
          message: errorMessage, 
          success: false
        })
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if(!isPasswordEqual){
       return res.status(403)
        .json({
          message: errorMessage, 
          success: false
        })
    }
    const jwtToken = jwt.sign(
      {email: user.email, _id: user._id},
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
    )
   
    return res.status(200)
        .json({
          message: "Login successfully", 
          success: true,
          jwtToken,
          email,
          name: user.name
        })
  } catch (error) {
    return res.status(500)
      .json({
        message: "Internal Server Error",
        success: false
      })
  }
}

module.exports = {
  signup,
  login
}