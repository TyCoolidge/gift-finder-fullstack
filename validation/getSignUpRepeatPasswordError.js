module.exports = function getSignUpPasswordError(repeatPassword, password) {
   //array of unique characters
   if (repeatPassword === "") {
      return "Please repeat your created password.";
   }
   if (repeatPassword !== password) {
      return "Your passwords do not match, please try again";
   }
   return "";
};
