// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route   GET api/v1/users
// @desc    GET a valid user via email, username, and password
// @access  Public
router.get("/", (req, res) => {
   const { email, password } = req.query;
   db.query(selectUser(email, password))
      .then((dbRes) => {
         const user = toSafeParse(toJson(dbRes));
         console.log(user);
         res.json(user);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
