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
    ['EGLX 2018'                               ,'3','9', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['National Melee Arcadian / Midwest Mayhem','3','11', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['SWEET 31'                                ,'3','17', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['The Mango'                               ,'3','18', 'https://www.twitch.tv/mang0'],
    ['Full Bloom 4'                            ,'3','24', 'https://www.twitch.tv/meleeeveryday'],
    ['Respawn 6'                               ,'3','31', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['ESA Oakland Opener'                      ,'4','7' , 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Fight Pitt 8'                            ,'4','7', 'www.twitch.tv/pghsmash'],
    ['The Deep 5'                              ,'4','14', 'http://twitch.tv/santacruzmelee'],
    ['ConComics'                               ,'4','20', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Flatiron 3'                              ,'4','21', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Aegis'                                   ,'4','21', 'https://www.twitch.tv/meleeeveryday'],
    ['Arcane Tournaments'                      ,'4','27', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash Summit 6'                          ,'5','3', 'https://www.twitch.tv/beyondthesummit'],
    ['KVO 2018'                                ,'5','4', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Pound Underground'                       ,'5','12', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Push More Buttons 2018'                  ,'5','12', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['GOML 2018'                               ,'5','18', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['BAM 2018'                                ,'5','18', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['MomoCon'                                 ,'5','24', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Combo Breaker 2018 / EDEN'               ,'5','25', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash N Splash 2018'                     ,'6','1', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dreamhack Austin'                        ,'6','1', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Saints Gaming Live'                      ,'6','9', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['OpTic Arena'                             ,'6','8', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dreamhack Summer'                        ,'6','15', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smashville 7'                            ,'6','16', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Omega II'                                ,'6','16', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smashadelphia 2018'                      ,'6','22', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['CEO 2018'                                ,'6','28', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Awakening 4'                             ,'6','29', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['The Even Bigger Balc'                    ,'7','6', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smash Factor 7'                          ,'7','20', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Low Tier City 6'                         ,'7','27', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['EVO 2018'                                ,'8','3', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Smashcon 2018'                           ,'8','9', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Heir 5'                                  ,'8','17', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Shine 2018'                              ,'8','24', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dreamhack Montreal'                      ,'9','7', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Canada Cup'                              ,'10','26', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dreamhack Atlanta'                       ,'11','16', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dreamhack Winter'                        ,'11','30', 'https://www.twitch.tv/directory/game/Super%20Smash%20Bros.%20Melee'],
    ['Dont Park On The Grass 2018'             ,'12','15', 'https://www.twitch.tv/endgametv1']
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








