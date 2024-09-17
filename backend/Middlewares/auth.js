const jwt = require('jsonwebtoken')

const ensureAuthenicated = (req, res, next) => {
  const auth = req.headers['authorization'];
  if(!auth){
    return res.status(401)
      .json({
        messasge: 'Unauthorized, token is required!'
      })
  }
  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET)
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401)
      .json({
        messasge: 'Unauthorized, token is wrong or expire!'
      })
  }
}

module.exports = ensureAuthenicated