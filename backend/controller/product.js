const productModel = require("../model/getproduct");

const getproduct = async (req, res) => {
  try {
    const product = await productModel.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getproduct,
};
