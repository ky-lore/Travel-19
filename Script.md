- The functionality of our program relied on four main external modules for which various APIs were required.

For our COVID module, we were lucky to be able to utilize only one API for our data. The API we used was disease.sh which provides us with daily updating stats and figures regarding COVID-19. The main figures we utilized included a live count of active cases, the amount of new reported cases daily, but most importantly, the amount of live/active cases per million residents. That information combined with some safety insights from the World Health Organization allowed us to give a recommendation on the COVID-related risk of the country as a whole. These recommendations ranged anywhere from "very safe" in countries with very low COVID density such as South Korea, to "extremely risky and not recommended" in high density countries such as France.

Next, we have our image-scraping API provided by Unsplash which we used for the snapshot module and also to give us a dynamically-updating page background with the inputted city. It's the most straightforward of any of the APIs we used - it simply grabs the inputted city and returns two images: one to update the page background and one to display on the page as a preview of the city.

The trickiest module was actually the suggested tourist spots - OpenTripMap, the API we used, only supported latitude-longitude coordinate input. So not only did we have to use OpenTripMap, but we also needed to use a geocaching API which gave us coordinates for any user-inputted city. Those coordinates were then run through OpenTripMap to return 10 popular tourist locations for any set of coordinates.

Finally, we have the weather module which is just a simple data pull from OpenWeatherMap, which luckily enough, was able to use a city name as opposed to coordinates for the input query.



# Aspiring software developer, car enthusiast, garage mechanic, anime fanatic, and dog walker extraordinaire. Has retired from multiplayer games because he's too bad at them and that makes him sad. Best found in the wild on Sundays raging at his fantasy football team. Go Raptors.