import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken

import User from '../models/User.js';

const getUserByToken = (token, res) => {
  if(!token){ 
    res.status.json({error: "Acesso negado!"})
    return
  }

  const decoded = verify(token, 'mysecret')

  const id = decoded.id
}