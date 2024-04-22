const Product = require("../model/Product");

//create employee
exports.Create = async (req, res) => {
  try {
    console.log(" i am in create employee");

    console.log(req);
    const { first_name, last_name, email, gender, domain } = req.body;
    console.log(first_name, last_name, gender, email, domain);

    if (!first_name || !last_name || !email || !gender || !domain) {
      res.status(400).json({
        success: false,
        message: "Enter all fields",
      });
    }

    //check employee is exist or not
    const Userexist = await Employee.findOne({ email });

    if (Userexist) {
      return res.status(400).json({
        success: false,
        message: "Employee already Registered Go to Login",
      });
    }

    //Create Entry
    const entry = await Product.create({
      first_name,
      last_name,
      email,
      gender,
      avatar: "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
      domain,
      available: true,
    });

    //return response

    res.status(200).json({
      success: true,
      message: "Employee successfully Created",
      entry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error in  code",
      Error: error.message,
    });
  }
};

//update employee
exports.update = async (req, res) => {
  try {
    const { _id, first_name, last_name, email, gender, domain } = req.body;

    if (!_id || !first_name || !last_name || !email || !gender || !domain) {
      res.status(400).json({
        success: false,
        message: "Enter all fields",
      });
    }

    const Userexist = await Product.findOne({ email });

    if (!Userexist) {
      return res.status(400).json({
        success: false,
        message: "Employee is not Registered ",
      });
    }

    const update = await Employee.findByIdAndUpdate(
      _id,
      {
        first_name,
        last_name,
        email,
        gender,
        avatar: "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
        domain,
        available: true,
      },

      { new: true }
    );

    //return response

    res.status(200).json({
      success: true,
      message: "Employee successfully updated",
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

//getAll
exports.getAll = async (req, res) => {
  try {
    console.log(" I am in getAll ");
    const find = await Product.find({});

    return res.status(200).json({
      success: true,
      data: find,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in code",
      error: error.message,
    });
  }
};

//get Filtered
exports.getFilterd = async (req, res) => {
  try {
    // console.log(" I am in get filtered ");
    // console.log("req body", req.body);
    const values = req.body.SearchId;
    const filtered = req.body.Filter;

    if (filtered === "Domain") {
      const find = await Employee.find({
        domain: values,
      });
      console.log("find", find);

      return res.status(200).json({
        success: true,
        find,
      });
    }

    if (filtered === "Gender") {
      const find = await Employee.find({
        gender: values,
      });

      console.log("find", find);
      return res.status(200).json({
        success: true,
        find,
      });
    }
    return res.status(400).json({
      success: false,
      message: "error in both if statement",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in code",
      error: error.message,
    });
  }
};
