const db = require("../db");
const selectUserByUsername = require("../queries/selectUserByUsername");
const { USERNAME_REGEX } = require("../utils/helpers");

module.exports = async function getSignUpUsernameError(username) {
   if (username === "") {
      return "Please create a username.";
   }
   if (username.length > 15) {
      return "Username must be less than 15 characters";
   }
   if (USERNAME_REGEX.test(username) === false) {
      return "Username can only contain numbers and letters.";
   }
   if (await checkIsInDb(username)) {
      return "This username address already exists.";
   }
   return "";
};

function checkIsInDb(username) {
   return db
      .query(selectUserByUsername, username)
      .then((users) => {
         console.log(users);
         if (users.length === 0) return false;
         else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
