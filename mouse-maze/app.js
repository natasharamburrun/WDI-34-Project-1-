$(()=> {

  const grid = [
    [9,9,9,9,9,0,9,9,9,9,9],
    [0,0,0,0,0,0,0,0,0,0,0],
    [9,9,0,9,9,0,9,9,0,9,9],
    [9,9,0,9,9,0,9,9,0,9,9],
    [9,9,0,9,9,0,9,9,0,9,9],
    [0,0,0,0,0,1,0,0,0,0,0],
    [9,0,9,0,9,0,9,0,9,0,9],
    [9,0,9,0,9,0,9,0,9,0,9],
    [9,0,9,0,9,0,9,0,9,0,9],
    [0,0,0,0,0,0,0,0,0,0,0],
    [9,9,9,9,9,0,9,9,9,9,9]
  ];

  $('#maze').on('mouseover', 'div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  $.each(grid,(i,row) => {
    $.each(row,(j,cell) => {
      const $element = $('<div />');

      if(cell === 0){
        $element.addClass('path');
        //cell 0 is path
      } else if (cell === 1){
        $element.addClass('mouse');
        // cell 1 is mouse
      } else if (cell === 9){
        $element.addClass('blank');
        // cell 9 is blank
      }
      $element.data({x: i, y: j});

      $element.on('click', function(){
        console.log($(this).data());
      });
      $element.appendTo('#maze');
    });
  });

  $(document).on('keydown', function(e){
    switch(e.which){
      case 38:
        console.log('up');
        break;
      case 39:
        console.log('right');
        break;
      case 40:
        console.log('down');
        break;
      case 37:
        console.log('left');
        break;
    }
  });



  //Add up, down, right and left movements
  // move the classes on the divs ie player1 and floor start with [1] to [0]
  // only able to use pathways
  // function moveClasses of divs (arr, fromIndex, toIndex){
});
