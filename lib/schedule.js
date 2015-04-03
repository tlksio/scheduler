var debug = require('debug');
var events = require('events');
var util = require('util');

/**
 * logger
 */
var logger = debug('scheduler');

/**
 * persist active jobs
 */
var intervals = {};

/**
 * Schedule constructor
 */
function Schedule() {
    "use strict";
    // number of global ticks
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
    logger('start job %s every %s miliseconds', name, rate);
    var jobLogger = debug('scheduler:'+name);
    // job process wrapper
    function process() {
        this.count++;
        jobLogger('triggered job %s:%s at %s', name, this.count, Date.now());
        fn();
    }
    var interval = setInterval(process.bind(this), rate);
    intervals[name] = interval;
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
    logger('stop job %s', name);
    var interval = intervals[name];
    clearInterval(interval);
    delete intervals[name];
};

/**
 * Lists active job names
 */
Schedule.prototype.list = function() {
    "use strict";
    return Object.keys(intervals);
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
};

var schedule = module.exports = new Schedule();
