import mongoose from '../db/conn'
import { Schema } from 'mongoose'

const User = mongoose.model(
  'User',
  new Schema({
    name:{
      type:String
    }
  })
)

export default User