const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request
  //the second parameter is always the response
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await userModel.create(data);
      // console.log(req.newAtribute);
      return res.status(201).send({ msg: savedData });
    } else {
      res.status(400).send({ msg: "Please Filled All The Fields" });
    }
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    if (!(userName && password)) {
      res.status(400).send({ msg: "Username and Password is mandetory !" });
    }
    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });
    if (!user)
      return res.status(400).send({
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
        organisation: "FUnctionUp",
      },
      "functionup-thorium"
    );
    res.setHeader("x-auth-token", token);
    res.status(200).send({ status: true, data: token });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res
        .status(400)
        .send({ status: false, msg: "No such user exists" });
    }
    // let userDetails = req.dataPass;
    return res.status(200).send({ status: 200, data: userDetails });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;

    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(400).send("No such user exists");
    }

    let firstName = "Md";
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { firstName } },
      { new: true }
    );
    res.status(202).send({ status: true, data: updatedUser });
  } catch (err) {
    return res.status(500).send({ status: 500, msg: err.message });
  }
};

const postMessage = async function (req, res) {
  let message = req.body.message;
  let user = await userModel.findById(req.params.userId);
  if (!user) return res.send({ status: false, msg: "No such user exists" });

  let updatedPosts = user.posts;
  //add the message to user's posts
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );

  //return the updated user document
  return res.send({ status: true, data: updatedUser });
};

const deleteUser = async (req, res) => {
  // fetch this user exist in db or not
  try {
    let userId = req.params.userId;
    let data = await userModel.findById(userId);
    if (!data) {
      res.status(400).send({ status: false, msg: "Sorry No Data Found !" });
    }

    // if user exist in the db then update isDeleted key to true by using update query

    let updateData = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    res.status(200).send({ status: true, data: updateData });
  } 
  catch (err) {
    return res.status(500).send({ status: 500, msg: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;
