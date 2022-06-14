const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  // console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set : {lastName : "Amir"}}, {new : true});
  res.send({ status: true, data: updatedUser });
};


const deleteUser = async (req, res) => {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if(!user)
  {
    res.send({status : false, msg : "User Doesn't exist please enter the valide Id"})
  }

  // i have to change isDeleted key to true

  let deleteUser = await userModel.findOneAndUpdate({_id : userId}, {$set : {isDeleted : true}}, {new : true});
  res.send({status : true, msg : deleteUser})

}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;









// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmE4NmRlNzExYzk1NDMxMjcyZTYyMDEiLCJiYXRjaCI6InRob3JpdW0iLCJvcmdhbmlzYXRpb24iOiJGdW5jdGlvblVwIiwiaWF0IjoxNjU1MjA2OTc5fQ.j_gzXAEYtqG_LTBJbr7nKl_Af9-O-i-iZ3e28EFuOQs