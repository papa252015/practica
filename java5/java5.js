let login = prompt("Кем вы работаете в компании?", "");

let message= (login=='Сотрудник') ? "Привет" :
(login=='Директор') ? "Здравствуйте" :
(login=='') ? "Нет логина":
"";
alert(message);