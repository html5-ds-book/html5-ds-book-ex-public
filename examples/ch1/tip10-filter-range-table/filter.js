(function() {
    function number(n, def) {
        if (n == '') return def;
        n = new Number(n);
        if (isNaN(n)) return def;
        return n;
    }
    function rangeFilter(start, end, col) {
        var start = number(start, -Infinity),
            end = number(end, Infinity);
        return function filter(el) {
            return start < el[col] && el[col] < end;
        }
    }
    $("#range1,#range2").on('change keyup', function() {
        var filtered = window.myTable.data.filter(
            rangeFilter($("#range1").val(), $("#range2").val(), 2));
        window.myTable.setData(filtered);
    });
}());

