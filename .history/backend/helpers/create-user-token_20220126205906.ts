import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

interface IUser {
  name: string;
  _id: string;
}

const createUserToken = async (user: IUser, req: Request, res: Response) => {
  const token = sign(
    {
      name: user.name,
      id: user._id,
    },
    "mysecret"
  );

  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userId: user._id,
  });
};
export default createUserToken;
