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


  //grid 10 by 12
  //Player mouse cell 1, path cell 0, walls cell 9

  let playerMovement ={};

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
          playerMovement = {x: i, y: j};
          grid[playerMovement.x][playerMovement.y] = 0;
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
  
  function moveDirection(){
    $('.mouse').removeClass('mouse').addClass('path');
    $(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).removeClass('path').addClass('mouse');
  }
  // function movePlayer(){
  $(document).on('keydown', function(e){
    switch(e.which){
      case 38://up
        if (grid[playerMovement.x][playerMovement.y] === 0){
          playerMovement.x-=1;
          if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('wall')){
            playerMovement.x+=1;
            return null;
          }
          if(playerMovement.x < 0){
            playerMovement.x = 12;
          }
          moveDirection();
        }
        break;
      case 39://right
        if (grid[playerMovement.x][playerMovement.y] === 0){
          playerMovement.y+=1;
          if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('wall')){
            playerMovement.y-=1;
            return null;
          }
          if(playerMovement.y > 10){
            playerMovement.y = 0;
          }
          moveDirection();
        }
        break;
      case 40://down
        // if (grid[playerMovement.x][playerMovement.y > 12 ? playerMovement.y - 1 : 0] === 0){
        if (grid[playerMovement.x][playerMovement.y] === 0){
          playerMovement.x+=1;
          if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('wall')){
            playerMovement.x-=1;
            return null;
          }
          if(playerMovement.x > 12){
            playerMovement.x = 0;
          }
          moveDirection();
        }
        break;
      case 37://left
        // if (grid[playerMovement.x][playerMovement.y > 0 ? playerMovement.y - 1 : 10] === 0){
        if (grid[playerMovement.x][playerMovement.y] === 0){
          playerMovement.y-=1;
          if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('wall')){
            playerMovement.y+=1;
            return null;
          }
          if(playerMovement.y < 0){
            playerMovement.y = 10;
          }
          moveDirection();
        }
        break;
    }
  });
  //add a function to make the character move only in the pathways
  //move the classes on the divs (moveClasses) ie player and pathway start with [1] to [0]


  //make mouse pathway extended array [0][10]
  //collect cheese function
  //collect cat repelent posion function
  //add 2 cats for level 1
  //

});
