/* Author: YOUR NAME HERE
*/

$(document).ready(function() {

  var board_gui = {
    create: function(x,y){

      var height = 100.0/y;
      var width = 100.0/x;

      for(var j = 0; j < y; j++)
        $(".board").append('<div class="row" row="' + j + '"></div>');

      $(".row").each(function(){
        $(this).css({ height: height + "%", width: "100%" });
        for(var i = 0; i < x; i++){
          $(this).append('<div class="col" col="' + i + '"></div>');
        }
      });

      $(".col").each(function(){
        $(this).css({ height: "100%", width: width + "%" });
      });
    }
  }

  board_gui.create(8,4);

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  $('.col').bind('click', function(){
    $(this).css("background-color", getRandomColor());
  });

  var socket = io.connect();

  $('#sender').bind('click', function() {
   socket.emit('message', 'Message Sent on ' + new Date());
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');
  });
});