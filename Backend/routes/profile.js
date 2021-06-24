const express = require("express");
const User = require("../models/user");
const post = require("../models/file");
const user = require("../models/user");

const router = express.Router();

//get request
router.get("/", (req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("error");
    });
});

//delete user
router.post("/deleteUser", (req, res) => {
  file
    .deleteMany({ userId: req.body.id })
    .then((f) => {
      user.findByIdAndRemove(req.body.id).then((u) => {
        res.json(f);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;
