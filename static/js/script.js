/* Author: YOUR NAME HERE
*/

$(document).ready(function() {

  var socket = io.connect();

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
    var col = $(this).attr("col");
    var row = $(this).parent().attr("row");
    var color = getRandomColor();
    $(this).css("background-color", color);
    socket.emit('message', col + ' ' + row + ' ' + color) ;
    console.log('emits message: ' + col + ' ' + row + ' ' + color);
  });

  socket.on('server_message', function(data){
    var strs = data.split(" ");
    var col = strs[0];
    var row = strs[1];
    var color = strs[2];
    $("[row=" + row + "] [col=" + col + "]").css("background-color", color);
    console.log('received message: ' + data);
  });
});