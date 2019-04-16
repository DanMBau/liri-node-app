LIRI Bot

  

This app is utilizing **node.js** to retrieve datasets from several different API services.

  

-  **Spotify**

-  **Bands In Town**

-  **OMDB**

  

one of the following commands is taken in via *process.argv[2]* and *process.argv[3]* :

  

**`node liri.js spotify-this-song '<song name here>'`**

- This will show the following information about the song in your terminal/bash window

  

- Artist(s)

- The song's name

- A preview link of the song from Spotify

- The album that the song is from

  

**`node liri.js concert-this <artist/band name here>`**

  

- This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

- Name of the venue

- Venue location

- Date of the Event (use moment to format this as "MM/DD/YYYY")

  

`node liri.js movie-this '<movie name here>'`

  

  

* This will output the following information to your terminal/bash window:

  
  
  

* Title of the movie.

  

* Year the movie came out.

  

* IMDB Rating of the movie.

  

* Rotten Tomatoes Rating of the movie.

  

* Country where the movie was produced.

  

* Language of the movie.

  

* Plot of the movie.

  

* Actors in the movie.

  

`node liri.js do-what-it-says`

  

  

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


Here is a [video](https://github.com/DanMBau/liri-node-app/blob/master/Screen%20Recording.mov) of the app in use