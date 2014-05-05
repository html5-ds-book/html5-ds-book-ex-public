$(function() {
    $("#text").on('keyup keypress', function() {
        var base64 = btoa($(this).val()),
            buf = atobuf(base64),
            bytes = new Uint8Array(buf),
            byteString = [].join.call(bytes, ' ');
        $("#base64").text(base64);
        $("#bytes").text(byteString);
    });
});
