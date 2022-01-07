import mongoose from '../db/conn.js'
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema({
    name:{
      type:String,
      required: true
    },

    username:{
      
    }
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
  },
    {timestamps: true},
  ),
)

export default User