const Model = require("../Models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    let { FirstName, LastName, Email, Password } = req.body;
    // Check if user exist
    const existingUser = await Model.User.findOne({ Email });
    if (existingUser) return res.status(400).json("Email Already Exist.");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create new user
    const newUser = new Model.User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("User registration successful.");
  } catch (err) {
    res
      .status(400)
      .json("Could not complete signup process. Please try again.");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    const existingUser = await Model.User.findOne({ Email });
    if (!existingUser)
      return res.status(400).json("Invalid email or password.");

    const validPass = await bcrypt.compare(Password, existingUser.Password);
    if (!validPass) return res.status(400).json("Invalid email or password.");

    // Assign token
    const token = jwt.sign(
      {
        Id: existingUser._id,
        Email: existingUser.Email,
        FirstName: existingUser.FirstName,
        LastName: existingUser.LastName,
        Role: existingUser.Role,
      },
      process.env.JWT_SEC,
      { expiresIn: "120m" }
    );
    res.status(200).json({
      User: {
        Id: existingUser._id,
        FirstName: existingUser.FirstName,
        LastName: existingUser.LastName,
        Email: existingUser.Email,
      },
      Token: token,
    });
  } catch (err) {
    res.status(400).json("An error occured. Please try again.");
  }
};
