(function() {
    var data = [], maximum = 200;
    window.getRandomData = function getRandomData() {
        if (data.length) 
            data = data.slice(1);
        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        var res = [];
        for (var i = 0; i < data.length; ++i)
        res.push([i, data[i]])
        return res;
    }
}());
