import mongoose from "../db/conn";
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const Publications = mongoose.model(
  "Publications",
  new Schema(
    {
      images: {
        type: Array,
        required: true,
      },
      subtitle: {
        type: String,
      },
      Likes: [{ type: ObjectId, ref: "User" }],
      Comments: [
        {
          Text: String,
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
    },
    { timestamps: true }
  )
);

export default Publications;
