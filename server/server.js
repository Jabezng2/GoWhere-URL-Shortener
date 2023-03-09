const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Url = require("./models/Url");
const utils = require("./utils/urlUtils");

// configure dotenv
dotenv.config();
const app = express();

// cors for cross origin requesters to the frontend application
app.use(cors());
//
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDB Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

// get all saved URLs
app.get("/all", async (req, res) => {
  // Gets the data from Url model
  const allurlS = await Url.find()
  // Response back a res status of 200 and also parse in allurls which contains ALL urls from the database
  res.status(200).json(allurlS)
});

// URL shortener endpoint
app.post("/short", async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.DOMAIN_URL;

  const urlId = utils.generateShortUrl();
  if (utils.validateUrl(origUrl)) {
    try {
      // Converts to shortURL format
      const shortUrl = `${base}/${urlId}`;
      
      // Creates a URL with the schema {origialURL, ...}
      const url = await Url.create({
        origUrl,
        shortUrl,
        urlId,
        date: new Date(),
      });
      
      // Response this back to main page 
      res.json(url);

    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
});

// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url);
    if (url) {
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Port Listenning on 3333
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});