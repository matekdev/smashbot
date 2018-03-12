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
    ['EGLX 2018'                               ,'3','9'],
    ['National Melee Arcadian / Midwest Mayhem','3','11'],
    ['Rise 2018'                               ,'3','17'],
    ['SWEET 31'                                ,'3','17'],
    ['The Mango'                               ,'3','18'],
    ['Full Bloom 4'                            ,'3','24'],
    ['ESA Vegas Opener'                        ,'3','24'],
    ['Collision XV'                            ,'3','31'],
    ['Respawn 6'                               ,'3','31'],
    ['ESA Oakland Opener'                      ,'4','7'],
    ['Fight Pitt 8'                            ,'4','7'],
    ['The Deep 5'                              ,'4','14'],
    ['ConComics'                               ,'4','20'],
    ['Flatiron 3'                              ,'4','21'],
    ['Aegis'                                   ,'4','21'],
    ['Arcane Tournaments'                      ,'4','27'],
    ['Glitch 4'                                ,'4','28'],
    ['Smash Summit 6'                          ,'5','3'],
    ['KVO 2018'                                ,'5','4'],
    ['Port Priority 3'                         ,'5','5'],
    ['Pound Underground'                       ,'5','12'],
    ['Push More Buttons 2018'                  ,'5','12'],
    ['GOML 2018'                               ,'5','18'],
    ['BAM 2018'                                ,'5','18'],
    ['MomoCon'                                 ,'5','24'],
    ['Combo Breaker 2018 / EDEN'               ,'5','25'],
    ['Smash N Splash 2018'                     ,'6','1'],
    ['Dreamhack Austin'                        ,'6','1'],
    ['Saints Gaming Live'                      ,'6','9'],
    ['OpTic Arena'                             ,'6','8'],
    ['Dreamhack Summer'                        ,'6','15'],
    ['Smashville 7'                            ,'6','16'],
    ['Omega II'                                ,'6','16'],
    ['Smashadelphia 2018'                      ,'6','22'],
    ['2GG Hyrule Saga'                         ,'6','23'],
    ['CEO 2018'                                ,'6','28'],
    ['Awakening 4'                             ,'6','29'],
    ['The Even Bigger Balc'                    ,'7','6'],
    ['Albion 3'                                ,'7','14'],
    ['Smash Factor 7'                          ,'7','20'],
    ['Low Tier City 6'                         ,'7','27'],
    ['EVO 2018'                                ,'8','3'],
    ['Smashcon 2018'                           ,'8','9'],
    ['Heir 5'                                  ,'8','17'],
    ['Shine 2018'                              ,'8','24'],
    ['Dreamhack Montreal'                      ,'9','7'],
    ['Canada Cup'                              ,'10','26'],
    ['Dreamhack Atlanta'                       ,'11','16'],
    ['Dreamhack Winter'                        ,'11','30'],
    ['Dont Park On The Grass 2018'             ,'12','15']
];

// Function that gets passed whenever time interval gets reset
function tweet(tourneydata, day, month) {
    // Grab current day
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;

    // Logs the day for testing
    console.log(day);
    
    // Checks if there are any matches within the array, if there are two the string returned is modified.
    for (i = 0; i < tourneydata.length; ++i) {
        if (tourneydata[i][1] == month) {
            if (tourneydata[i][2] == day) {
                if (tourneydata[i+1][2] == day) {
                    return (tourneydata[i][0] + ' and ' + tourneydata[i+1][0] + ' are starting today!');
                } else {
                    return (tourneydata[i][0] + ' is starting today!');
                }
            }
        }
    }

    return '';

}

// Sends tweet
function sendtweet() {
    T.post('statuses/update', { status: tweet(tourneydata) }, function(err, data, response) {

    })

    function gotData(err, data, response) {
    }
}

// Check and try to send tweet every 24 hours (in ms)
setInterval(sendtweet, 8.64e+7);







