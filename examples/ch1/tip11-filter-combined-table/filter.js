(function() {
    function getUnique(data, column) {
        var unique = [];
        data.forEach(function(row) { 
            if (unique.indexOf(row[column]) < 0) unique.push(row[column]); });
        return unique;
    }
    function choiceFilter(valueList, col) {
        return function filter(el) { return valueList.indexOf(el[col]) >= 0; }
    }
    function number(n, def) {
        if (n == '') return def;
        n = new Number(n);
        if (isNaN(n)) return def;
        return n;
    }
    function rangeFilter(start, end, col) {
        var start = number(start, -Infinity),
            end = number(end, Infinity);
        return function filter(el) { return start < el[col] && el[col] < end; }
    }
    function textFilter(txt, col) {
        return function filter(el) {
            return el[col].indexOf(txt) >= 0;
        }
    }
    $("#demo").on('table:data', function() {
        getUnique(window.myTable.data, 4).forEach(function(item) {
            $("<option />").attr('value', item).html(item).appendTo("#list");
        });
    });
    var filters = [null, null, null];
    $("#list").change(function() { filters[0] = choiceFilter($("#list").val(), 4); filterAndShow(); });
    $("#range1,#range2").on('change keyup', function() {
        filters[1] = rangeFilter($("#range1").val(), $("#range2").val(), 2); filterAndShow();
    });
    $("#name").on('change keyup', function() {
        filters[2] = textFilter($("#name").val(), 1); filterAndShow();
    });
    function filterAndShow() {
        var filtered = window.myTable.data;
        filters.forEach(function(filter) { if (filter) filtered = filtered.filter(filter); });
        window.myTable.setData(filtered);
    };
}());

