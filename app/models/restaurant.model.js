module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    address: [
      { building: String, coord: [Number], street: String, zipcode: String },
    ],
    borough: String,
    cuisine: String,
    grades: [{ date: Date, grade: String, score: Number }],
    name: String,
    restaurant_id: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Restaurant = mongoose.model("restaurant", schema);
  return Restaurant;
};
