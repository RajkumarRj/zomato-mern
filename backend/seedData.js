const mongoose = require("mongoose");
const Product = require("../backend/model/getproduct");
const jsondata = require("./product.json");
// Import your Mongoose model

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/zomato", {});

const db = mongoose.connection;

// Insert products into MongoDB
db.once("open", async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(jsondata); // Insert new products
    console.log("Data seeding complete");
    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1); // Exit with error
  }
});
