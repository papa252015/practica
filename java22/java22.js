function sumInput() {
  let numArray = [];
  while (true) {
    let egovvod = prompt("Введите значение", "");
    if (egovvod === "" || egovvod === null || Number.isNaN(+egovvod)) {
      break;
    } else {
      numArray.push(+egovvod); // +egovvod тоже самое что и number(egovvod)
    }
  }
  let sum = 0;

  for (let number of numArray) {
    sum = sum + number; // либо sum +- number
  }
  return sum;
}

alert(sumInput());
