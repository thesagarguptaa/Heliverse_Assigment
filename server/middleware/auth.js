const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extract token

    console.log("i am in auth");

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TOken is missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isChecker

exports.isChecker = async (req, res, next) => {
  try {
    if (req.user.login !== "yes") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
