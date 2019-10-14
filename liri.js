// Spotify Keys
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./key.js");

// Axios requirement
var axios = require("axios");

// to read and write data in random.txt
var fs = require("fs");

// variables 
var command = process.argv[2];
var inputValue = process.argv.slice(3).join("+");

switch (command) {
    case "spotify-this-song":
        spotify();
        break;
    case "concert-this":
        concert();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-say":
        doIt();
        break;
}


function spotify() {
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: inputValue, limit: 1 })
        .then(function (response) {
            console.log("The Song Artist is " + response.tracks.items[0].album.artists[0].name);    //Artist
            console.log("The Song name is " + response.tracks.items[0].name);                       //Name
            console.log("The Song preview is " + response.tracks.items[0].preview_url);             //preview
            console.log("The Album is " + response.tracks.items[0].album.name);                     //Album Name
        })
        .catch(function (err) {
            spotify.search({ type: 'track', query: "The Sign", limit: 10 })
                .then(function (response) {
                    console.log("Error: Unable to find song. So here is another one!")
                    console.log("The Song Artist is " + response.tracks.items[5].album.artists[0].name);    //Artist
                    console.log("The Song name is " + response.tracks.items[5].name);                       //Name
                    console.log("The Song preview is " + response.tracks.items[5].preview_url);             //preview
                    console.log("The Album is " + response.tracks.items[5].album.name);                     //Album Name
                })
        });
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + inputValue + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
            console.log("Name of venue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date of the Event: " + response.data[0].datetime);
        })
}

function movie() {
    axios.get("http://www.omdbapi.com/?t=" + inputValue + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (response.data.Response != "False") {
                // console.log(response.data)
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        })
        .error
    {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // console.log(response.data);
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
    }
}

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log("Unable to read Data");
        }
        var dataArr = data.split(",");        
        command = dataArr[0];
        inputValue = dataArr[1];

        switch (command) {
            case "spotify-this-song":
                spotify();
                break;
            case "concert-this":
                concert();
                break;

            case "movie-this":
                movie();
                break;
        };
    });
}