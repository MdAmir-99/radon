const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticate = function(req, res, next) {

    // haeder is set or not
    
    let token = req.headers['X-Auth-Token'];
    if(!token)
    {
        token = req.headers['x-auth-token']
    }
  
  if(!token){
    res.send({status : false, msg : "Header Must be Present !"})
  }

  // verify Token (token is valid or not)

  let validateToken = jwt.verify(token, 'functionup-thorium')
  if(!validateToken)
  {
    res.send({status : false, msg : "Invalid Token !"})
  }

//   return decodeToken
  req.dataFromMiddleware = validateToken;
    next()
}


const authorise = function(req, res, next) {
    // check this User is Authorised or not
    let validateToken = req.dataFromMiddleware;
  let userId = req.params.userId;
  let validUser = validateToken.userId;
  if(userId !== validUser)
  {
    res.send({status : false, msg : "Sorry This user is not Authorised !"})
  }

    next()
}


// const dbFetch = async (req, res, next)=>{
//     let userId = req.params.userId;
//   let userDetails = await userModel.findById(userId);
//   if (!userDetails){
//     return res.send({ status: false, msg: "No such user exists" });
//   }
//   req.dataPass = userDetails;
//   next()
// }


module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
// module.exports.dbFetch = dbFetch;