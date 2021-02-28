document.getElementById("Holiday_button").addEventListener("click", function(event) {
  event.preventDefault();
  let s = document.getElementById("selector");
  let country = s.options[s.selectedIndex].value;

  const url = "https://calendarific.com/api/v2/holidays?&api_key=a6c458ee6e07542bc7c96b684b9a9d77999af844&country=" + country +
  "&year=2021&month=3";
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(json){
      console.log(json)
      let results = "";

      results += "<div class=\"holiday_resutls_container\">"
      for (let i=0; i < json.response.holidays.length; i++) {
        if (i % 3 == 0){
          results += "<div class=\"row\">"
        }

        results += "<div class=\"col\" id=\"holiday_col\">"
        results += "<h3>" + json.response.holidays[i].name + "</h3>"
        results += "<p> " + json.response.holidays[i].date.iso + "</p>"
        results += "<p> " + json.response.holidays[i].description + "</p>"
        results += "</div>"

        if (i % 3 == 2){
          results += "</div>"
        }
      }

      results += "</div>"

      document.getElementById("holiday_result").innerHTML = results;
    });

});

document.getElementById("exchangeSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  let s = document.getElementById("selector");
  let country = s.options[s.selectedIndex].value;

  let dollars = document.getElementById("dollarInput").value;

  const url = "https://v6.exchangerate-api.com/v6/6b8b7ecad55a4ae8617a263d/latest/USD"
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(json){
      console.log(json)

      let amount = 0
      if (country == "US"){
        amount = dollars
      }
      else if (country == "UK") {
        let exchange = json.conversion_rates.GBP
        amount = dollars * exchange
      }
      else {
        let exchange = json.conversion_rates.EUR
        amount = dollars * exchange
      }

      let results = "";

      results += "<div class=\"exchange_resutls_container\">"
      results += "<p> At the current exchange rate " + dollars + " USD will be: "
        + amount;

      if (country == "US"){
        results += " USD";
      }
      else if (country == "UK") {
        results += " GBP";
      }
      else {
        results += " EUR";
      }

      results += "</div>"

      document.getElementById("exchange_result").innerHTML = results;
    });

});

document.getElementById("news_button").addEventListener("click", function(event) {
  event.preventDefault();
  let s = document.getElementById("selector");
  let country = s.options[s.selectedIndex].value;
  if (country == "US"){
    full_country = "United States";
  }
  else if (country == "UK") {
    full_country = "United Kingdom";
  }
  else if (country == "FR") {
    full_country = "France";
  }
  else {
    full_country = "Germany"
  }

  const url = 'https://api.currentsapi.services/v1/search?' +
            'keywords=' + full_country + '&language=en&' +
            'apiKey=bzY0weTn_3m2Hj5zheG-c-FlWxqe4g_c2uaP1zSt4Vb0bU10';
    var req = new Request(url);;
  fetch(req)
    .then(function(response){
      return response.json();
    }).then(function(json){
      console.log(json)
      let results = "";

      results += "<div class=\"news_resutls_container\">"
      for (let i=0; i < json.news.length; i++) {
        if (i % 3 == 0){
          results += "<div class=\"row\">"
        }

        results += "<div class=\"col\" id=\"news_col\">"
        results += "<a href = \"" + json.news[i].url + "\">" + json.news[i].title + "</h4>"
        results += "</div>"

        if (i % 3 == 2){
          results += "</div>"
        }
      }

      results += "</div>"

      document.getElementById("news_result").innerHTML = results;
    });

});
