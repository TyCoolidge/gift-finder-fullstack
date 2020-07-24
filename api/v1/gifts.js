// gifts resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertNewGift = require("../../queries/insertNewGift");
const selectGiftById = require("../../queries/selectGiftById");
const showAllGifts = require("../../queries/showAllGifts");

// @route   GET api/v1/gifts
// @desc    GET all gifts
// @access  Public
router.get("/", (req, res) => {
   db.query(showAllGifts())
      .then((dbRes) => {
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

router.post("/", async (req, res) => {
   const {
      id,
      createdAt,
      createdByUserId,
      title,
      photo,
      url,
      description,
      gender,
      interest,
      age,
      price,
   } = req.body;
   {
      const newGift = {
         id: id,
         created_at: createdAt,
         created_by_user_id: createdByUserId,
         title: title,
         photo: photo,
         url: url,
         description: description,
         gender: gender,
         interest: interest,
         age: age,
         price: price,
      };
      // With Set Syntax we avoid any ordering mistakes in our database
      db.query(insertNewGift, newGift)
         .then(() => {
            db.query(selectGiftById, id)
               .then((gifts) => {
                  const gift = gifts[0];
                  res.status(200).json({
                     id: gift.id,
                     createdAt: gift.created_at,
                     createdByUserId: gift.created_by_user_id,
                     title: gift.title,
                     photo: gift.photo,
                     url: gift.url,
                     description: gift.description,
                     price: gift.price,
                  });
               })
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
            // return the user data so we can put in redux store
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   }
});

module.exports = router;
