import mongoose from '../db/conn'
import { Schema } from 'mongoose'

const User = mongoose.model(
  'User',
  new Schema({
    name:{
      type:String,
      required: true
    }
  })
)

export default User