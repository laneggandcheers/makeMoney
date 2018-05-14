//p
function P(t) {
    this.m = t,
    this.mp = t.invDigit(),
    this.mpl = 32767 & this.mp,
    this.mph = this.mp >> 15,
    this.um = (1 << t.DB - 15) - 1,
    this.mt2 = 2 * t.t
}

P.prototype.convert = function(t) {
    var o = n();
    return t.abs().dlShiftTo(this.m.t, o),
    o.divRemTo(this.m, null, o),
    t.s < 0 && o.compareTo(e.ZERO) > 0 && this.m.subTo(o, o),
    o
},
P.prototype.revert = function(t) {
    var e = n();
    return t.copyTo(e),
    this.reduce(e),
    e
},
P.prototype.reduce = function (t) {
    for (; t.t <= this.mt2;) t[t.t++] = 0;
    for (var e = 0; e < this.m.t; ++e) {
        var n = 32767 & t[e],
        o = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (n = e + this.m.t, t[n] += this.m.am(0, o, t, e, 0, this.m.t); t[n] >= t.DV;) t[n] -= t.DV,
        t[++n]++
    }
    t.clamp(),
    t.drShiftTo(this.m.t, t),
    t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
},
P.prototype.mulTo = function(t, e, n) {
    t.multiplyTo(e, n),
    this.reduce(n)
},
P.prototype.sqrTo = function V(t, e) {
    t.squareTo(e),
    this.reduce(e)
};





