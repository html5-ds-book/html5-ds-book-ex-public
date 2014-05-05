$(function() {
    function isCommon(pass) {
        return ~window.commonPasswords.indexOf(pass);
    }

    function bruteMagnitude(pass) {
        var sets = [
            { regex: /\d/g, size: 10 },
            { regex: /[a-z]/g, size: 26 },
            { regex: /[A-Z]/g, size: 26 },
            { regex: /[!-/:-?\[-`{-}]/g, size: 24 },
        ];
        var passlen = pass.length,
            szSet = 0;

        sets.forEach(function(set) {
            if (set.regex.test(pass)) {
                szSet += set.size;
                pass = pass.replace(set.regex, '');
            }
        });
        // other (unicode) characters
        if (pass.length) szSet += 20;
        return passlen * Math.log(szSet) / Math.LN10;
    }

    var strengths = ['very poor', 'poor', 'passing', 'fair',
        'good', 'very good', 'excellent'];

    function strength(pass) {
        if (isCommon(pass) || !pass.length) return 0;
        var str = bruteMagnitude(pass);
        return str < 7  ? 0 // very poor
             : str < 9  ? 1 // poor      - 10 million - 1 billion
             : str < 11 ? 2 // passing   - 1 billion - 100 billion
             : str < 13 ? 3 // fair      - 100 billion - 10 trillion
             : str < 15 ? 4 // good      - 10 trillion - 1 quadrillion
             : str < 17 ? 5 // very good - 1-100 quadrillion
             : 6;           // excellent - over 100 quadrillion
    }

    $('#pass').on('keyup keypress', function() {
        var pstrength = strength($(this).val());
        $("#strength").text(pstrength + ' (' + strengths[pstrength] + ')');
    });
});

