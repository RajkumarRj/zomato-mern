// fetchAndStoreImages.js
const axios = require("axios");
const mongoose = require("mongoose");
const Image = require("./model/image");

mongoose.connect("mongodb://localhost:27017/zomato", {
  useUnifiedTopology: true,
});

const fetchAndStoreImages = async (query) => {
  const ACCESS_KEY = "2QhkVbrVsBA_U90cHLL9MivQQl5zCWejAQ32qbmXsCE";
  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=25&orientation=landscape`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    const imagesData = response.data.results.map((photo) => ({
      imageUrl: photo.urls.regular,
      altDescription: photo.alt_description || "Food photo",
    }));

    await Image.create(imagesData); // Use Image.create to store images in MongoDB
    console.log("Images stored successfully.");
  } catch (error) {
    console.error("Error fetching and storing images:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Example usage: Fetch and store food images
const query = "indian food"; // Specify the desired query (e.g., 'food')
fetchAndStoreImages(query);
