var testing = (function (me) {

  me.data1k =  new Array(1025).join("a"); // about 1k
  me.data100k = new Array((1024*100)+1).join("b");// about 100k

  me.run = function (max, data) {
    var el = document.getElementById('status');
    el.setAttribute('max', max);
      try {
        for (i = 0; i < max; i++) {
            console.log(i);
            el.setAttribute('value', 1+i);
            localStorage.setItem(i ,data);
        }
      } catch (err) {
        maxReached(i, err);
      }
  }

  me.clear = function() {
    var progress = document.getElementById('status');
    progress.setAttribute('value','0');
    localStorage.clear();
    console.log("removed all data from localstorage");
  }

  function maxReached(i, err) {
    console.log("max reached");
    console.log(err);
    var div = document.getElementById('max');
    div.innerHTML = "Reached max " + i + " entry";
  }

  return me;
}(testing || {} ));
