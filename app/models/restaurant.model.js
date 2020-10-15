module.exports = (mongoose, mongoosePaginate) => {
  const schema = mongoose.Schema({
    address: {
      building: String,
      coord: [Number],
      street: String,
      zipCode: String,
    },
    borough: String,
    cuisine: String,
    grades: [{ date: String, grade: String, score: Number }],
    name: String,
    restaurant_id: String,
    deleted: Boolean,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Restaurant = mongoose.model("restaurant", schema);
  return Restaurant;
};
