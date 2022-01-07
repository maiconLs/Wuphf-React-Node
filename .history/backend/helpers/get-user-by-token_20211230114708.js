import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken

import User from '../models/User.js';

const getUserByToken = (token) => {
  if(!token){ }
}