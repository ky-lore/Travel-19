
document.getElementById("userInput").addEventListener('click', event => {
  event.preventDefault();
  var lon;
  var lat;
  var searchInput = document.getElementById('search').value;
  console.log(searchInput)

  axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${searchInput}&apikey=5ae2e3f221c38a28845f05b6242c78f95403bb14bb2af76c5b0bcf42`)
    .then(res => {
      console.log(res.data.country)
      country = res.data.country;
      lon = res.data.lon;
      lat = res.data.lat;
      console.log(lon, lat)

      axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&rate=3&apikey=5ae2e3f221c38a28845f05b6242c78f95403bb14bb2af76c5b0bcf42`)
        .then(res => {
          var loc = res.data;
          console.log(loc)
          console.log(lon)
          console.log(lat)

          // API for covid-19 info
          axios.get(`https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20%60`)
            .then(res => {
              var covid = res.data
              console.log(covid)

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
              // API for image searching
              // Displays image from API into the imageResult div
              axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchInput}&client_id=mMMsMJbMcVWyjFIi4RLnMYtZ0_PAQXqh-HODKnPCcxw`)
                .then(res => {
                  var image = res.data;
                  console.log(image)

                  document.getElementById('imageResult').innerHTML = ''
                  var imgElem = document.createElement('img')
                  imgElem.src = image.results[0].urls.regular
                  imgElem.alt = image.results[0].alt_description
                  document.getElementById('imageResult').append(imgElem)

                  document.getElementById('search').value = ''
                })

              // Displays covid info from API into the covidResults div
              document.getElementById('covidResults').innerHTML = `
                    <h1 class="has-text-white">${covid.country}</h1>
                    <p><b>Active Cases</b> ${covid.active}
                    <p><b>Today's Cases</b> ${covid.todayCases}
                    <p><b>Today's Deaths</b> ${covid.todayDeaths}
                  `
            })
            .catch(err => console.error(err))

        })
        .catch(err => console.error(err))

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=b9a19d23d6cf2eb624e5529ab42acecb`)
        .then(res => {
          console.log(res.data.list)
          var weather = res.data.list
          // 9/5(K - 273) + 32
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
        })
        .catch(err => console.error(err))


    })
    .catch(err => console.error(err))


})
