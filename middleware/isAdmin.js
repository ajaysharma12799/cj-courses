const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await UserModel.findById(decodedToken?.id).select(
        "-password"
      );
      console.log(currentUser);
      req.user = currentUser;
      if (!(currentUser.role === "admin")) {
        return res.status(401).json({
          status: "failed",
          error: "Not Authorised, You are Not Admin",
        });
      }
      next();
    } else {
      res.status(400).json({
        status: "failed",
        error: "No Token Provided",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Unknown Error Occured",
    });
  }
};

module.exports = {
  isAdmin,
};
