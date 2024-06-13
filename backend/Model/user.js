const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  walletaddress: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
  },
  banner: {
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
