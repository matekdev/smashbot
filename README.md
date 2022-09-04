# smashbot
This is a twitter bot that will post a tweet every single time there is a tournament going on for Smash Bros. Melee.

https://twitter.com/WhenIsMelee

## Sources

|Source|Dates|
|:--|:--|
|https://docs.google.com/spreadsheets/d/1WXWd5yTWVTKQ6S6OXrfYb1WL1DelFSPiiIS_6rWGlGI/edit?ts=5a9f221a#gid=0|2018|

## Setup

All configuration is done through environment variables. On Heroku, this can be done through:

```shell
heroku config:set TWITTER_CONSUMER_KEY=...
heroku config:set TWITTER_CONSUMER_SECRET=...
heroku config:set TWITTER_ACCESS_TOKEN=...
heroku config:set TWITTER_ACESSS_TOKEN_SECRET=...
```
