// Adds functionality to the search bar
document.getElementById("userInput").addEventListener('click', event => {
  event.preventDefault();
  var lon;
  var lat;
  var searchInput = document.getElementById('search').value;

  // API for retrieving geocode and country data for input
  axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${searchInput}&apikey=5ae2e3f221c38a28845f05b6242c78f95403bb14bb2af76c5b0bcf42`)
    .then(res => {
      country = res.data.country;
      lon = res.data.lon;
      lat = res.data.lat;

  // API that uses geocode to find tourist destinations nearby 
  axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&rate=3&apikey=5ae2e3f221c38a28845f05b6242c78f95403bb14bb2af76c5b0bcf42`)
    .then(res => {
      var loc = res.data;

  // API for covid-19 info
  axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20%60`)
    .then(res => {
      var covid = res.data;

  // API for images
  axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchInput}&client_id=mMMsMJbMcVWyjFIi4RLnMYtZ0_PAQXqh-HODKnPCcxw`)
    .then(res => {
      var image = res.data;             

  // API for weather info
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=b9a19d23d6cf2eb624e5529ab42acecb`)
  .then(res => {
    var weather = res.data.list;

    // Creates search links to 10 tourist destinations
    document.getElementById('results').innerHTML = `
      <h3 class="has-text-white">
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[0].properties.name}" target="_blank">${loc.features[0].properties.name}<br><br>                 
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[5].properties.name}" target="_blank">${loc.features[5].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[10].properties.name}" target="_blank">${loc.features[10].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[15].properties.name}" target="_blank">${loc.features[15].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[20].properties.name}" target="_blank">${loc.features[20].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[25].properties.name}" target="_blank">${loc.features[25].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[30].properties.name}" target="_blank">${loc.features[30].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[35].properties.name}" target="_blank">${loc.features[35].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[40].properties.name}" target="_blank">${loc.features[40].properties.name} <br><br>
      <a style="text-decoration:none" href="https://www.google.com/search?q=${loc.features[45].properties.name}" target="_blank">${loc.features[45].properties.name} <br><br>
      </h3>
    `

    // Displays covid info
    document.getElementById('covidResults').innerHTML = `
      <section class="section py-1">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="notification">
                <h1>${covid.country}</h1>
                <p id="blackText"><b>Active Cases</b> ${covid.active}
                <p id="blackText"><b>Today's Cases</b> ${covid.todayCases}
                <p id="blackText"><b>Today's Deaths</b> ${covid.todayDeaths}
              </div>
            </div>
            <div class="column">
                <p id="smallText">${rateCovidSafety()}
            </div>
          </div>
        </div>
      </section>
      `
    
    // Gives a travel safety recommendation
    function rateCovidSafety(rating) {
      if (covid.activePerOneMillion <= 300) {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is VERY safe to travel to this country, but beware travel-mandated quarantines upon arrival. Please be mindful of and observe proper COVID-related conduct, such as social distancing and mask usage.`
      } else if (covid.activePerOneMillion <= 1000) {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is RELATIVELY safe to travel to this country, but be vigilant of high-risk activities. Please be mindful of and observe proper COVID-related conduct, such as social distancing and mask usage.`
      } else if (covid.activePerOneMillion <= 3000) {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is SOMEWHAT safe to travel to this country, but be vigilant of high-risk activities. Please be mindful of and observe proper COVID-related conduct, such as social distancing and mask usage.`
      } else if (covid.activePerOneMillion <= 5000) {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is RISKY to travel to this country. Avoid high-risk activities, such as public gatherings. Please be mindful of and observe proper COVID-related conduct, such as social distancing and mask usage.`
      } else if (covid.activePerOneMillion <= 15000) {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is VERY risky to travel to this country. Avoid high-risk activities, such as public gatherings. Be extremely vigilant regarding COVID-related safety conduct, and wash hands as frequently as possible.`
      } else {
        rating = `There are currently ${Math.round(covid.activePerOneMillion)} active cases of COVID-19 per million. We think it is EXTREMELY RISKY to travel to this country. We do not recommend any form of non-essential travel to this country. If you currently reside, be extremely vigilant regarding COVID-related safety conduct.`
      }
      return rating;
    }

    // Displays image to center of website and changes background
    document.getElementById('imageResult').innerHTML = ''
      var imgElem = document.createElement('img');
      imgElem.src = image.results[0].urls.regular;
      imgElem.alt = image.results[0].alt_description;
      document.getElementById('imageResult').append(imgElem);
      document.body.style.backgroundImage = `url('${image.results[2].urls.full}')`;

    // Displays weather data
    document.getElementById('weatherResults').innerHTML = `
      <section class="section py-1">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="notification">
                <p><b>Tomorrow</b><br>
                  Weather: ${weather[4].weather[0].main}<br>
                  Temperature: ${Math.round(9 / 5 * (weather[4].main.temp - 273) + 32)}° F<br>
                  Wind: ${weather[4].wind.speed} mph
              </div>
            </div>
            <div class="column">
              <div class="notification">
                <p><b>The next day</b><br>
                  Weather: ${weather[12].weather[0].main}<br>
                  Temperature: ${Math.round(9 / 5 * (weather[12].main.temp - 273) + 32)}° F<br>
                  Wind: ${weather[12].wind.speed} mph
              </div>
            </div>
            <div class="column">
              <div class="notification">
                <p><b>Two days out</b><br>
                  Weather: ${weather[20].weather[0].main}<br>
                  Temperature: ${Math.round(9 / 5 * (weather[20].main.temp - 273) + 32)}° F<br>
                  Wind: ${weather[20].wind.speed} mph
              </div>
            </div>
          </div>
        </div>
      </section>
      `

    // Clears search bar after use
    document.getElementById('search').value = ''

          }) .catch(err => console.error(err))

        }) .catch(err => console.error(err))

      }) .catch(err => console.error(err))

    }) .catch(err => console.error(err))

  }) .catch(err => console.error(err))

})
