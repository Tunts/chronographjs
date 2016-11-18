exports.TntTime = require('./TntTime.es6');
exports.TntTimer = require('./TntTimer.es6');
exports.getTimer = function(){
    return new exports.TntTimer();
};

exports.runExample = function(){
    console.log('Running example.es6');
    require('./example.es6')();
};