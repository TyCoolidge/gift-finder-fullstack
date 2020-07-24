const { EMAIL_REGEX } = require("../utils/helpers");

module.exports = function getLogInEmailAndUsernameError(email, username) {
   if (email === "" || username === "") {
      return "Please enter your email address or username.";
   }
   if (EMAIL_REGEX.test(email) === false) {
      return "Please enter a valid email.";
   }
   return "";
};
