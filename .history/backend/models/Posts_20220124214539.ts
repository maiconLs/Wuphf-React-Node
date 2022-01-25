import mongoose from '../db/conn';
const {Schema} = mongoose;

const Posts = mongoose.model(
  'Posts',
  new Schema({

    image: {
      type: Array,
      required: true,
    },
    subtitle:{
      type
    }
    comment: {
      type: String,
    },
    like: {
      type: Number,
    },
    user: Object,
  },
    {timestamps: true},
  ),
)

export default Posts