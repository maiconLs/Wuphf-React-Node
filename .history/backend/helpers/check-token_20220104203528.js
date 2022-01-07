import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken
import getToken from './get-token.js';

const checkToken = (req, res, next) => {
  if(!req.headers.Authorization){
    res.status(401).json({message: "Acesso negado!"})
    return
  }

  const token = getToken(req)

  if(!token){
    res.status(401).json({message: "Acesso negado!"})
    return
  }

  try {
    const verified = verify(token, 'mysecret')
    req.user = verified
    next
  } catch (error) {
    res.status(400).json({message: "Token inválido!"})
  }
}

export default checkToken