$(function() {
    function parseDocument(text) {
        function displayElement(e) {
            var holder = $("<div />").addClass('element');
            $("<h3 />").text(e.nodeName).appendTo(holder);
            if (e.attributes && e.attributes.length) {
                var attrs = $("<div />").addClass('attributes')
                    .appendTo(holder);
                for (var a = 0; a < e.attributes.length; ++a) {
                    var nameval = e.attributes[a];
                    var attr = $("<div />").addClass('attribute')
                        .appendTo(attrs);
                    $('<span />').addClass('name')
                        .text(nameval.name).appendTo(attr);
                    $('<span />').addClass('value')
                        .text(nameval.value).appendTo(attr);
                }
            }
            if (e.childNodes.length) {
                var children = $("<div />").appendTo(holder)
                    .addClass('children');
                for (var c = 0; c < e.childNodes.length; ++c) {
                    var child = e.childNodes[c];
                    if (child.nodeType == Node.ELEMENT_NODE) 
                        displayElement(child).appendTo(children);
                    else if (child.nodeType == Node.TEXT_NODE
                          || chilc.nodeType == Node.CDATA_SECTION_NODE) 
                        $("<div />").addClass('text')
                            .text(child.textContent)
                            .appendTo(children);
                }
            }
            return holder;
        }
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'application/xml'); 
        window.doc = doc;
        return displayElement(doc.childNodes[0]);
    }
    function update() {
        $('#tree').html('')
        parseDocument($('textarea').val()).appendTo('#tree');
    }
    update();
    $('textarea').on('keyup change', update);
});

