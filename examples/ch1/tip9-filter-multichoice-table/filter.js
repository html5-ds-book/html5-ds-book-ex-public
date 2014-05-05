(function() {
    function getUnique(data, column) {
        var unique = [];
        data.forEach(function(row) { 
            if (unique.indexOf(row[column]) < 0) unique.push(row[column]); });
        return unique;
    }

    function choiceFilter(valueList, col) {
        return function filter(el) {
            return valueList.indexOf(el[col]) >= 0;
        }
    }

    $("#demo").on('table:data', function() {
        console.log("table:data");
        getUnique(window.myTable.data, 4).forEach(function(item) {
            $("<option />").attr('value', item).html(item).appendTo("#list");
        });
    });

    $("#list").change(function() {
        var filtered = window.myTable.data.filter(choiceFilter($("#list").val(), 4));
        window.myTable.setData(filtered);
    });
}());

