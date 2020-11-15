function randInt (max){
  return Math.floor(Math.random() * Math.floor(max));
}
document.getElementById("gameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const url = "https://finalspaceapi.com/api/v0/character/" + randInt(40);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      resultsTwisted =  '<img src=\"' + json.img_url + '\"style=\"filter:blur(10px) invert(100%);\"/>';
      document.getElementById("characterPic").innerHTML = resultsTwisted;
      //Wait for name submission
      document.getElementById("characterSubmit").addEventListener("click", function(event) {
        event.preventDefault();
        const value = document.getElementById("characterInput").value;
        if (value === "")
          return;
        //name checker
        console.log(value);

        //Hint generator
        var hintInt = 0;
        var charHint = "";
        var randNum = 0;
        while (hintInt == 0){
          randNum = randInt(3);
          if (randNum == 0){
            if (json.alias.length > 0){
              charHint = json.alias[randInt(json.alias.length)];
              hintInt = 1;
            }
          }
          if (randNum == 1){
            if (json.abilities.length > 0){
              charHint = json.abilities[randInt(json.abilities.length)];
              hintInt = 1;
            }
          }
          if (randNum == 2){
              charHint = json.species;
              hintInt = 1;
          }
        }

        document.getElementById("hints").innerHTML = "Here is a hint: " + charHint;

        //guess check
        gChar = json.name;
        console.log(gChar);
        var guessList = value + "\n"
        let results = "";
        var matchCheck = value.toUpperCase().localeCompare(gChar.toUpperCase());
        if (matchCheck == 0){
          results =  '<img src=\"' + json.img_url + '\"/>';
          document.getElementById("characterPic").innerHTML = results;
        } else {
          document.getElementById("characterPic").innerHTML = resultsTwisted;
        }
        document.getElementById("guesses").innerHTML = "Your Last Guess: " + guessList;
      });

    });
});
