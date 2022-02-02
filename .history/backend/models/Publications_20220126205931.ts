import mongoose from "../db/conn";
const { Schema } = mongoose;

const Publications = mongoose.model(
  "Publications",
  new Schema(
    {
      image: {
        type: Array,
        required: true,
      },
      subtitle: {
        type: String,
      },
      comment: {
        type: String,
      },
      like: {
        type: Number,
      },
      user: Object,
    },
    { timestamps: true }
  )
);

export default Publications;
