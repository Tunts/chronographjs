module.exports = function () {
    var chronographjs = require('./index');

    var timer = new chronographjs.getTimer();

    timer.start('t1', 'cache_check');
    for (let i = 1; i < 1000000; i++) {
    }
    timer.stop('t1');

    timer.start('t2', 'select,main_database,db');
    for (let i = 1; i < 1000000; i++) {
    }
    timer.stop('t2');

    timer.start('t3', 'raw_compute');
    for (let i = 1; i < 1500000; i++) {
    }
    timer.stop('t3');

    timer.start('t4', 'insert,main_database,db');
    for (let i = 1; i < 1000000; i++) {
    }
    timer.stop('t4');

    timer.start('t5', 'insert,log_database,db');
    for (let i = 1; i < 100; i++) {
    }
    timer.stop('t5');

    console.log('Our total processing time until now is %s', timer.total().msecs(true));
    console.log('Code block t1 took %s', timer.time('t1').msecs(true));
    console.log('Code block t2 took %s', timer.time('t2').msecs(true));
    console.log('Code block t3 took %s', timer.time('t3').msecs(true));
    console.log('Code block t4 took %s', timer.time('t4').msecs(true));
    console.log('Code block t5 took %s', timer.time('t5').usecs(true));
    console.log('We spent a total of %s in the database', timer.total('db').msecs(true));
    console.log('From that time, %s were selects', timer.total('select').msecs(true));
    console.log('%s were inserts', timer.total('insert').msecs(true));
    console.log('%s in the main database', timer.total('main_database').msecs(true));
    console.log('%s in the log database', timer.total('log_database').msecs(true));
    console.log('we also blocked for %s in raw compute', timer.total('raw_compute').msecs(true));
    var total = timer.total();
    console.log('With all our console logs we took a total of %s or %s or %s or %s', total.secs(true), total.msecs(true), total.usecs(true), total.nsecs(true));
    console.log('And finally, we can get an object with all the times: \n', timer.times('usecs', true));

};