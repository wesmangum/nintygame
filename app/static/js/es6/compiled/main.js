(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('body').on('click', 'button', submitScore);
  }
  function submitScore() {
    var name = $('#initials').val().toUpperCase();
    var score = $('#score').val();
    var character = $('#character').val();
    ajax('/submit', 'post', {
      name: name,
      score: score,
      character: character
    }, (function(response) {
      $('#highscore').empty().css('visibility', 'hidden');
      $('#leaderboard').empty().append(response);
    }), 'html');
  }
})();

//# sourceMappingURL=main.map
