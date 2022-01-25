import mongoose from '../db/conn';
const {Schema} = mongoose;

const Posts = mongoose.model(
  'Posts',
  new Schema({
    image: {
      type: string,
      required: true,
    }
  })
)