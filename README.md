# chronographjs
A small nano timer for NodeJS applications based on proccess.hrtime

```
npm i chronographjs --save
```

### To see the power run:

```
node
> var tst = require('chronographjs');
> tst.runExample();
```

### More detailed example
You can see the code that runs `tst.runExample()` bellow or you can [check it here](https://github.com/Tunts/chronographjs/blob/master/example.es6)
```javascript
var chronographjs = require('chronographjs');
var timer = new chronographjs.getTimer();

timer.start('t1', 'cache_check');
for (let i = 1; i < 1000000; i++) {}
timer.stop('t1');

timer.start('t2', 'select,main_database,db');
for (let i = 1; i < 1000000; i++) {}
timer.stop('t2');

timer.start('t3', 'raw_compute');
for (let i = 1; i < 1500000; i++) {}
timer.stop('t3');

timer.start('t4', 'insert,main_database,db');
for (let i = 1; i < 1000000; i++) {}
timer.stop('t4');

timer.start('t5', 'insert,log_database,db');
for (let i = 1; i < 100; i++) {}
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
```

The above code will give you something like this:
```
Running example.es6
Our total processing time until now is 12.266026 ms
Code block t1 took 6.152425 ms
Code block t2 took 1.730105 ms
Code block t3 took 2.58467 ms
Code block t4 took 1.672985 ms
Code block t5 took 2.231 us
We spent a total of 3.405321 ms in the database
From that time, 1.730105 ms were selects
1.675216 ms were inserts
3.40309 ms in the main database
0.002231 ms in the log database
we also blocked for 2.58467 ms in raw compute
With all our console logs we took a total of 0.01429958 s or 14.29958 ms or 14299.58 us or 14299580 ns
And finally, we can get a object with all the times, this is pretty usual to logging and debugs:
 {
  tnt_timer: '34804.649 us',
  t1: '6272.982 us',
  t2: '6312.637 us',
  t3: '8160.103 us',
  t4: '7236.837 us',
  t5: '74.178 us'
 }
```