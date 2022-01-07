import User from '../models/User.js';

import bcrypt from 'bcrypt'
const { genSalt, hash, compare } = bcrypt

import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken

export default class UserController{

  static async register(req, res){
    const {name, email, password, confirmPassword} = req.body

    if(!name){
      res.status(422).json("O nome é obrigatório!")
      return
    }
    if(!email){
      res.status(422).json("O email é obrigatório!")
      return
    }
    if(!password){
      res.status(422).json("A senha é obrigatório!")
      return
    }
    if(!co){
      res.status(422).json("O nome é obrigatório!")
      return
    }
  }
}