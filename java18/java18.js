let user = {}
user.name = 'John';
user.surname = "smith";
user.name = "Pete";
delete user.name;
console.log('name' in user);