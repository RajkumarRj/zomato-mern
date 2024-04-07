const express = require("express");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
//OOuXShEoBxlmtCEz
//rajkumarmass475
mongoose
  .connect(
    "mongodb+srv://rajkumarmass475:OOuXShEoBxlmtCEz@cluster0.mwtk20h.mongodb.net/"
  )
  .then((res) => console.log("database connected successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/cart", cartRoutes);

app.listen(5000, () => {
  console.log("server is up and running");
});
