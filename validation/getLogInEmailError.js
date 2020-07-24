module.exports = function getLogInEmailError(email, username) {
   if (email === "" || username === "") {
      return "Please enter your email address or username.";
   }

   return "";
};
