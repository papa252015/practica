var User = (function () {
    function User(_name) {
        this.name = _name;
    }
    return User;
}());
var alex = new User("Alex");
var header = document.getElementById("header");
header.innerHTML = "Привет " + alex.name;
var stroka = "abc";
