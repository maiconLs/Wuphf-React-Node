const getToken = (req) => {

  const authHeader = req.headers.Authorization
  const token = authHeader.split(" ")[1]
}