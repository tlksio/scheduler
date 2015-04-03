var should = require("should");
var schedule = require('../lib/schedule');

describe('Scheduler', function() {

    it('should have 0 processed jobs', function(done) {
        should.equal(0, schedule.count);
        done();
    });

    it('should not have any active jobs', function(done) {
        var list = schedule.list();
        list.should.be.empty;
        done();
    });

    describe('Add a job "sample-job"', function() {

        before(function(done) {
            var fn = function() {};
            schedule.start('sample-job', fn, 1000);
            done();
        });

        it('should have one active job', function(done) {
            var list = schedule.list();
            list.should.have.length(1);
            done();
        });

        it('job should be named "sample-job"', function(done) {
            var list = schedule.list();
            list.should.containEql('sample-job');
            done();
        });

    });

    describe('Add additional jobs', function() {

        before(function(done) {
            var fn = function() {};
            schedule.start('sample-job-2', fn, 1000);
            schedule.start('sample-job-3', fn, 1000);
            schedule.start('sample-job-4', fn, 1000);
            done();
        });

        it('should have 4 active job', function(done) {
            var list = schedule.list();
            list.should.have.length(4);
            done();
        });

    });

    describe('Stop job "sample-job"', function() {

        before(function(done) {
            var fn = function() {};
            schedule.stop('sample-job', fn, 1000);
            done();
        });

        it('should have 3 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(3);
            done();
        });

        it('should not contain "sample-job"', function(done) {
            var list = schedule.list();
            list.should.not.containEql('sample-job');
            done();
        });

    });

    describe('Reset scheduler', function(done) {

        before(function(done) {
            schedule.reset();
            done();
        });

        it('should have 0 active jobs', function(done) {
            var list = schedule.list();
            list.should.have.length(0);
            done();
        });

    });

});
