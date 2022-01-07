import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const createUserToken = (req, res) =>