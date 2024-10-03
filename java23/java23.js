function ymnoz(a, b) {
  return a * b;
}
console.log(ymnoz());



function user(firstName, secondName, age) {
  return `Привет: ${firstName} ${secondName} с возрастом ${age} лет`;
}
alert(user("Иван", "Петров", 17));



function person(pol) {
  if (pol == "M") {
    return "Ваш пол мужской";
  }
  if (pol == "F") {
    return "Ваш пол женский";
  } else {
    return "Ваш пол неопределен";
  }
}
console.log(person()); 

function predl(phrase) {
  let text = phrase.split(". ");
  let firstWords = [];

  for (let stroka of text) {
    firstWords.push(stroka.split(" ")[0]);
  }
  return firstWords.join(", ");
}
console.log(predl("Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aspernatur quod eligendi ab neque omnis quos debitis veritatis cupiditate, at pariatur accusamus exercitationem hic commodi laboriosam corporis harum earum expedita."))


