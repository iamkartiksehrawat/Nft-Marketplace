const User = require("../Model/user");
const Subscriber = require("../Model/subscriber");
const crypto = require("crypto");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("../helper/cloudinaryconfig");

require("dotenv").config();

exports.getToken = async (req, res) => {
  try {
    const { address, authToken } = req.body;
    if (!address || !authToken) {
      return res.status(400).json({ error: "Invalid request" });
    }

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);

        res.status(401).json({ error: "Unauthorized" });
      } else {
        const tokenAddress = decoded.address;

        if (tokenAddress == address) {
          res
            .status(200)
            .json({ message: "Token verified", authenticated: true });
        } else {
          res
            .status(200)
            .json({ message: "Token Unverified", authenticated: false });
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.getChallenge = async (req, res) => {
  function generateRandomString(length) {
    return crypto
      .randomBytes(length)
      .toString("base64")
      .substring(0, length)
      .replace(/\W/g, "");
  }

  const { address } = req.body;
  try {
    let usr = await User.findOne({ walletaddress: address });

    if (usr) {
      let existingnonce = usr.nonce;

      res.json({ challenge: existingnonce });
    } else {
      let nnce = crypto.randomBytes(16).toString("hex");
      randomPart = generateRandomString(6);
      let uname = "Unnamed" + randomPart;
      usr = new User({ walletaddress: address, nonce: nnce, username: uname });
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

exports.getAvatar = async (req, res) => {
  const address = req.user.address;
  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!usr.avatar) {
      return res.status(400).json({ error: "Image not found" });
    }

    res.status(200).json({
      avatar: usr.avatar,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.getBanner = async (req, res) => {
  const address = req.user.address;
  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!usr.banner) {
      return res.status(400).json({ error: "Image not found" });
    }

    res.status(200).json({
      banner: usr.banner,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.getUsername = async (req, res) => {
  const address = req.user.address;
  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({
      username: usr.username,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.storeavatar = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);
  const address = req.user.address;

  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "User not found" });
    }

    let oldid = null;

    if (usr.avatar) {
      oldid = usr.avatar_id;
    }

    usr.avatar = upload.secure_url;
    usr.avatar_id = upload.public_id;

    await usr.save();
    if (oldid) {
      await cloudinary.uploader.destroy(oldid);
    }

    fs.unlinkSync(req.file.path);
    res.status(200).json({
      avatar: usr.avatar,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.storebanner = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  const address = req.user.address;

  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "User not found" });
    }

    let oldid = null;
    if (usr.banner) {
      oldid = usr.banner_id;
    }

    usr.banner = upload.secure_url;
    usr.banner_id = upload.public_id;

    await usr.save();
    if (oldid) {
      await cloudinary.uploader.destroy(oldid);
    }

    fs.unlinkSync(req.file.path);
    res.status(200).json({
      banner: usr.banner,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.storeusername = async (req, res) => {
  const address = req.user.address;
  const { username } = req.body;

  try {
    let usr = await User.findOne({ walletaddress: address });

    if (!usr) {
      return res.status(400).json({ error: "User not found" });
    }

    usr.username = username;

    await usr.save();

    res.status(200).json({
      username: usr.username,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    let usr = await Subscriber.findOne({
      Email: email,
    });

    if (usr) {
      return res.status(200).json({
        message: "User is already registered",
      });
    }

    let newUser = new Subscriber({
      Email: email,
    });

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
