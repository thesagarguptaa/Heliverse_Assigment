const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Signup
exports.Signup = async (req, res) => {
  try {
    //fetch data
    const { Name, email, password } = req.body;

    //validation
    if (!Name || !email || !password) {
      res.json({
        success: false,
        message: "Enter all Fields",
      });
    }

    //check User is exist or not
    const Userexist = await User.findOne({ email });

    if (Userexist) {
      return res.status(400).json({
        success: false,
        message: "User already Registered Go to Login",
      });
    }

    //Hashpassword
    let hashpassword;

    try {
      hashpassword = await bcrypt.hash(password, 10);
      console.log(hashpassword);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "error in Hashing password",
        error: error.message,
      });
    }

    console.log("creeate in enrty  11 ");

    //Create Entry
    const user = await User.create({
      Name,
      email,
      password: hashpassword,
      blogs: [],
    });

    //return response

    res.status(200).json({
      success: true,
      message: "User successfully Signup",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in  code",
      Error: error.message,
    });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;
    console.log("Login ", email, password);

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill email and password section",
      });
    }

    //check user is registerd or not
    let user = await User.findOne({ email }).populate("teams").exec();
    console.log("check user is present");

    if (!user) {
      console.log("user is not present");
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }

    console.log("user", user);

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      console.log("password is correct");
      const token = jwt.sign(
        { email: user.email, id: user._id, login: "yes" },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.toObject();
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log("login user", user);
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failure",
      error: error.message,
    });
  }
};

//example
exports.example = async (req, res) => {
  try {
    console.log("erorr");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

// exports.example = async (req, res) => {
//   try {
//     const { id, email } = req.body;

//     const response = User.findByIdAndUpdate(
//       { _id: id },
//       { email: email },
//       { new: true }
//     );
//   } catch (error) {}
// };
