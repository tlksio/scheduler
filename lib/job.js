var debug = require('debug')('schedule');
var events = require('events');
var util = require('util');

/**
 * Job contstructor
 */
function Job(name, rate) {
    "use strict";
    // job unique name
    this.name = name;
    // time between executions
    this.rate = rate;
    // job interval timer
    this.interval = null;
    // total process jobs
    this.count = 0;
}
util.inherits(Job, events.EventEmitter);

/**
 * process a job
 *
 * Increases scheduler counter
 * Increases job counter
 * Executes the job function code
 * @param schedule  object      scheduler object
 * @param fn        function    callback job function to process
 */
Job.prototype.run = function(schedule, fn) {
    "use strict";
    schedule.count++;
    this.count = schedule.count;
    debug('run %s:%s, started:%s', this.name, this.count, Date.now());
    fn();
};

var job = module.exports = Job;
