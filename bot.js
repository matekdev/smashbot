// Requires
const twit = require('twit');


// URL Generators
/**
 * Generates a Twitch stream URL.
 * @param streamer The streamer.
 * @returns {string} The URL.
 */
const URL_TWITCH = (streamer) =>
	streamer != null
		? `https://www.twitch.tv/${streamer}` :
		'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee';


// Config
/**
 * Gets a configuration option.
 * If this option is missing, the process will exit.
 * @param key The config key.
 */
function getConfig(key) {
	if (process.env[key] == null) {
		console.error(`Missing configuration key: ${key}`);
		process.exit(1);
	}
}


// Setup: Twitter
let twitter = new twit({
	consumer_key: getConfig('TWITTER_CONSUMER_KEY'),
	consumer_secret: getConfig('TWITTER_CONSUMER_SECRET'),
	access_token: getConfig('TWITTER_ACCESS_TOKEN'),
	access_token_secret: getConfig('TWITTER_ACCESS_TOKEN_SECRET'),
	timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

// Setup: Database
let tourneydata = require('./config/tournaments');
tourneydata.forEach((tourney, index) => {
	tourney.date = new Date(tourney.date);
	console.log(`DB: ${tourney.name} -- ${tourney.date.toUTCString()}`);
});

// Main
console.log('Twitter bot started.');
console.log('\n');

/**
 * Sends a tweet about a tournament.
 * @param tourney The tournament info.
 */
function tweet(tourney) {
	const msg = `${tourney.name} is starting today! ${URL_TWITCH(tourney.twitch)}`;

	twitter.post('statuses/update', {status: msg}, function (err, data, response) {
		if (err) {
			console.error("FAILED TO SEND TWEET: " + msg);
		} else {
			tourney.sent = true;
			console.log("SENT TWEET: " + msg);
		}
	});
}

/**
 * Checks for new tournaments coming up, and sends tweets if so.
 */
function update() {
	let date = new Date();

	let year = date.getUTCFullYear();
	let day = date.getUTCDate();
	let month = date.getUTCMonth();
	let time = date.getUTCHours();
	let anything = false;

	for (let tourney of tourneydata) {
		// Skip sent.
		if (tourney.sent === true) continue;

		// If date is ok...
		if (tourney.date.getUTCFullYear() === year
			&& tourney.date.getUTCMonth() === month
			&& tourney.date.getUTCDate() === day) {

			// Default to 8:00 AM EST.
			let compare_time = tourney.date.getUTCHours();
			if (tourney.date.getUTCHours() === 0) {
				compare_time = 13;
			}

			// If hours are ok, tweet it.
			if (time >= compare_time) {
				anything = true;
				tweet(tourney);
			}
		}
	}

	// Log.
	if (anything) {
		console.log('[update] Checked for tournaments, and tweeted!');
	} else {
		console.log('[update] Checked for tournaments.');
	}
}

// Timer
update();
setInterval(update, 1000 * 60 * 60 /* One Hour */);








