const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    let token = req.headers["X-Auth-Token"];
  if(!token)
  {
    token = req.headers["x-auth-token"];
  }
  if(!token)
  {
    res.send({status : false, msg : "Token must be present"})
  }

  // if token exist then we have to verify it

  let jwtValidate =  jwt.verify(token, "functionup-radon");
  if(!jwtValidate)
  {
    res.send({status : false, msg : "Token is Invalid"})
  }
  next()
}

module.exports.validateToken = validateToken;