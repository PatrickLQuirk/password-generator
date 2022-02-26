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

  var charTypes = [];

  if (includeLowercase) {
    charTypes.push("lowercase")
  };
  if (includeUppercase) {
    charTypes.push("uppercase")
  };
  if (includeNumeric) {
    charTypes.push("numeric")
  };
  if (includeSpecial) {
    charTypes.push("special")
  };

  if (charTypes === []) {
    window.alert("You must choose at least one type of character.");
    return getCharCriteria()
  } else {
    return charTypes;
  }
};

var getPasswordCriteria = function() {
  var length = getPasswordLength();
  var charCriteria = getCharCriteria();
  var passwordCriteria = {
    passwordLength : length,
    charTypes : charCriteria
  }
  return passwordCriteria
};

var pickRandomCh = function(characters) {
  var randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

// Here are the steps we will take to randomly generate a password that meets the criteria:
// Firstly, to guaranteed that we have at least one of each selected type of character, we will
  // initially start the password with one character of each of the selected types.
  // Secondly, we will add enough random characters from any of the types to get the password to
  // the required length.
  //    We will accomplish this by making a string of all characters from the selected types and
  //    picking characters randomly from that string. The construction of this string will happen
  //    concurrently with the first step.
  // Finally, we will add to the randomness of the password by taking each of the characters from the
  // first step and swapping its index with that of another randomly selected character in the password
var generatePassword = function() {
  passwordCriteria = getPasswordCriteria();
  var lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  var upperCaseLetters = lowerCaseLetters.toUpperCase();
  var numericCharacters = "1234567890";
  // The next line has a bunch of strings separated out because of the desire to
  // include the double and single quote characters in the string
  // The two backslashes are to allow the backslash character to be put in the string
  var specialCharacters = "!" + '"' + "#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";

  var numTypes = passwordCriteria.charTypes.length;
  var password = "";
  var allCharacters = "";

  // add initial characters
  for (var i = 0; i < numTypes; i++) {
    charType = passwordCriteria.charTypes[i];

    if (charType === "lowercase") {
      password += pickRandomCh(lowerCaseLetters);
      allCharacters += lowerCaseLetters;
    }
    else if (charType === "uppercase") {
      password += pickRandomCh(upperCaseLetters);
      allCharacters += upperCaseLetters;
    }
    else if (charType === "numeric") {
      password += pickRandomCh(numericCharacters);
      allCharacters += numericCharacters;
    }
    else if (charType === "special") {
      password += pickRandomCh(specialCharacters);
      allCharacters += specialCharacters;
    }
  };

  // console.log(passwordCriteria.charTypes);
  // console.log(password);
  // console.log(allCharacters);

  for (var i = 0; i < passwordCriteria.passwordLength - numTypes; i++) {
    password += pickRandomCh(allCharacters);
  };

  // swap the initial characters with other random characters in the string
  for (var i = 0; i < numTypes; i++) {
    password = swapChRandomly(password, i);
  };

  return password;
};

var swapChRandomly = function(stringName, index) {
  var ch = stringName[index];
  var randomIndex = Math.floor(Math.random() * stringName.length);
  var randomCh = stringName[randomIndex];

  if (index < randomIndex) {
    var newString = stringName.slice(0, index) + randomCh + stringName.slice(index + 1, randomIndex);
    newString = newString + ch + stringName.slice(randomIndex + 1, stringName.length);
  } else if (index > randomIndex) {
    var newString = stringName.slice(0, randomIndex) + ch + stringName.slice(randomIndex + 1, index);
    newString = newString + randomCh + stringName.slice(index + 1, stringName.length);
  } else {
    newString = stringName;
  }

  return newString;
}

// generatePassword();

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
