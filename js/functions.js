function checkString(string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome(string) {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }

  return normalizedString === reverseString;
}

function extractInteger(value) {
  let string = value.toString();
  let total = '';
  for (let i = 0; i < string.length; i++) {
    let number = parseInt(string[i]);
    if (!Number.isNaN(number)) {
      total += number;
    }
  }

  return total === '' ? 'NaN' : total;
}

console.log(extractInteger('1 кефир, 0.5 батона'));
