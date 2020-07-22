// gifts resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const showAllGifts = require("../../queries/showAllGifts");

// @route   GET api/v1/gifts
// @desc    GET all gifts
// @access  Public
router.get("/", (req, res) => {
   db.query(showAllGifts())
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
