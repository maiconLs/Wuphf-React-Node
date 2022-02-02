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
      return res.status(422).json({message: ""})
    }
  }
}