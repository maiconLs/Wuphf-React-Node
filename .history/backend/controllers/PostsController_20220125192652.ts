import Posts from '../models/Posts';
import { Response, Request } from 'express';
import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/get-user-by-token';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId

interface Arrayish<T> {
  map<U>(callback: (value: T, index: number, array: Arrayish<T>) => U, thisArg?: any): Array<U>;
}

export default class PostsController{
  static async createPost(req: Request, res: Response){
    const images: Arrayish<String> = req.files
    const subtitle: string = req.body.subtitle

    if(!images){
      res.status(422).json({message: "A imagem é obrigatória!"})
      return
    }
    
    const token = getToken(req)
    const user = await getUserByToken(token)

    const posts = new Posts ({
      images: [],
      subtitle: subtitle,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        image: user.image 
      }
    })

    images.map((image) => {
      posts.image.push(image.filename)
    })

    try{
      const newPost = await posts.save()
      res.status(201).json({
        message: 'Publicação criada com sucesso!',
        newPost: newPost,
      })
    }catch(error){
      res.status(500).json({message: error})
    }
  }
}