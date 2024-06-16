const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  walletaddress: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  banner_id: {
    type: String,
  },
  avatar_id: {
    type: String,
  },
  username: {
    type: String,
  },
  nonce: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
