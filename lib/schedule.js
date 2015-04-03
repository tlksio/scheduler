var debug = require('debug')('schedule');
var events = require('events');
var util = require('util');

/**
 * Schedule constructor
 */
function Schedule() {
    "use strict";
    var foo = 'bar';
    // persist active jobs
    this.jobs = {};
    // total process ticks
    this.count = 0;
}
util.inherits(Schedule, events.EventEmitter);

/**
 * Starts a job
 *
 * Adds a new job to the list of active jobs
 * Installs a rate interval for job execution
 *
 * @param name  string      unique job name
 * @param fn    function    callback job function to process
 * @param rate  int         time rate delay execution
 */
Schedule.prototype.start = function(name, fn, rate) {
    "use strict";
    var _job = require('./job');
    var job = new _job(name, rate);
    job.interval = setInterval(job.run.bind(job, schedule, fn), job.rate);
    this.jobs[name] = job;
    debug('schedule %s, rate:%sms', name, rate);
    return this;
};

/**
 * Stops an active job
 *
 * Removes a job from the list of active jobs by its name
 * Uninstalls the rate interval job execution
 *
 * @param name  string  unique job name
 */
Schedule.prototype.stop = function(name) {
    "use strict";
    var interval = this.jobs[name].interval;
    clearInterval(interval);
    delete this.jobs[name];
    debug('stop %s', name);
    return this;
};

/**
 * Reset schedule instance
 *
 * Stops all active jobs
 */
Schedule.prototype.reset = function() {
    "use strict";
    var list = schedule.list();
    list.forEach(function(job) {
        schedule.stop(job);
    });
    debug('reset');
    return this;
};

/**
 * Lists active job names
 */
Schedule.prototype.list = function() {
    "use strict";
    return Object.keys(this.jobs);
};

var schedule = module.exports = new Schedule();
