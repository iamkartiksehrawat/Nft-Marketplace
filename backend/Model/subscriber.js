const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SubscriberSchema = new schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Subscriber", SubscriberSchema);
