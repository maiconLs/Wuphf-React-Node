import { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken
import getToken from './get-token'

interface IPayload {
  verified: string
}

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado!' })
  }
  const token = getToken(req)

  if (!token) return res.status(401).json({ message: 'Acesso negado!' })

  try {
    const { verified } = verify(token, 'mysecret') as IPayload
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ message: 'O Token é inválido!' })
  }
}

export default checkToken
