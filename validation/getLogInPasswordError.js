const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const bcrypt = require("bcrypt");

module.exports = async function getLogInPasswordError(password, email) {
   //array of unique characters
   if (password === "") {
      return "Please enter your password";
   }
   if ((await checkIsValidUser(email, password)) === false) {
      return "The email and password combination is invalid";
   }

   return "";
};

function checkIsValidUser(email, password) {
   return db
      .query(selectUserByEmail, email)
      .then(async (users) => {
         console.log(users);
         const user = users[0];
         const isValidUser = await bcrypt
            .compare(password, user.password)
            .then((isValidUser) => {
               console.log(isValidUser);
               return isValidUser;
            })
            .catch((err) => {
               console.log(err);
            });
         return isValidUser;
      })
      .catch((err) => {
         return false;
      });
}
