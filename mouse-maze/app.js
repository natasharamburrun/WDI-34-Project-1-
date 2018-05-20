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

  let playerLocation ={};

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
        playerLocation = {x: i, y: j};
        grid[playerLocation.x][playerLocation.y] = 0;
        // cell 1 is mouse
      } else if (cell === 9){
        $element.addClass('wall');
        // cell 9 is blank
      }
      $element.attr('data-x', i);
      $element.attr('data-y', j);

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
        if (grid[playerLocation.x-1][playerLocation.y] === 0){
          playerLocation.x-=1;
          moveDirection();
        }
        break;
      case 39:
        console.log('right');
        if (grid[playerLocation.x][playerLocation.y+1] === 0){
          playerLocation.y+=1;
          moveDirection();
        }
        break;
      case 40:
        console.log('down');
        if (grid[playerLocation.x+1][playerLocation.y] === 0){
          playerLocation.x+=1;
          moveDirection();
        }
        break;
      case 37:
        console.log('left');
        if (grid[playerLocation.x][playerLocation.y-1] === 0){
          playerLocation.y-=1;
          moveDirection();
        }
        break;
    }
  });
  function moveDirection(){
    $('.mouse').removeClass('mouse').addClass('path');
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('path').addClass('mouse');
  }
  //Add up, down, right and left movements
  // move the classes on the divs ie player1 and floor start with [1] to [0]
  // only able to use pathways
  // function moveClasses of divs

});
