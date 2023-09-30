const express = require("express");
const cors = require("cors");
const port = 5000; // port
const { catsList, sharksList } = require("./data");

// create an express app
const app = express();

// middlewares
app.use(cors());

app.get("/api/images", (req, res) => {
  // concate cat image array with shark image arry
  imagesList = [...catsList, ...sharksList];
  // convert it to an array of image object
  imagesData = [];
  imagesList.forEach((image) => {
    imagesData.push({ image: image });
  });
  res.send(imagesData);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
