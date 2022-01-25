import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken

import User from "../models/User"; 

interface IUserPayload {
  id: string;
}

async function getUserByToken(token: string) {
  if (!token){
    throw new Error("Acesso negado!")
  }

  const decoded = verify(token, 'mysecret') as IUserPayload;

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
}

export default getUserByToken