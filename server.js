const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://Sarah:5XExSYViEAdQAGYa@restaurants.yxgpu.gcp.mongodb.net/Restaurant-Data?retryWrites=true&w=majority";

app.listen(3000, () => {
  console.log("listening on 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  restaurantCollection
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
});

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("Connected to Database");
    const db = client.db("Restaurant-Data");
    const restaurantCollection = db.collection("Restaurant-Data");
  }
);

// testing syncing
