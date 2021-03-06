module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    address: {
      building: String,
      coord: [Number],
      street: String,
      zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [{ date: String, grade: String, score: Number }],
    name: String,
    restaurant_id: String,
    deleted: Boolean,
  });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Restaurant = mongoose.model("restaurant", schema);
  return Restaurant;
};
