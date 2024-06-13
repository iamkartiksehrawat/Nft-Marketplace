const User = require("../Model/user");
const crypto = require("crypto");
const { ethers } = require("ethers");
require("dotenv").config();

exports.getChallenge = async (req, res) => {
  const { address } = req.body;
  try {
    let usr = await User.findOne({ walletaddress: address });
    if (usr) {
      let existingnonce = usr.nonce;

      res.json({ challenge: existingnonce });
    } else {
      let nnce = crypto.randomBytes(16).toString("hex");
      usr = new User({ walletaddress: address, nonce: nnce });
      await usr.save();

      res.json({ challenge: nnce });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getVerify = async (req, res) => {
  const { address, signature, challenge } = req.body;
  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr || usr.nonce !== challenge) {
      return res.status(400).json({ error: "Invalid challenge" });
    }

    const recoveredAddress = ethers.verifyMessage(challenge, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ error: "Signature verification failed" });
    }

    usr.nonce = crypto.randomBytes(16).toString("hex");
    await usr.save();

    const token = jwt.sign({ address }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
