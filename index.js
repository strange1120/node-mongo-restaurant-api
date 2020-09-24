// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const app = express();
// const { MongoClient } = require("mongodb");
// const cors = require("cors");

// const connectionString =
//   "mongodb+srv://Sarah:5XExSYViEAdQAGYa@restaurants.yxgpu.gcp.mongodb.net/Restaurant-Data?retryWrites=true&w=majority";

// app.use(cors());
// app.options("*", cors());
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "/client/build")));
// // app.use(morgan('tiny'))

// // app.post("/", (req, res) => {
// //   restaurantCollection
// //     .insertOne(req.body)
// //     .then((result) => {
// //       console.log(result);
// //     })
// //     .catch((error) => console.error(error));
// // });

// let restaurantCollection;

// MongoClient.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then((client) => {
//     const db = client.db("Restaurant-Data");
//     restaurantCollection = db.collection("Restaurant-Data");
//     app.locals.collection = restaurantCollection;
//     app.listen(8080, () => console.info(`REST API running on port 8080`));

//     app.get("/:restaurant_id", (req, res) => {
//       const collection = req.app.locals.collection;
//       collection
//         .findOne({ restaurant_id: req.params.id })
//         .then((response) => res.status(200).json(response))
//         .catch((error) => console.error(error));
//     });
//   })
//   .catch((error) => console.error(error));

// app.get("/", (req, res) => {
//   const name = "World";
//   res.send(`Hello ${name}!`);
// });

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// testing syncing
// module.exports = app;

// process.on("SIGINT", () => {
//   config.disconnectDB();
//   process.exit(0);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/restaurant.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
