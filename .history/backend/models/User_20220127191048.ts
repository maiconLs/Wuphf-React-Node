import mongoose from "../db/conn";
const { Schema } = mongoose;

// interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   image?: string;
//   phone: string;
//   timestamp: boolean;
// }

const User = mongoose.model(
  "User",

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
      
    },
    { timestamps: true }
  )
);

export default User;
