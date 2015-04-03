var debug = require('debug')('scheduler');

/**
 * persist active jobs
 */
var intervals = {};

/**
 * Schedule constructor
 */
function Schedule() {
    // number of ticks
    this.count = 0;
}

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
    debug('start job %s every %s miliseconds', name, rate);
    var interval = setInterval(fn.bind(this), rate);
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
    debug('stop job %s', name);
    var interval = intervals[name];
    clearInterval(interval);
    delete intervals[name];
};

/**
 * Lists active job names
 */
Schedule.prototype.list = function() {
    return Object.keys(intervals);
};

/**
 * Reset schedule instance
 *
 * Stops all active jobs
 */
Schedule.prototype.reset = function() {
    var list = schedule.list();
    list.forEach(function(job) {
        schedule.stop(job);
    });
};

var schedule = module.exports = new Schedule();
