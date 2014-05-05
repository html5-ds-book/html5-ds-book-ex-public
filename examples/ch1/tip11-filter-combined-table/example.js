(function() {
    $.extend($.fn.dataTableExt.oSort, {
        "lastname-sort-pre": function (a) {
            return a.split(' ').reverse().join(' ');
        },
        "lastname-sort-asc": function(a, b) { return a < b ? -1 : a > b ? 1 : 0; },
        "lastname-sort-desc": function(a, b) { return a > b ? -1 : a < b ? 1 : 0; },
        "unitnumber-pre": function(a) { return new Number(a.split(' ')[0]); },
        "unitnumber-asc": function(a, b) { return a - b; },
        "unitnumber-desc": function(a, b) { return b - a; }
    } )
    var fetchData = function(callback) {
        var data = [
            [1,'Louis Garland', 12, 32, 'Walking'],
            [2,'Misty Lamar',32, 42, 'Bus'],
            [3,'Steve Ernest',32, 12, 'Cycling'],
            [4,'Marcia Reinhart',42, 180, 'Bus'],
            [5,'Lydia Rouse',35, 31, 'Driving'],
            [6,'Sean Kasten',80,42, 'Driving'],
            [7,'Patrick Sharkey',65,43, 'Cycling'],
            [8,'Becky Rashid',63, 51, 'Bus'],
            [9,'Michael Fort',34, 23, 'Walking'],
            [10,'Genevieve Blaine',55, 11, 'Walking'],
            [11,'Victoria Fry',58, 14, 'Walking'],
            [12,'Donald Mcgary',34, 15, 'Cycling'],
            [13,'Daniel Dreher',16, 23, 'Walking'],
            [14,'Valerie Santacruz',43, 35, 'Driving'],
            [15,'Jodi Bee',23, 13, 'Walking'],
            [16,'Jo Montana',14, 31, 'Cycling'],
            [17,'Stephanie Keegan',53, 24, 'Driving'],
            [18,'Philip Dewey',12, 29, 'Cycling'],
            [19,'Jack Clemons',11, 44, 'Walking'],
            [20,'Steve Serna',14, 60, 'Cycling']
        ];
        callback({data:data});
    };
    window.myTable = {};
    var table = window.myTable.table = $("#demo").dataTable({
        'bLengthChange': false, 'bFilter': false,
        'iDisplayLength': 10,
        'aoColumnDefs':[{
            aTargets: [3], // distance
            mRender: function(data) { return data + ' km'; },
            sType: 'unitnumber'
        }, {
            aTargets: [1],
            sType: 'lastname-sort'
        }]
    });
    var setData = window.myTable.setData = function(data) {
        table.fnClearTable();
        table.fnAddData(data);
        table.fnDraw();
    };

   $(function() {
       fetchData(function(result) {
           window.myTable.data = result.data;
           setData(result.data);
           $("#demo").trigger("table:data");
       });
    });

}());
