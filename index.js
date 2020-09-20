const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://Sarah:5XExSYViEAdQAGYa@restaurants.yxgpu.gcp.mongodb.net/Restaurant-Data?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res) => {
//   restaurantCollection
//     .insertOne(req.body)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => console.error(error));
// });

// MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
//   (client) => {
//     console.log("Connected to Database");
//     const db = client.db("Restaurant-Data");
//     const restaurantCollection = db.collection("Restaurant-Data");
//   }
// );

app.get("/", (req, res) => {
  const name = "World";
  res.send(`Hello ${name}!`);
});

app.listen(8080, () => {
  console.log("listening on 3000");
});

// testing syncing
// module.exports = app;