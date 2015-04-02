var crontab = require('node-crontab');

var config = require('./config.json');

var twitter = require('./lib/jobs/twitter');
// var googleplus = require('./lib/jobs/googleplus');
// var facebook = require('./lib/jobs/facebook');

// Post a random talk on social networks twice a day
// * One for european time range
// * Another for USA time range
var every_6_hours = "* * * * * *";
var context = { count: 0 };
var rtt = crontab.scheduleJob(every_6_hours, twitter.randTalkStatus, null, context);
/*
var rtf = crontab.scheduleJob(every_6_hours, twitter.randTalkFacebook);
var rtg = crontab.scheduleJob(every_6_hours, twitter.randTalkGooglePlus);
*/

// TODO: it should be a webserver
// * exports an API
// * monitor scheduled jobs
// * pause / unpause jobs
// * reload configuration
