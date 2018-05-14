var Se = 0xdeadbeefcafe;
var Te = 30;//26
var DM = (1 << Te) - 1;

function fe(t) {
    var e = ce(t, this.n.bitLength() + 7 >> 3);
    if (null == e) return null;
    var n = doPublic(e);
    if (null == n) return null;
    var o = n.toString(16);
    return 0 == (1 & o.length) ? o: "0" + o
}


function doPublic(t) {
    return t.modPowInt(this.e, this.n)
}

function modPowInt(t, e) {
    var n;
    return n = t < 256 || e.isEven() ? new _(e) : new P(e),
    this.exp(t, n)
}

function bitLength() {
    return this.t <= 0 ? 0 : Te * (this.t - 1) + x(this[this.t - 1] ^ this.s & this.DM)
}

function ce(t, n) {
    if (n < t.length + 11) return console.error("Message too long for RSA"),
    null;
    for (var o = new Array,
    i = t.length - 1; i >= 0 && n > 0;) {
        var r = t.charCodeAt(i--);
        r < 128 ? o[--n] = r: r > 127 && r < 2048 ? (o[--n] = 63 & r | 128, o[--n] = r >> 6 | 192) : (o[--n] = 63 & r | 128, o[--n] = r >> 6 & 63 | 128, o[--n] = r >> 12 | 224)
    }
    o[--n] = 0;
    for (var s = new ae,
    a = new Array; n > 2;) {
        for (a[0] = 0; 0 == a[0];) s.nextBytes(a);
        o[--n] = a[0]
    }
    return o[--n] = 2,
    o[--n] = 0,
    new e(o)
}