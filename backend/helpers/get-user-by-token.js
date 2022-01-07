import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken

import User from '../models/User.js';

const getUserByToken = async (token, res) => {
  if(!token){ 
    res.status(401).json({error: "Acesso negado!"})
    return
  }

  const decoded = verify(token, 'mysecret')

  const userId = decoded.id

  const user = await User.findOne({_id: userId})

  return user
}

export default getUserByToken