console.log('twitter bot started');


// Twitter API setup
// Using Twit (https://github.com/ttezel/twit)
var Twit = require('twit');

// Twitter API data goes here
var T = new Twit({
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })

// Tourneydata for the year 2018
//    TOURNEY DAY                               MONTH/DAY
var tourneydata = [
    ['Start of Twitterbot 2019'                               ,'3','11', 'STARTING!']
    ['NChi Ultra'                               ,'3','16', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Full Bloom 5'                               ,'3','23', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Battle of BC 3'                               ,'3','30', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Fight Pitt 9'                               ,'4','6', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Saving Mr. Lombardi'                               ,'4','13', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Pound 2019'                               ,'4','19', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Come to Papa 3'                               ,'4','27', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Regen 2019'                               ,'4','27', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['GOML 2019'                               ,'5','17', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['MomoCon 2019'                               ,'5','23', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash N Splash 5'                               ,'5','31', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash Summit 8'                               ,'6','13', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['CEO 2019'                               ,'6','28', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['The Pinnacle 2019'                               ,'7','5', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Low Tier City 7'                               ,'7','12', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash Factor 8'                               ,'7','26', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Super Smash Con 2019'                               ,'8','9', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Shine 2019'                               ,'8','23', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee']
];

function tweet(tourneydata, day, month) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var time = date.getUTCHours();

    console.log(day);
    console.log(time);
    
        if (time <= 17) {
            for (i = 0; i < tourneydata.length; ++i) {
                if (tourneydata[i][1] == month) {
                    if (tourneydata[i][2] == day) {
                        if (tourneydata[i+1][2] == day) {
                            return (tourneydata[i][0] + ' and ' + tourneydata[i+1][0] + ' are starting today! ' + 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee');
                        } else {
                            return (tourneydata[i][0] + ' is starting today! ' + tourneydata[i][3]);
                        }
                    }
                }
            }
        }

    return '';

}

function sendtweet() {
    T.post('statuses/update', { status: tweet(tourneydata) }, function(err, data, response) {

    })

    function gotData(err, data, response) {
    }
}

// Try to tweet every 1 hour
setInterval(sendtweet, 3.6e+6);








