import Publications from "../models/Publications";
import { Response, Request } from "express";
import getToken from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export default class PublicationsController {
  static async createPublication(req: Request, res: Response) {
    const images = req.files;
    const subtitle?: string = req.body.subtitle;

    if (!images) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const publication = new Publications({
      images: [],
      subtitle: subtitle,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
    });

    if (Array.isArray(images)) {
      images.map((image: Express.Multer.File) => {
        publication.images.push(image.filename);
      });
    }

    try {
      const newPublication = await publication.save();
      res.status(201).json({
        message: "Publicação criada com sucesso!",
        newPost: newPublication,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
