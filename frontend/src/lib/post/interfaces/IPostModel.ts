import { IPostCommentModel } from "./IPostCommentModel";

export interface IPostModel {
  _id: string
  likes: number[]
  subtitle: string
  comments: IPostCommentModel[]
  images: string[]
  user: {
    _id: string
    username: string
    image: string
  },
  metadata: {
    commentsLength: number
  }
}