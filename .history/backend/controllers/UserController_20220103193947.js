import User from '../models/User.js';

import bcrypt from 'bcrypt'

import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken

import createUserToken from '../helpers/create-user-token.js';

export default class UserController{

  static async register(req, res){
    const {name, email, password, confirmPassword} = req.body

    if(!name){
      res.status(422).json({message: "O nome é obrigatório!"})
      return
    }
    if(!email){
      res.status(422).json({message: "O email é obrigatório!"})
      return
    }
    if(!password){
      res.status(422).json({message: "A senha é obrigatório!"})
      return
    }
    if(!confirmPassword){
      res.status(422).json({message:"A confirmação da senha é obrigatório!"})
      return
    }
    if(password !== confirmPassword){
      res.status(422).json({message: "A senha e confirmação de senha não estão iguais!"})
      return
    }

    const userExist = await User.findOne({email: email})

    if(userExist){
      res.status(422).json({message: "Este email já está em uso!"})
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
    })

    try {
     const newUser = await user.save()

     await createUserToken(newUser, req, res)

    } catch (error) {
      res.status(500).json({message: error})
    }
  }

  static async login(req, res){
    const {email, password} = req.body

    if(!email){
      res.status(422).json({message: "O email é obrigatório!"})
      return
    }
    if(!password){
      res.status(422).json({message: "A senha é obrigatório!"})
      return
    }

    const user = await User.findOne({email:email})

    if(!user){
      res.status(422).json({message: "Estes usuário não existe!"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
      res.status(422).json({message: "Senha inválida!"})
    }
    
    await createUserToken(user, req, res)
  }

  static async checkUser(req, res){
    let currentUser = ''

    try {
      
    } catch (error) {
      
    }
  }
}