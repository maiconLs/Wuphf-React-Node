import User from '../models/User.js';

import bcrypt from 'bcrypt'

import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken

import createUserToken from '../helpers/create-user-token.js';
import getToken from '../helpers/get-token.js';
import getUserByToken from '../helpers/get-user-by-token.js';

export default class UserController{

  static async register(req, res){
    const {name, username, email, password, confirmPassword} = req.body

    if(!name){
      res.status(422).json({message: "O nome é obrigatório!"})
      return
    }
    if(!username){
      res.status(422).json({message: "O nome do utilizador é obrigatório!"})
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
    const userNameExist = await User.findOne({username: username})

    if(userNameExist){
      res.status(422).json({message: "Nome de utilizador já está em uso!"})
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
      username: username,
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
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
      res.status(422).json({message: "Senha inválida!"})
      return
    }
    
    await createUserToken(user, req, res)
  }

  static async checkUser(req, res){
    let currentUser 

    try {
      if(req.headers.authorization){
        const token = getToken(req)
        const decoded = verify(token, 'mysecret')
        currentUser = await User.findById(decoded.id)

        currentUser.password = undefined
      } else{
        currentUser = null
      }

      res.status(200).send(currentUser)
    } catch (error) {
      res.status(422).json({message: error})
    }
  }

  static async editUser(req, res){
    const token = getToken(req)
    const user = await getUserByToken(token)

    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    let image = ''

    if(req.file){
      image = req.file.filename
    }

    if(!name){
      res.status(422).json({message: "O nome é obrigatório!"})
      return
    }

    user.name = name

    if(!username){
      res.status(422).json({message: "O nome é obrigatório!"})
      return
    }

    user.name = username

    if(!email){
      res.status(422).json({message: "O email é obrigatório!"})
      return
    }

    const userExits = await User.findOne({email: email})

    if(user.email !== email && userExits){
      res.status(422).json({message: "Utilize outro email!"})
      return
    }

    user.email = email

    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }

    if(password !== confirmpassword){
      res.status(422).json({message: "As senhas não conferem!"})
      return
    } else if(password === confirmpassword && password !== null){

      const salt = await genSalt(12)
      const password = req.body.password

      const passwordHash = await hash(password, salt)

      user.password = passwordHash
    }

    const data = {
      name: name,
      username: username,
      user.email: email,
    }

    try {
      const updateUser = await User.findOneAndUpdate(
        {_id: user._id },
        {$set: user},
        {new: true},
      )

      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updateUser,
      })
    } catch (error) {
      res.status(500).json({message: error})
    }
  }

}

