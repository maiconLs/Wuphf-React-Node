import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken
import getToken from './get-token.js';

const checkToken = (req, res, next) => {
  if(!req.headers.A)
}