import mongoose from '../db/conn';
const {Schema} = mongoose;

const Posts = mongoose.model(
  'Posts',
  new Schema({

    image: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    like: {
      type: Number,
    },
    user: Object
  },
    {timestamp: true},
  )
)