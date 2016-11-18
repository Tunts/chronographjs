function TntTime(s, ns = null) {
    if (ns === null && Array.isArray(s) && s.length === 2) {
        ns = s[1];
        s = s[0];
    }
    if (!isNaN(s) && !isNaN(ns)) {
        this.s = Number(s);
        this.ns = Number(ns);
    } else {
        this.s = 0;
        this.ns = 0;
    }
}

TntTime.prototype.tuple = function () {
    return [this.s, this.ns];
};

TntTime.prototype.secs = function (suffix = false) {
    var unit = suffix ? ' s' : null;
    return this.s + this.ns / 1000000000 + unit;
};

TntTime.prototype.msecs = function (suffix = false) {
    var unit = suffix ? ' ms' : null;
    return this.s * 1000 + this.ns / 1000000 + unit;
};

TntTime.prototype.usecs = function (suffix = false) {
    var unit = suffix ? ' us' : null;
    return this.s * 1000000 + this.ns / 1000 + unit;
};

TntTime.prototype.nsecs = function (suffix = false) {
    var unit = suffix ? ' ns' : null;
    return this.s * 1000000000 + this.ns + unit;
};

TntTime.prototype.sum = function (timer) {
    var ns = this.ns + timer.ns;
    var s = this.s + timer.s;
    if (ns >= 1000000000) {
        ns -= 1000000000;
        s += 1;
    }
    return new TntTime(s, ns);
};

TntTime.prototype.sub = function (timer) {
    var ns = this.ns - timer.ns;
    var s = this.s - timer.s;
    if (ns < 0) {
        ns += 1000000000;
        s -= 1;
    }
    return new TntTime(s, ns);
};

TntTime.prototype.drift = function (timer) {
    var seconds = timer.s - this.s;
    var nanosec = timer.ns;
    if (timer.ns < this.ns) {
        seconds -= 1;
        nanosec += 1000000000;
    }
    nanosec -= this.ns;
    return new TntTime(seconds, nanosec);
};

module.exports = TntTime;