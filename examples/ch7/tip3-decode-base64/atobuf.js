(function(exports) {
    var key = {};
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        .split('').forEach(function(c, i) {
            key[c] = i;
        });

    exports.atobuf = function atobuf(b64str) { 
        var b64l = b64str.length,
            bytes = b64l / 4 * 3;
        if (b64str[b64str.length - 1] == '=') bytes -= 1;
        if (b64str[b64str.length - 2] == '=') bytes -= 1;

        var buf = new ArrayBuffer(bytes), 
            arr = new Uint8Array(buf),
            at = 0;

        for (var k = 0; k < bytes; k+=3) {
            var e1 = key[b64str[at++]],
                e2 = key[b64str[at++]],
                e3 = key[b64str[at++]],
                e4 = key[b64str[at++]];

            var b1 = (e1 << 2) | (e2 >> 4),
                b2 = ((e2 & 0xF) << 4) | (e3 >> 2),
                b3 = ((e3 & 0x3) << 6) | e4;

            arr[k] = b1;
            if (k+1<bytes) arr[k+1] = b2;
            if (k+2<bytes) arr[k+2] = b3;
        }

        return buf;
    };

}(typeof(exports) !== 'undefined' ? exports : this));


