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
      .then((gifts) => {
         const camelCaseGifts = gifts.map((gift) => {
            return {
               id: gift.id,
               createdAt: gift.created_at,
               createdByUserId: gift.created_by_user_id,
               title: gift.title,
               photo: gift.photo,
               url: gift.url,
               description: gift.description,
               gender: gift.gender,
               interest: gift.interest,
               age: gift.age,
               price: gift.price,
            };
         });
         res.json(camelCaseGifts);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
