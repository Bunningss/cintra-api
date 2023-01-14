const Model = require("../Models/index");

exports.getProducts = async (req, res) => {
  try {
    const products = await Model.Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ msg: "An error occured. Please try again." });
  }
};
