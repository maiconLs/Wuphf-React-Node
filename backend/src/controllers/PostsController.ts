import { Request, Response } from 'express'
import getToken from '../helpers/get-token'
import getUserByToken from '../helpers/get-user-by-token'
import Posts from '../models/Posts'
import PostsService from '../services/PostService'

export default class PostsController {
  static async createPost(req: Request, res: Response) {
    const images = req.files
    const subtitle: string = req.body.subtitle

    const token = getToken(req)
    const user = await getUserByToken(token)

    const posts = new Posts({
      subtitle: subtitle,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
    })

    if (Array.isArray(images)) {
      images.map((image: Express.Multer.File) => {
        posts.images.push(image.filename)
      })
    }

    try {
      await posts.save()
      const newPost = await posts.save()
      res.status(201).json({
        message: 'Publicação criada com sucesso!',
        newPost: newPost,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req: Request, res: Response) {
    const posts = await Posts.find().sort('-createdAt')
    res.status(200).json(posts)
  }

  static async getPostsByFollowing(req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const post = user.following.map((following: any) => {
      return following
    })

    const allPostsId = [...post, user._id]

    const posts = await Posts.find({
      'user._id': allPostsId.map((id) => {
        return id
      }),
    }, { comments: 0 }).sort('-createdAt')

    res.status(200).json({
      posts: posts,
    })
  }

  static async getAllUserPosts(req: Request, res: Response) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const posts = await Posts.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({
      posts: posts,
    })
  }

  static async getPostById(req: Request, res: Response) {
    const id = req.params.id
    try {
      const post = await PostsService.getPostById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async likes(req: Request, res: Response) {
    try {
      const post = await Posts.findById(req.params.id)

      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } })
        res.status(200).json('The post has been liked')
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } })
        res.status(200).json('The post has been disliked')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async comment(req: Request, res: Response) {
    try {
      const post = await Posts.findById(req.params.id)
      const comment = { text: req.body.text, postedBy: req.body.id }
      const savedComment = await post.updateOne({ 
        $set: {
          metadata: {
            commentsLength: post.metadata.commentsLength + 1 
          }
        },
        $push: { 
          comments: comment 
        },
      })
      res.status(200).json(savedComment);
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deletePost(req: Request, res: Response) {
    const id = req.params.id

    const post = await Posts.findOne({ _id: id })

    if (!post) {
      res.status(404).json({ message: 'Post não encontrado!' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (post.user._id.toString() !== user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Posts.findByIdAndRemove(id)

    res.status(200).json({ message: 'Post removido com sucesso!' })
  }
}
