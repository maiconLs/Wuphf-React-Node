import Posts from "../models/Posts";
import { Response, Request } from "express";
import getToken from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export default class PostsController {
  static async createPost(req: Request, res: Response) {
    const images = req.files;
    const subtitle: string = req.body.subtitle;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const posts = new Posts({ 
      subtitle: subtitle,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
    });

    
    if (Array.isArray(images)) {
      images.map((image: Express.Multer.File) => {
        posts.images.push(image.filename);
        posts.images.push("test")
      });
    }

    try {
      await posts.save();
      const newPost = await posts.save();
      res.status(201).json({
        message: "Publicação criada com sucesso!",
        newPost: newPost,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    const posts = await Posts.find().sort("-createdAt");
    res.status(200).json({ publication: posts });
  }

  static async getAllUserPosts(req: Request, res: Response) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const posts = await Posts.find({ "user._id": user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      posts,
    });
  }
}
