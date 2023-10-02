const checkString = (string, maxLength) => string.length <= maxLength;

checkString('проверяемая строка', 20);
checkString('проверяемая строка', 18);
checkString('проверяемая строка', 10);

function checkPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }

  return normalizedString === reverseString;
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');

function extractInteger(value) {
  const string = value.toString();
  let total = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      total += number;
    }
  }

  return total === '' ? 'NaN' : total;
}

extractInteger('2023 год');
extractInteger('ECMAScript 2022');
extractInteger('1 кефир, 0.5 батона');
extractInteger('агент 007');
extractInteger('а я томат');

extractInteger(2023);
extractInteger(-1);
extractInteger(1.5);
