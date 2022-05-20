import mongoose from '../db/conn'
const { Schema } = mongoose

const ObjectId = mongoose.Types.ObjectId;

const User = mongoose.model(
  'User',

  new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
      followers: [{
        type: ObjectId,
        default: [],
        ref: 'User'
      }],
      following: [{
        type: ObjectId,
        default: [],
        ref: 'User'
      }],
    },
    { timestamps: true }
  )
)

export default User
