var config = require('./config.json');
var schedule = require('./lib/schedule');

var twitter = require('./lib/jobs/twitter');

// Reset
schedule.reset();

// Add jobs
schedule.start("random-twitter-status",
               twitter.randTalkStatus,
               1000);

schedule.start("random-facebook-status",
               twitter.randTalkStatus,
               1000);

// TODO: it should be a webserver
// * monitor scheduled jobs
// * pause / unpause jobs
// * read jobs from a configuration file
// * reload configuration
// * export an HTTP API
