// Assignment Code
var generateBtn = document.querySelector("#generate");

// function to prompt the user for a password length
// the function verifies that the answer is between 8 and 128 (inclusive)
// returns the length of the password as an integer
var getPasswordLength = function() {
  var length = window.prompt("How long do you want your password to be? Enter a number of characters between 8 and 128.");
  length = parseInt(length);
  if (length <= 128 && length >= 8) {
    return length
  }
  else {
    window.alert("You need to enter a number between 8 and 128.");
    return getPasswordLength();
  }
};

var getCharCriteria = function() {
  var includeLowercase = window.confirm("Do you want to include lowercase letters in your password?");
  var includeUppercase = window.confirm("Do you want to include uppercase letters in your password?");
  var includeNumeric = window.confirm("Do you want to include numbers in your password?");
  var includeSpecial = window.confirm("Do you want to include special characters in your password?");

  if (includeLowercase || includeUppercase || includeNumeric || includeSpecial) {
    var charCritera = {
      lowercase : includeLowercase,
      uppercase : includeUppercase,
      numeric : includeNumeric,
      special : includeSpecial
    };
    return charCritera
  }
  else {
    window.alert("You must choose at least one type of character.");
    return getCharCriteria()
  }
}

var getPasswordCriteria = function() {
  var length = getPasswordLength();
  var passwordCriteria = getCharCriteria();
  passwordCriteria.length = length;
  return passwordCriteria
}

var generatePassword = function() {
  passwordCriteria = getPasswordCriteria();
};

generatePassword();

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
