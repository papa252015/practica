/*   function chet(number) {
  if (number % 2 !== 0) {
    return false;
  }
} 
console.log(chet(4));  */

/* function chet(number) {
  for (let numb of number) {
    if (number % 5 == 0) {
      numb.push(number);
    }
  }
}
console.log(chet[(4, 2, 7, 14, 756, 3, 5, 99)]); */


function getFive(arrey) {
    let newArr = []
    for (let number of array) {
        if (number %5 == 0) newArr.push(number)
    }
return newArr
}



function getMonthNameByNumber() {
    const month = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
]
    
    const userInput = +(prompt('Введите номер месяца (от 1 до 12)'));
    if (userInput >= 1 && userInput <=12) {
    return `Месяц под номером ${userInput} - это ${month[userInput -1]}`;
} else {
    return `Некорректный вводю Пожалуйста, введите число от 1 до 12.`
}

}