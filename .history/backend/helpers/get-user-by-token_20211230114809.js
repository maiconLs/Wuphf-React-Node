import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken

import User from '../models/User.js';

const getUserByToken = (token, res) => {
  if(!token){ 
    res.status.json({error: "Token inválido"})
  }
}