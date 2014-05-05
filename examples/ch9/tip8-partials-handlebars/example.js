$(function() {    

    Handlebars.registerPartial('thread', $("#thread-template").html());

    var template = Handlebars.compile($('#template').html());

    $('#list').html(template({ 
        topic: "The topic of this conversation",
        from: 'John',  
        image: '1.png', text: "I wrote some text", 
        date: 'Yesterday',
        replies:[
            {from: 'Jack', 
                image: '2.jpg', 
                text: "My response to your text is favorable", 
                date: 'Today' , 
                replies: [
                    {from: 'John', 
                        image: '1.png', 
                        text: "Thank you kindly", 
                        date: 'Today'}
                ]},
            {from: 'Jenny', 
                image: '3.jpg', 
                text: "I'm also going to chime in", 
                date: 'Today' }
        ]}));
});

