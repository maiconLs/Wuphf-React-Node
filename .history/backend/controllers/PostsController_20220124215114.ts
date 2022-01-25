import Posts from '../models/Posts';
import { Response, Request } from 'express';
import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/get-user-by-token';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId

export default class PostsController{
  static async createPost(req: Request, res: Response){
    const image = req.files
    const subtile = req.body.subtitle

    if(!image){
      res.status(422).json({message: "A imagem é obrigatória!"})
      return
    }
    
    const token = getToken(req)
    const user = await getUserByToken(token)

    const 
  }
}