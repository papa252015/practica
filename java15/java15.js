let word = 'Привет';
let newWord =''; 

for (let i = 0; i<word.length; i++) {
    newWord = word[i].toLowerCase() + newWord ;
}

console.log(newWord);


let stroka2 = 'Нужно:убрать:двоеточие';
let stroka3 = '';
stroka3 = stroka2.replaceAll(':', ' ')

console.log(stroka3)