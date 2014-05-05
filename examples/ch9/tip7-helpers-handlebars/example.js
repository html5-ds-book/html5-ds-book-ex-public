$(function() {    

    Handlebars.registerHelper('ul', function(items, options) {
        if (items .length) return '<ul>' + items.map(function(item) { 
            return '<li>' + options.fn(item) + '</li>';  
        }).join('') + '</ul>'
        else 
            return options.inverse(this);
    });

    Handlebars.registerHelper('img', function(src, options) {
        return new Handlebars.SafeString('<img src="' + src 
            + '" alt="'+ (options.hash['alt'] || '') 
            + '" title="'+ (options.hash['title'] || '') 
            + '">');
    });

    var template = Handlebars.compile($('#template').html());

    $('#list').html(template({list:[
        { name: 'John',  image: '1.png'},
        { name: 'Jack',  image: '2.jpg'},
        { name: 'Jenny', image: '3.jpg'},
    ]}));
});

