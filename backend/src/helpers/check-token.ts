import { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { IUserModel } from '../lib/user/IUserModel'
const { verify } = jsonwebtoken
import getToken from './get-token'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado!' })
  }
  const token = getToken(req)

  if (!token) return res.status(401).json({ message: 'Acesso negado!' })

  try {
    req.user = verify(token, 'mysecret') as IUserModel
    next()
  } catch (err) {
    res.status(400).json({ message: 'O Token é inválido!' })
  }
}

export default checkToken
