//Функция для проверки длины строки
const lengthCheckerString = (string, maxLength) => string.length <= maxLength;
window.console.log('Проверка длины строки:');
window.console.log('1. Ожидаем true',lengthCheckerString('проверяемая строка', 20));
window.console.log('2. Ожидаем false',lengthCheckerString('проверяемая строка', 10));

///Проверка палиндромности
function palindrome(string) {
  return string.split('').reverse().join('') === string;
}
window.console.log('Проверка палиндромности:');
window.console.log('1. Ожидаем true',palindrome('топот'));
window.console.log('2. Ожидаем false',palindrome('Кекс'));

//Замена строки на цифры
const numberFromString = (string) => parseInt(string.toString().replace(/[^\d.-]/g, ''), 10);
window.console.log('Функция замены строки на цифры:');
window.console.log('1. Ожидаем 2023',numberFromString('2023 год'));
window.console.log('2. Ожидаем 2022',numberFromString('ECMAScript 2022'));
window.console.log('3. Ожидаем NaN',numberFromString('а я томат'));

function isMeetingInWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  // Преобразуем строки в формате часы:минуты в минуты
  const workStartMinutes = parseInt(workStart.split(':')[0], 10) * 60 + parseInt(workStart.split(':')[1], 10);
  const workEndMinutes = parseInt(workEnd.split(':')[0], 10) * 60 + parseInt(workEnd.split(':')[1], 10);
  const meetingStartMinutes = parseInt(meetingStart.split(':')[0], 10) * 60 + parseInt(meetingStart.split(':')[1], 10);

  // Проверяем, что время начала встречи не раньше времени начала рабочего дня
  // и время окончания встречи не позже времени окончания рабочего дня
  if (meetingStartMinutes < workStartMinutes || meetingStartMinutes + meetingDuration > workEndMinutes) {
    return false;
  } else {
    return true;
  }
}
window.console.log('Проверка функции isMeetingInWorkHours:');
window.console.log('1. Ожидаем false', isMeetingInWorkHours('08:00', '14:30', '14:00', 90));
window.console.log('2. Ожидаем true', isMeetingInWorkHours('08:00', '17:30', '14:00', 90));
