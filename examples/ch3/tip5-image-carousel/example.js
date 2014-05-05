(function() {
    
    $("#carousel").on('mouseover', pause);
    $("#carousel").on('mouseout', start);

    var position = 0;
    var all = $("#carousel").find('.image');
    var total = all.length;


    var angle = (360 / total);
    var deg2radfac = 2 * Math.PI / 360;
    var zMovement = $("#rotator").width() / 2 * Math.tan(deg2radfac * angle / 2);
    all.each(function(k) {
        var trans = 'rotateY(' + (angle * k).toFixed(0) + 'deg) ' 
            + 'translateZ('+ zMovement.toFixed(0) + 'px)';
        $(this).css('transform', trans);
    });
    $("#rotator").css('transform', 'translateZ('+ (0 - zMovement).toFixed(0) + 'px)');

    for (var k = 0; k < all.length; ++k) {
        $('<span />').attr('data-id', k).appendTo("#controls");
    }
    $("#controls").on('click', 'span', function() {
        changeTo(position = $(this).attr('data-id'));
    });
    ctrls = $("#controls span");    
    start();

    function change(dir) {
        dir = dir || 1;
        position += dir;
        if (position >= all.length) position = 0;
        else if (position < 0) position = 0;
        changeTo(position);
    }
    function changeTo(position, cb) {
        ctrls.css({'opacity': 0.33});
        ctrls.eq(position).css({'opacity': 1});
        $("#rotator").css('transform', 
                'translateZ('+ (0 - zMovement).toFixed(0) + 'px) ' +
                'rotateY(' + (angle * position).toFixed() + 'deg) ');
    }

    function start() { timer = setInterval(change, 5000); }

    function pause() { if (timer) { clearInterval(timer); timer = null; } }

}());

