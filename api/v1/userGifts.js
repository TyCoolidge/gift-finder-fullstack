// gifts resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const showUserGifts = require("../../queries/showUserGifts");
const insertNewUserGift = require("../../queries/insertNewUserGift");

// @route   GET api/v1/gifts
// @desc    GET all gifts
// @access  Public
router.post("/", async (req, res) => {
   const { id, userId, giftId } = req.body;
   {
      const newUserGift = {
         id: id,
         user_id: userId,
         gift_id: giftId,
      };
      // With Set Syntax we avoid any ordering mistakes in our database
      db.query(insertNewUserGift, newUserGift)
         .then(() => {
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   }
});

module.exports = router;
