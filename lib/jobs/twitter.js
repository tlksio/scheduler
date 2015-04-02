var name = 'rtt';

function getRandomTalk(callback) {
    // TODO : get random talk
    var talk = {
        "id": 12345,
        "title": "random talk title"
    };
    return callback(null, talk);
}

function postTwitterStatus(talk, callback) {
    // TODO : post tweet throught OAuth
    return callback(null, talk);
}

exports.randTalkStatus = function() {
    // get a random talk
    getRandomTalk(function(err, talk) {
        if (err) {
            throw new Error(err);
        }
        // post this talk to twitter
        postTwitterStatus(talk, function(err, status) {
            if (err) {
                throw new Error(err);
            }
            console.log('[' + name + '][' + Date.now() + '] published on twitter : ' + talk.id);
            return status;
        });
    });
};
