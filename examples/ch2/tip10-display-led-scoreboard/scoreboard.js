jQuery(document).ready(function() {
  var config = {
    refreshSec: 1,
    periods: 4,
    minPerPeriod: 12
  };

  function fetchNewData() {
    // server data
    var game = {
      periodStart: new Date().getTime(),
      //the server will retrun data like: periodStart: 1354838410000,
      currentPeriod: 1,
      score: {
        home: 15,
        guests: 10
      }
    };
    //retun display data
    return {
      periodStart: game.periodStart,
      counter: '00:00',
      period: game.currentPeriod + ' Period',
      score: {
        home: game.score.home,
        guests: game.score.guests
      }
    };
  }

  var displayData = fetchNewData();

  function updateScore(){
    $('.home').text(displayData.score.home);
    $('.guests').text(displayData.score.guests);
  }

  function updateCounter() {
    var now = new Date(),
        millsPassed = now.getTime() - displayData.periodStart;

    if (millsPassed < 0) {
      displayData.counter = '00:00';
    } else if (millsPassed > config.minPerPeriod * 60 * 1000) {
      displayData.counter = config.minPerPeriod + ':00';
    } else {
      //counting normal time
      var min = Math.floor(millsPassed/60000);
      if (min<10) {
        min = '0' + min;
      }
      var sec = Math.floor((millsPassed % 60000)/1000);
      if (sec<10) {
        sec = '0'+sec;
      }
      displayData.counter = min+':'+sec;
    }
    $('.counter').text(displayData.counter);
    $('.period').text(displayData.period);
  }

  setInterval(updateCounter, 500);
  setInterval(updateScore, 500);
});
