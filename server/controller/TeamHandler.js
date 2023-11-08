const Blog = require("../model/Blog");
const User = require("../model/User");

exports.TeamCreate = async (req, res) => {
  try {
    const userID = req.user.id;
    const useremail = req.user.email;

    const {
      first_name,
      last_name,
      email,
      avatar,
      available,
      gender,
      domain,
      _id,
    } = req.body.post;

    if (
      !userID ||
      !first_name ||
      !last_name ||
      !email ||
      !gender ||
      !avatar ||
      !available ||
      !domain
    ) {
      res.status(400).json({
        success: false,
        message: "Enter all fields",
      });
    }

    console.log("here is id ", _id);

    //Create Entry
    const entry = await Blog.create({
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });

    const update = await User.findByIdAndUpdate(
      { _id: userID },
      {
        $push: {
          teams: entry._id,
        },
      },
      { new: true }
    );

    //return response

    res.status(200).json({
      success: true,
      message: "Employee successfully Created",
      entry,
      update,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in  code",
      Error: error.message,
    });
  }
};

//get Team
exports.getUserteam = async (req, res) => {
  try {
    console.log("i am in getUserteam");
    console.log(req.user.id);

    const ID = req.user.id;

    const update = await User.findById(ID).populate("teams").exec();

    console.log(update);

    return res.status(200).json({
      success: true,
      update,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in code",
      error: error.message,
    });
  }
};

//delete blg

exports.deleteBlog = async (req, res) => {
  try {
    console.log(" i am in delete blog");
    const Id = req.body.Id;

    const userID = req.user.id;

    // console.log("ID ", Id);
    // console.log("userID ", userID);

    const update = await User.findByIdAndUpdate(userID, {
      $pull: {
        teams: Id,
      },
    });

    // console.log("user is done", update);

    const response = await Blog.findByIdAndDelete({
      _id: Id,
    });

    // console.log("response is done", response);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "team not found" });
    }

    return res.status(200).json({
      success: true,
      message: "team deleted",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "team did not deleted ",
    });
  }
};
