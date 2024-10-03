let hello = prompt("Кто там?");

if (hello == "Админ") {
  let login = prompt("Пароль");
  if (login == "Я главный") alert("Здравствуйте");
  else if (login == "" || login === null)  alert("Отменено");
  else alert('Неверный пароль');
} 

else if (hello == "" || hello === null) {
  alert("Отменено");
} 

else {
  alert("Я вас не знаю");
}
