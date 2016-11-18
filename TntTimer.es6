var TntTime = require('./TntTime.es6');

function TntTimer() {
    this.timers = [];
    this.start('tnt_timer');
    this.tags = {};
}

/**
 *
 * @param name The name for this timer
 * @param tags The tags you with to add to this timer for reporting
 */
TntTimer.prototype.start = function (name, tags) {
    if (this.timers[name]) {
        throw new Error('Timer ' + name + ' already started');
    } else {
        if (tags) {
            tags = String(tags).split(',');
            tags.forEach((tag) => {
                if (!this.tags[tag]) {
                    this.tags[tag] = [];
                }
                this.tags[tag].push(name);
            });
        }

        this.timers[name] = {
            start: new TntTime(process.hrtime())
        };
    }
};

TntTimer.prototype.stop = function (name) {
    if (!this.timers[name]) {
        throw new Error('Timer ' + name + ' not found');
    } else {
        this.timers[name].end = new TntTime(process.hrtime())
    }
};

TntTimer.prototype.time = function (name1, name2) {
    if (!name2) {
        name2 = name1;
    }

    if (!this.timers[name1]) {
        throw new Error('Timer ' + name1 + ' not found');
    }

    if (!this.timers[name2]) {
        throw new Error('Timer ' + name2 + ' not found');
    } else if (!this.timers[name2].end) {
        throw new Error('Timer ' + name2 + ' is still running');
    }

    return this.timers[name1].start.drift(this.timers[name2].end);
};

TntTimer.prototype.total = function (tag) {
    if (tag) {
        if (this.tags[tag]) {
            var totalTime = new TntTime();
            this.tags[tag].forEach((entry) => {
                totalTime = totalTime.sum(this.time(entry));
            });
            return totalTime;
        } else {
            return new TntTime();
        }
    } else {
        this.stop('tnt_timer');
        return this.timers['tnt_timer'].start.drift(this.timers['tnt_timer'].end);
    }
};

module.exports = TntTimer;