var crontab = require('node-crontab');

var twitter = require('./lib/jobs/twitter');
// var googleplus = require('./lib/jobs/googleplus');
// var facebook = require('./lib/jobs/facebook');

// Post a random talk on social networks twice a day
// * One for european time range
// * Another for USA time range
var every_6_hours = "* * * * * *";
var rtt = crontab.scheduleJob(every_6_hours, twitter.randTalkStatus);
/*
var rtf = crontab.scheduleJob(every_6_hours, twitter.randTalkFacebook);
var rtg = crontab.scheduleJob(every_6_hours, twitter.randTalkGooglePlus);
*/
