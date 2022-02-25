// Assignment Code
var generateBtn = document.querySelector("#generate");

// function to prompt the user for a password length
// the function verifies that the answer is between 8 and 128 (inclusive)
// returns the length of the password as an integer
var getPasswordLength = function() {
  var length = window.prompt("How long do you want your password to be? Enter a number of characters between 8 and 128.");
  length = parseInt(length);
  if (length < 128 && length > 8) {
    return length
  }
  else {
    window.alert("You need to enter a number between 8 and 128.");
    return getPasswordLength();
  }
};

var generatePassword = function() {
  var length = getPasswordLength();
  console.log(length);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

generatePassword();

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
