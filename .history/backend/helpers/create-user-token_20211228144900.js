import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const createUserToken = async (user, req, res) => {

  const token = sign({
      name: user.name,
      id: user._id
    }, 'mysecret')

    res.status(500).json({
      message: 'Você está autenticado',
      token: token,
      i
    })
  }


export default createUserToken