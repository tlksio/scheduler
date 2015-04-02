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
    var status = {
        "id": 9735313,
        "status": "fooo bar this is an status on twitter"
    }
    return callback(null, status);
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
            console.log(status);
            console.log('done');
        });
    });
};