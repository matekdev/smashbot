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
    ['EGLX 2018'                               ,'1','1', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee']
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








