angular.module('todo').factory('DBTodo', function($rootScope) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange ||
        window.webkitIDBKeyRange || window.msIDBKeyRange;

    var self = {}, db = null;

    self.data = {error: null};
    function initialize(done) {
        //window.indexedDB.deleteDatabase("todos"); return;

        var req = window.indexedDB.open("todos", "1");
        var needsPopulate = false;
        req.onupgradeneeded = function(e) {
            db = e.currentTarget.result;
            var os = db.createObjectStore(
                "todos", {autoIncrement: true});
            os.createIndex(
                "date", "date", {unique: false});
            os.createIndex(
                "archived", "archived", {unique: false});
            needsPopulate = true;
        }
        req.onsuccess = function(e) {
            db = this.result;
            if (needsPopulate) populate(done);
            else done();
        };
        req.onerror = function(e) { 
            self.data.error = e.target.error; 
        };
    }


    function pickRandomText(k) {
        var texts = ["Buy groceries", 
            "Clean the car", 
            "Mow the lawn", 
            "Wash the dishes", 
            "Clean the room", 
            "Do some repairs"],
            selected = texts[(Math.random() * texts.length)
                .toFixed(0)];
            return selected + " " + k;
    }
    function populate(done) {
        var now = Date.now();
        var t = db.transaction('todos', 'readwrite');
        t.oncomplete = done;

        var tbl = t.objectStore('todos');
        var N = 50;
        for (var k = N; k > 0; --k) {
            tbl.add({
                text: pickRandomText(k), 
                date: Date.now() - (k / 2) * DAY, 
                archived: k > 5 ? 1 : 0,
                done: (k > 5 || Math.random() < 0.5) 
            });
        }
    }

    function withDB(fn) {
        return function() {
            var args = arguments, self = this;
            if (!db) initialize(function() {
                fn.apply(self, args);
            });
            else fn.apply(self, args);            
        };
    }

    function withScope(fn) {
        return function() {
            var args = arguments, self = this;
            $rootScope.$apply(function() {
                fn.apply(self, args);
            });
        };
    }

    self.getItems = withDB(function(from, to, cb) {
        var list = [];
        var index = db.transaction('todos')
            .objectStore('todos').index('date');
        var req = index.openCursor(IDBKeyRange.bound(from, to, true, true));
        req.onsuccess = function(e) {
            var cursor = e.target.result;
            if (!cursor)
                return withScope(function() { 
                    cb(null, list); 
                })();
            list.push(cursor.value);
            cursor.continue();
        };
    });

    self.updateItem = withDB(function(item, done) {
        var t = db.transaction('todos', 'readwrite'),
            ix = t.objectStore('todos').index('date'),
            req = ix.openCursor(IDBKeyRange.only(item.date));
        t.oncomplete = done && withScope(done);
        req.onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) cursor.update(item);
        };            
    });

    self.archive = withDB(function(done) {
        var current = IDBKeyRange.only(0);
        var t = db.transaction('todos', 'readwrite'),
            req = t.objectStore('todos')
            .index("archived")
            .openCursor(current);
        
        t.oncomplete = withScope(done);

        req.onsuccess = function(e) {
            var cursor = e.target.result;
            if (!cursor) return;
            if (cursor.value.done) { 
                cursor.value.archived = 1;
                cursor.update(cursor.value);
            }
            cursor.continue();
        };
 
    });

    self.addItem = withDB(function(item, done) {         
        var t = db.transaction('todos', 'readwrite'),
            os = t.objectStore('todos');
        t.oncomplete = withScope(done);
        os.add(item);
    });

    return self;
});

