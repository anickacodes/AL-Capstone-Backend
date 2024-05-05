const express = require("express");
const cors = require("cors");
const reviewsController = require("./controllers/reviewsController");
const vendorController = require("./controllers/vendorController");
const userController = require("./controllers/userController");
const eventController = require("./controllers/eventController");
const firebaseController = require('./queries/saveUser')
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/reviews", reviewsController);
app.use("/vendors", vendorController);
app.use("/customers", userController);
app.use("/events", eventController);
app.use("/firebase", firebaseController);
app.use(express.static(path.join(__dirname, 'public')));
// app.get("/", (req, res) => {
//     // res.status(200).send(`<h1>Where's my Ice Cream Server Side</h1>`);
//     res.status(200).send(load);
//   });

app.get("*", (req, res) => {
  res.status(404).send("Sorry, Page not found");
});

module.exports = app;
