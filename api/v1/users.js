// users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getSignUpUsernameError = require("../../validation/getSignUpUsernameError");
const getSignUpRepeatPasswordError = require("../../validation/getSignUpRepeatPasswordError");
const getLogInEmailError = require("../../validation/getLogInEmailError");
const getLogInPasswordError = require("../../validation/getLogInPasswordError");

// @route   POST api/v1/users
// @desc    Create a new user
// @access  Public
router.post("/", async (req, res) => {
   const {
      id,
      email,
      username,
      password,
      repeatPassword,
      createdAt,
   } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   const usernameError = await getSignUpUsernameError(username);
   const repeatPasswordError = getSignUpRepeatPasswordError(
      repeatPassword,
      password
   );
   let dbError = "";

   if (
      emailError === "" &&
      usernameError === "" &&
      passwordError === "" &&
      repeatPasswordError === ""
   ) {
      const user = {
         id: id,
         email: email,
         user_name: username,
         password: await toHash(password),
         created_at: createdAt,
      };
      // With Set Syntax we avoid any ordering mistakes in our database
      db.query(insertUser, user)
         .then(() => {
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.status(200).json({
                     id: user.id,
                     email: user.email,
                     username: user.user_name,
                     createdAt: user.created_at,
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
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
         repeatPasswordError: repeatPasswordError,
         usernameError: usernameError,
      });
   }
});

// @route   POST api/v1/users/auth
// @desc    check this user against the db via email and password
// @access  Public

router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLogInEmailError(email);
   const passwordError = await getLogInPasswordError(password, email);
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      db.query(selectUserByEmail, email)
         .then((users) => {
            const user = users[0];
            res.status(200).json({
               id: user.id,
               email: user.email,
               username: user.user_name,
               createdAt: user.created_at,
            });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

module.exports = router;
