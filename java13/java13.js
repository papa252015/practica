function addConditions () {
  let text = "";
  let condition = "";
  for (let i = 1; i <= 100; i++) {
    if (i <= 17) {
      condition = "Ребенок";
    } else if (i <= 30) {
      condition = "Молодой";
    } else if (i <= 55) {
      condition = "Зрелый";
    } else { condition = "Старый";

    } 
    


  text = text + `${i} - ${condition}\n`
  }
  return text;
}

console.log(addConditions());