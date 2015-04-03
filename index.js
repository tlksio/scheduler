var config = require('./config.json');

var schedule = require('./lib/schedule');
var twitter = require('./lib/jobs/twitter');

// Add jobs
schedule.start("random-twitter-status", twitter.randTalkStatus, 1000);

// Reset scheduler
/*
setInterval(function() {
    schedule.reset();
}, 5000);
*/

// TODO: it should be a webserver
// * monitor scheduled jobs
// * pause / unpause jobs
// * read jobs from a configuration file
// * reload configuration
// * export an HTTP API
