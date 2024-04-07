const cartModel = require("../model/cart");

const addCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cartItem = await cartModel.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      await cartItem.save();
    } else {
      cartItem = await cartModel.create(req.body);
    }

    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await cartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await cartModel.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCart,
  updateCart,
  deleteCart,
};