function MgjNumber(t, e, n) {
    null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
}
MgjNumber.prototype.copyTo = function (t) {
    for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
    t.t = this.t,
    t.s = this.s
},
MgjNumber.prototype.fromInt = function (t) {
    this.t = 1,
    this.s = t < 0 ? -1 : 0,
    t > 0 ? this[0] = t: t < -1 ? this[0] = t + DV: this.t = 0
},
MgjNumber.prototype.fromString = function(t, n) {
    var o;
    if (16 == n) o = 4;
    else if (8 == n) o = 3;
    else if (256 == n) o = 8;
    else if (2 == n) o = 1;
    else if (32 == n) o = 5;
    else {
        if (4 != n) return void this.fromRadix(t, n);
        o = 2
    }
    this.t = 0,
    this.s = 0;
    for (var i = t.length,
    r = !1,
    s = 0; --i >= 0;) {
        var a = 8 == o ? 255 & t[i] : u(t, i);
        a < 0 ? "-" == t.charAt(i) && (r = !0) : (r = !1, 0 == s ? this[this.t++] = a: s + o > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, (s += o) >= this.DB && (s -= this.DB))
    }
    8 == o && 0 != (128 & t[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
    this.clamp(),
    r && e.ZERO.subTo(this, this)
},
MgjNumber.prototype.clamp = function() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
},
MgjNumber.prototype.dlShiftTo = function (t, e) {
    var n;
    for (n = this.t - 1; n >= 0; --n) e[n + t] = this[n];
    for (n = t - 1; n >= 0; --n) e[n] = 0;
    e.t = this.t + t,
    e.s = this.s
},
MgjNumber.prototype.drShiftTo = function(t, e) {
    for (var n = t; n < this.t; ++n) e[n - t] = this[n];
    e.t = Math.max(this.t - t, 0),
    e.s = this.s
},
MgjNumber.prototype.lShiftTo = function (t, e) {
    var n, o = t % this.DB,
    i = this.DB - o,
    r = (1 << i) - 1,
    s = Math.floor(t / this.DB),
    a = this.s << o & this.DM;
    for (n = this.t - 1; n >= 0; --n) e[n + s + 1] = this[n] >> i | a,
    a = (this[n] & r) << o;
    for (n = s - 1; n >= 0; --n) e[n] = 0;
    e[s] = a,
    e.t = this.t + s + 1,
    e.s = this.s,
    e.clamp()
},
MgjNumber.prototype.rShiftTo = function(t, e) {
    e.s = this.s;
    var n = Math.floor(t / this.DB);
    if (n >= this.t) return void(e.t = 0);
    var o = t % this.DB,
    i = this.DB - o,
    r = (1 << o) - 1;
    e[0] = this[n] >> o;
    for (var s = n + 1; s < this.t; ++s) e[s - n - 1] |= (this[s] & r) << i,
    e[s - n] = this[s] >> o;
    o > 0 && (e[this.t - n - 1] |= (this.s & r) << i),
    e.t = this.t - n,
    e.clamp()
},
MgjNumber.prototype.subTo = function (t, e) {
    for (var n = 0,
    o = 0,
    i = Math.min(t.t, this.t); n < i;) o += this[n] - t[n],
    e[n++] = o & this.DM,
    o >>= this.DB;
    if (t.t < this.t) {
        for (o -= t.s; n < this.t;) o += this[n],
        e[n++] = o & this.DM,
        o >>= this.DB;
        o += this.s
    } else {
        for (o += this.s; n < t.t;) o -= t[n],
        e[n++] = o & this.DM,
        o >>= this.DB;
        o -= t.s
    }
    e.s = o < 0 ? -1 : 0,
    o < -1 ? e[n++] = this.DV + o: o > 0 && (e[n++] = o),
    e.t = n,
    e.clamp()
},
MgjNumber.prototype.multiplyTo = function (t, n) {
    var o = this.abs(),
    i = t.abs(),
    r = o.t;
    for (n.t = r + i.t; --r >= 0;) n[r] = 0;
    for (r = 0; r < i.t; ++r) n[r + o.t] = o.am(0, i[r], n, r, 0, o.t);
    n.s = 0,
    n.clamp(),
    this.s != t.s && e.ZERO.subTo(n, n)
},
MgjNumber.prototype.squareTo = function (t) {
    for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0;) t[n] = 0;
    for (n = 0; n < e.t - 1; ++n) {
        var o = e.am(n, e[n], t, 2 * n, 0, 1); (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, o, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV, t[n + e.t + 1] = 1)
    }
    t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
    t.s = 0,
    t.clamp()
},
MgjNumber.prototype.divRemTo = function (t, o, i) {
    var r = t.abs();
    if (! (r.t <= 0)) {
        var s = this.abs();
        if (s.t < r.t) return null != o && o.fromInt(0),
        null != i && this.copyTo(i),
        !1;
        null == i && (i = n());
        var a = n(),
        u = this.s,
        c = t.s,
        p = this.DB - x(r[r.t - 1]);
        p > 0 ? (r.lShiftTo(p, a), s.lShiftTo(p, i)) : (r.copyTo(a), s.copyTo(i));
        var l = a.t,
        h = a[l - 1];
        if (0 != h) {
            var f = h * (1 << this.F1) + (l > 1 ? a[l - 2] >> this.F2: 0),
            d = this.FV / f,
            v = (1 << this.F1) / f,
            g = 1 << this.F2,
            m = i.t,
            w = m - l,
            y = null == o ? n() : o;
            for (a.dlShiftTo(w, y), i.compareTo(y) >= 0 && (i[i.t++] = 1, i.subTo(y, i)), e.ONE.dlShiftTo(l, y), y.subTo(a, a); a.t < l;) a[a.t++] = 0;
            for (; --w >= 0;) {
                var b = i[--m] == h ? this.DM: Math.floor(i[m] * d + (i[m - 1] + g) * v);
                if ((i[m] += a.am(0, b, i, w, 0, l)) < b) for (a.dlShiftTo(w, y), i.subTo(y, i); i[m] < --b;) i.subTo(y, i)
            }
            null != o && (i.drShiftTo(l, o), u != c && e.ZERO.subTo(o, o)),
            i.t = l,
            i.clamp(),
            p > 0 && i.rShiftTo(p, i),
            u < 0 && e.ZERO.subTo(i, i)
        }
    }
},
MgjNumber.prototype.invDigit = function () {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var e = 3 & t;
    return e = e * (2 - (15 & t) * e) & 15,
    e = e * (2 - (255 & t) * e) & 255,
    e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
    e = e * (2 - t * e % this.DV) % this.DV,
    e > 0 ? this.DV - e: -e
},
MgjNumber.prototype.isEven = function() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
},
MgjNumber.prototype.exp = function (t, o) {
    if (t > 4294967295 || t < 1) return e.ONE;
    var i = n(),
    r = n(),
    s = o.convert(this),
    a = x(t) - 1;
    for (s.copyTo(i); --a >= 0;) if (o.sqrTo(i, r), (t & 1 << a) > 0) o.mulTo(r, s, i);
    else {
        var u = i;
        i = r,
        r = u
    }
    return o.revert(i)
},
MgjNumber.prototype.toString = function(t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var e;
    if (16 == t) e = 4;
    else if (8 == t) e = 3;
    else if (2 == t) e = 1;
    else if (32 == t) e = 5;
    else {
        if (4 != t) return this.toRadix(t);
        e = 2
    }
    var n, o = (1 << e) - 1,
    i = !1,
    r = "",
    s = this.t,
    u = this.DB - s * this.DB % e;
    if (s-->0) for (u < this.DB && (n = this[s] >> u) > 0 && (i = !0, r = a(n)); s >= 0;) u < e ? (n = (this[s] & (1 << u) - 1) << e - u, n |= this[--s] >> (u += this.DB - e)) : (n = this[s] >> (u -= e) & o, u <= 0 && (u += this.DB, --s)),
    n > 0 && (i = !0),
    i && (r += a(n));
    return i ? r: "0"
},
MgjNumber.prototype.negate = function() {
    var t = n();
    return e.ZERO.subTo(this, t),
    t
},
MgjNumber.prototype.abs = function () {
    return this.s < 0 ? this.negate() : this
},
MgjNumber.prototype.compareTo = function (t) {
    var e = this.s - t.s;
    if (0 != e) return e;
    var n = this.t;
    if (0 != (e = n - t.t)) return this.s < 0 ? -e: e;
    for (; --n >= 0;) if (0 != (e = this[n] - t[n])) return e;
    return 0
},
MgjNumber.prototype.bitLength = function () {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + x(this[this.t - 1] ^ this.s & this.DM)
},
MgjNumber.prototype.mod = function (t) {
    var o = n();
    return this.abs().divRemTo(t, null, o),
    this.s < 0 && o.compareTo(e.ZERO) > 0 && t.subTo(o, o),
    o
},
MgjNumber.prototype.modPowInt = function (t, e) {
    var n;
    return n = t < 256 || e.isEven() ? new _(e) : new P(e),
    this.exp(t, n)
},
MgjNumber.ZERO = l(0),
MgjNumber.ONE = l(1),



function l(t){
    var e = n();
    return e.fromInt(t),
    e 
}



function T(){

}
T.prototype.JSEncrypt =  function(t) {
    t = t || {},
    this.default_key_size = parseInt(t.default_key_size) || 1024,
    this.default_public_exponent = t.default_public_exponent || "010001",
    this.log = t.log || !1,
    this.key = null
};