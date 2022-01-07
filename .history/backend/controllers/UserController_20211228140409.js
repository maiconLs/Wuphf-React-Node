import User from '../models/User.js';

import bcrypt from 'bcrypt'
const { genSalt, hash, compare } = bcrypt

import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken

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

    const userExist = await findOne({email: email})

    if(userExist){
      res.status(422).json({message: "Este email já está em uso!"})
      return
    }
  }
}