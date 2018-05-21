$(()=> {

  const grid = [
    [9,9,9,9,9,0,9,9,9,9,9],
    [0,0,0,0,0,0,0,0,0,0,0],
    [9,9,0,9,9,0,9,9,0,9,9],
    [9,9,0,9,9,0,9,9,0,9,9],
    [9,9,0,9,9,0,9,9,0,9,9],
    [9,9,0,9,9,0,9,9,0,9,9],
    [0,0,0,0,0,1,0,0,0,0,0],
    [9,0,9,0,9,0,9,0,9,0,9],
    [9,0,9,0,9,0,9,0,9,0,9],
    [9,0,9,0,9,0,9,0,9,0,9],
    [9,0,9,0,9,0,9,0,9,0,9],
    [0,0,0,0,0,0,0,0,0,0,0],
    [9,9,9,9,9,0,9,9,9,9,9]
  ];
  //grid 11 by 13
  //Player mouse cell 1, path cell 0, walls cell 9

  let playerLocation ={};

  $('#maze').on('mouseover', 'div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  function generateGrid(){
    $.each(grid,(i,row) => {
      $.each(row,(j,cell) => {
        const $element = $('<div />');
        if(cell === 0){
          $element.addClass('path');
        } else if (cell === 1){
          $element.addClass('mouse');
          playerLocation = {x: i, y: j};
          grid[playerLocation.x][playerLocation.y] = 0;
        } else if (cell === 9){
          $element.addClass('wall');
        }
        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.appendTo('#maze');
      });
    //Add up, down, right and left movements
    });
  }
  generateGrid();
  // function movePlayer(){
  $(document).on('keydown', function(e){
    switch(e.which){
      case 38:
        if (grid[playerLocation.x][playerLocation.y] === 0){
          playerLocation.x-=1;
          moveDirection();
          if(playerLocation.x < 0){
            playerLocation.x = 12;
            $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('path').addClass('mouse');
          }
        }
        break;
      case 39:
        if (grid[playerLocation.x][playerLocation.y+1] === 0){
          playerLocation.y+=1;
          console.log('Location---->',grid[playerLocation.x][playerLocation.y+1]);
          moveDirection();
        }
        break;
      case 40:
        if (grid[playerLocation.x+1][playerLocation.y] === 0){
          playerLocation.x+=1;
          console.log('Location---->Down',playerLocation);
          moveDirection();
        }
        break;
      case 37:
        if (grid[playerLocation.x][playerLocation.y-1] === 0){
          playerLocation.y-=1;
          console.log('Location---->Left',playerLocation);
          moveDirection();
        }
        break;
    }
  });
  // }
  //add a function to make the character move only in the pathways
  //move the classes on the divs (moveClasses) ie player and pathway start with [1] to [0]
  function moveDirection(){
    $('.mouse').removeClass('mouse').addClass('path');
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('path').addClass('mouse');
  }
  //make mouse pathway extended array [0][10]
  //collect cheese function
  //collect cat repelent posion function
  //add 2 cats for level 1
  //

});
