import Posts from "../models/Posts";
import User from "../models/User";

export default class PostsService {

  static getPostById = async (id: string) => {
    const post: any = await Posts.findById({ _id: id }).lean();

    if (!!post.comments?.length) {
      const uniqueUsers = Object.create(null);
      post.comments.forEach(comment => {
        uniqueUsers[comment.postedBy] = comment.postedBy
      });
      const users = await User.find({
        '_id': { $in: Object.keys(uniqueUsers) }
      }).select("name");

      
      if (users) {
        const usersMap = new Map(users.map(user => {
          return [user._id.toString(), user.name]
        }))

        post.comments = post.comments.map(comment => {
          return {
            ...comment,
            user: usersMap.get(comment.postedBy.toString())
          }
        })
      }
    }

    return post;
  }
}