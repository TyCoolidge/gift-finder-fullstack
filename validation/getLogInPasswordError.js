const db = require("../db");
const selectUserByEmail = require("../queries/selectUserByEmail");
const selectUserByUsername = require("../queries/selectUserByUsername");

const bcrypt = require("bcrypt");

module.exports = async function getLogInPasswordError(
   password,
   email,
   username
) {
   //array of unique characters
   if (password === "") {
      return "Please enter your password";
   }
   if ((await checkIsValidUser(email, username, password)) === false) {
      return "Them email/username and password combination is invalid";
   }

   return "";
};

function checkIsValidUser(email, username, password) {
   return (
      db
         .query(selectUserByEmail, email)
         // .query(selectUserByUsername, username)
         .then(async (users) => {
            console.log(users);
            const user = users[0];
            await bcrypt
               .compare(password, user.password)
               .then((result) => {
                  console.log(result);
                  return result;
               })
               .catch((err) => {
                  console.log(err);
               });
         })
         .catch((err) => {
            console.log(err);
         })
   );
}
