angular.module('storage', []).factory('Storage', function() {
    var self = {};
    self.get = function get(id) {
        var page = localStorage["page-"+id];
        if (page) return JSON.parse(page);
        else return {id: id, text: null};
    };
    self.save = function save(page) {
        var stringified = JSON.stringify(page);
        localStorage["page-"+page.id] = stringified;
    };
    return self;
});

