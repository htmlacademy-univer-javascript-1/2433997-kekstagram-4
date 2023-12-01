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

//5.16. Функции возвращаются
const checkMeeting = function (
  startTime,
  endTime,
  meetingStart,
  meetingDuration
) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const [meetingStartHour, meetingStartMinute] = meetingStart
    .split(':')
    .map(Number);

  let meetingEndHour =
    (meetingStartHour + Math.floor(meetingDuration / 60)) % 24;

  let meetingEndMinute = meetingStartMinute + (meetingDuration % 60);

  //Если в минутах было переполнение то учитываю это в часах
  if (meetingEndMinute >= 60) {
    meetingEndMinute = meetingEndMinute % 60;
    meetingEndHour++;
  }

  if (
    meetingStartHour < startHour ||
    (meetingStartHour === startHour && meetingStartMinute < startMinute) ||
    meetingEndHour > endHour ||
    (meetingEndHour === endHour && meetingEndMinute > endMinute)
  ) {
    return false;
  } else {
    return true;
  }
};

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
checkMeeting('08:00', '17:30', '14:00', 90); // true
checkMeeting('8:0', '10:0', '8:0', 120); // true
checkMeeting('08:00', '14:30', '14:00', 90); // false
checkMeeting('14:00', '17:30', '08:0', 90); // false
checkMeeting('8:00', '17:30', '08:00', 900); // false
