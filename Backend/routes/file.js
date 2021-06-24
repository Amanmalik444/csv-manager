const express = require("express");
const file = require("../models/file");

const router = express.Router();

//fetch request by post
router.post("/fetch", (req, res) => {
  file
    .find({ userId: req.body.id })
    .populate("userId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((file) => {
      res.json(file);
    });
});

//post request
router.post("/", (req, res) => {
  const { userId, CSV, title } = req.body;
  const newFile = new file({
    userId,
    CSV,
    title,
  });
  newFile
    .save()
    .then((f) => {
      res.json(f);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

//delete request
router.post("/delete", (req, res) => {
  file
    .findByIdAndRemove(req.body.tableId)
    .then((f) => {
      res.json(f);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;
