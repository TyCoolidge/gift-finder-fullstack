// gifts resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const showUserGifts = require("../../queries/showUserGifts");

// @route   GET api/v1/gifts
// @desc    GET all gifts
// @access  Public
router.get("/", (req, res) => {
   console.log(req.query);
   const createdByUserId = req.query.createdByUserId;
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(showUserGifts, [createdByUserId])
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
