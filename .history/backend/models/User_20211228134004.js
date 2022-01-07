import mongoose from '../db/conn'
import { Schema } from 'mongoose'

const User = mongoose.model(
  'User',
  new Schema({
    name:{
      type:String,
      required: true
    },
    email:{
      type:String,
      required: true
    },
    password:{
      type:String,
      required: true
    },
    image:{
      type:String,
    },
  }
    {times}
  )
)

export default User