function randInt (max){
  return Math.floor(Math.random() * Math.floor(max));
}

document.getElementById("characterSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("characterInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://finalspaceapi.com/api/v0/character/" + randInt(40);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h3> Wind speeds of ' + json.wind.speed + " MPH</h3>"
      results += '<h4> With a humidity of' + json.main.humidity + "% </h4>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description;
    	if (i !== json.weather.length - 1)
    	  results += ", "
          }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=7a512ed95c7322390ea5b497df502ae6";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "";
        let rounds = 0;
          for (let i=0; i < json.list.length; i++) {
            for (let j = 0; j < 8; j++){
              //if (j == 0){
                //forecast += "<div class=\"row justify-content-center bg-dark text-white\">";
              //}
              forecast += "<div class=\"col-sm-1.5\">";
            	forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
            	forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
              forecast += "</div>";
            }
          }
      document.getElementById("forecastResults").innerHTML = forecast;
      });
});










function randInt (max){
  return Math.floor(Math.random() * Math.floor(max));
}
document.getElementById("GameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("characterInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://finalspaceapi.com/api/v0/character/" + randInt(40);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      gChar = json.name;
      console.log(gChar);
      let results = "";
      var matchCheck = value.toUpperCase().localeCompare(gChar.toUpperCase());
      if (matchCheck == 0){
        results =  '<img src=\"' + json.img_url + '\"/>';
        document.getElementById("characterPic").innerHTML = results;
      } else {
        document.getElementById("characterPic").innerHTML = "<img src=\"who.jpg\"/>";
      }
    });
});
