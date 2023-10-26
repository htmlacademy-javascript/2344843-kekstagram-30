//Функция для проверки длины строки
let lengthCheckerString = (string, maxLength) => string.length <= maxLength;

//Проверка палиндромности
function palindrome(string) {
  return string.split('').reverse().join('') === string;
}

//Замена строки на цифры
let numberFromString = (string) => parseInt(string.toString().replace(/[^\d.-]/g, ''), 10);
