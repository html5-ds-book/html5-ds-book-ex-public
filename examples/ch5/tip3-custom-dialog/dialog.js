(function() {
    this.dialog = function(template, data, bindings) {
        var holder = $("<div />").addClass('dialog').addClass(template);
        var titlebar = $("<div />").addClass('title').appendTo(holder);
        var titletext = $("<span />").addClass('titletext').appendTo(titlebar);
        var close = $("<span />").addClass('close').html('x').appendTo(titlebar);
        var form = $("<form />").addClass('dialog').appendTo(holder);
        
        form.html(tmpl(template, data));
        $(titletext).text(data.title || "Dialog");

        holder.appendTo('body');

        for (var key in bindings) if (bindings.hasOwnProperty(key)) (function(key) {
            var selectorEvent = key.split(/\s+=>\s+/);
            form.find(selectorEvent[0]).on(selectorEvent[1], function() {
                var args = [].slice.call(arguments);
                args.unshift(self);
                bindings[key].apply(this, args);
            });
        }(key));

        var self = {};
        self.find = form.find.bind(form);
        self.data = function() {
            var obj = {};
            form.serializeArray().forEach(function(item) {
                if (obj[item.name]) {
                    if (!(obj[item.name] instanceof 'array')) 
                        obj[item.name] = [ obj[item.name] ];
                    obj[item.name].push(item.value);
                }
                else obj[item.name] = item.value;
            });
            return obj;
        }
        self.close = function() { holder.trigger('dialog:close'); holder.remove(); };
        self.on = holder.on.bind(holder);
        close.on('click', self.close);
        return self;

    };
}());


