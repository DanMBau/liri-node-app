// declaration of global variables and npm packages

require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api")

var moment = require("moment");

var keys = require("./keys");

var request = require("request");

var axios = require("axios");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var search = process.argv.slice(3).join(" ");




var getArtistNames = function (artist) {
    return artist.name;
};

//spotify api

var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "The sign";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

//bands in town api

var bandSearch = (search) => {
	axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
		.then(function (response) {
			for (var i = 0; i < 5; i++) {
				let concertResults = "--------------------------------------------------------------------" +
					"\nVenue Name: " + response.data[i].venue.name +
					"\nVenue Location: " + response.data[i].venue.city +
					"\nDate of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
					"\n--------------------------------------------------------------------";
				console.log(concertResults);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

//get OMBD

var getMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    request(urlHit, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var response = JSON.parse(body);

            console.log("Title: " + response.Title);
            console.log("Year: " + response.Year);
            console.log("Rated: " + response.Rated);
            console.log("IMDB Rating: " + response.imdbRating);
            console.log("Country: " + response.Country);
            console.log("Language: " + response.Language);
            console.log("Plot: " + response.Plot);
            console.log("Actors: " + response.Actors);
            console.log("Rotton Tomatoes Rating: " + response.Ratings[1].Value);
        }
    });
};

//do what the .txt file says

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length === 2) {
            choose(dataArr[0], dataArr[1]);
        }
        else if (dataArr.length === 1) {
            choose(dataArr[0]);
        }
    });
};

//choose function based on user input

var choose = function (caseData, functionData) {
    switch (caseData) {
        case 'concert-this':
            bandSearch(search);
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't know");
    }
};

var runThis = function (argOne, argTwo) {
    choose(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);