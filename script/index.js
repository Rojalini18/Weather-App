async function ShowWhether() {
  var city = document.querySelector("#city");
  if (city.value == "") {
    return false;
  }
  var imgUrl = "https://source.unsplash.com/1600x900/?city," + city.value;

  var w = document.querySelector(".whether");
  w.style.backgroundImage = `url(${imgUrl})`;
  w.style.flexBasis = "50%";

  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=449bf43674a2731274c0fb25c65d30b1&units=metric`;
  let res = await fetch(url);
  let data = await res.json();
  var dailyurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=7&appid=449bf43674a2731274c0fb25c65d30b1&units=metric`;
  let dailyres = await fetch(dailyurl);
  let dailydata = await dailyres.json();
  console.log(dailydata);
  displayDtat(data, dailydata.daily);

  var mapurl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDD-hGtUpAe-cB6Bi-X67JDynDqPylJ2mU&q=${city.value}`;
  var map = document.querySelector(".map");
  map.innerHTML = `<div><iframe 
				  width="600" 
				  height="380" 
				  style="border:0" 
				  loading="lazy"  
				  allowfullscreen  
				  src= ${mapurl} 
				</iframe></div>`;

  city.value = "";
}

function displayDtat(current, forecast) {
  document.querySelector(".whether__city").innerHTML = "";

  var cityname = document.querySelector("#cityName");
  cityname.innerText = `Weather in ${current.name}`;

  var wheatherDetails = document.createElement("div");
  wheatherDetails.setAttribute("class", "weatherDetails");

  var child1 = document.createElement("div");
  var temp = document.createElement("h1");
  temp.innerText = Math.floor(current.main.temp) + "°";

  var wheatherIcon = document.createElement("div");
  wheatherIcon.setAttribute("class", "weatherIcon");

  var span = document.createElement("span");
  span.innerText = current.weather[0].description;

  var img = document.createElement("img");
  img.src = `http://openweathermap.org/img/w/${current.weather[0].icon}.png`;
  wheatherIcon.append(span, img);

  var date = document.createElement("p");
  var currentDate = new Date().toDateString().split(" ");
  date.innerText = `${currentDate[0]} ${currentDate[2]}, ${currentDate[1]} ${currentDate[3]}`;
  child1.append(temp, wheatherIcon, date);

  var child2 = document.createElement("div");

  var maxtemp = document.createElement("p");
  maxtemp.innerText = `maxtemp : ${Math.floor(current.main.temp_max)}°`;

  var mintemp = document.createElement("p");
  mintemp.innerText = `mintemp : ${Math.floor(current.main.temp_min)}°`;

  var wind = document.createElement("p");
  wind.innerText = `bind : ${current.wind.deg}`;

  var humidity = document.createElement("p");
  humidity.innerText = `humidity : ${current.main.humidity}%`;

  child2.append(maxtemp, mintemp, wind, humidity);

  wheatherDetails.append(child1, child2);

  document.querySelector(".whether__city").append(wheatherDetails);

  document.querySelector(".dailyforcast").innerHTML = "";
  forecast.map(function (ele, i) {
    if (i != 0) {
      var div = document.createElement("div");
      var day = new Date(ele.dt * 1000).toDateString();

      var icon = document.createElement("img");
      icon.src = `http://openweathermap.org/img/w/${ele.weather[0].icon}.png`;

      var des = document.createElement("span");
      des.innerText = ele.weather[0].description;

      var t = document.createElement("h2");
      t.innerText = Math.floor(ele.temp.day) + "°";

      div.append(day, icon, des, t);
      document.querySelector(".dailyforcast").append(div);
    }
  });
}
