const express = require("express");
const router = express.Router();
const controller = require("../Controller/api");
const uploads = require("../helper/multerconfig");
const isauth = require("../middlewares/auth");

router.post("/auth/challenge", controller.getChallenge);

router.post("/auth/verify", controller.getVerify);

router.post("/auth/token", controller.getToken);

router.post(
  "/details/avatar",
  isauth,
  uploads.single("image"),
  controller.storeavatar
);

router.post(
  "/details/banner",
  isauth,
  uploads.single("image"),
  controller.storebanner
);

router.post("/details/username", isauth, controller.storeusername);
router.get("/details/avatar", isauth, controller.getAvatar);
router.get("/details/banner", isauth, controller.getBanner);
router.get("/details/username", isauth, controller.getUsername);

router.post("/subscribe", controller.subscribe);

module.exports = router;
