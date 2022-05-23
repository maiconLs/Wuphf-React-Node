import mongoose from "../db/conn";
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const Posts = mongoose.model(
  "Posts",
  new Schema(
    {
      images: {
        type: Array,
        required: true,
      },
      subtitle: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
      comments: [
        {
          text: String,
          postedBy: {
            type: ObjectId,
            ref: "User",
          },
        },
      ],
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
      user: Object,
      metadata: {
        commentsLength: {
          type: Number,
          default: 0
        }
      }
    },
    { timestamps: true }
  )
);

export default Posts;
