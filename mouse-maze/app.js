$(()=> {

  let grid = [
    [9,9,9,9,9,9,9,2,9,9,9,9,9,9,9],
    [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2],
    [9,9,9,0,9,9,9,2,9,9,9,0,9,9,9],
    [9,9,9,2,9,9,9,0,9,9,9,2,9,9,9],
    [9,9,9,0,9,9,9,2,9,9,9,5,9,9,9],
    [9,9,9,2,9,9,9,0,9,9,9,2,9,9,9],
    [9,9,9,0,9,9,9,0,9,9,9,0,9,9,9],
    [0,2,0,2,0,2,0,1,0,2,0,2,0,2,0],
    [9,9,2,9,2,9,9,0,9,9,2,9,2,9,9],
    [9,9,0,9,0,9,9,0,9,9,0,9,0,9,9],
    [9,9,2,9,2,9,9,2,9,9,2,9,2,9,9],
    [9,9,0,9,0,9,9,0,9,9,0,9,0,9,9],
    [9,9,2,9,2,9,9,2,9,9,2,9,2,9,9],
    [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2],
    [9,9,9,9,9,9,9,2,9,9,9,9,9,9,9]
  ];
  //grid 14 by 14
  //Player mouse cell 1, path cell 0, walls cell 9
  //cheese cell 2, repellent 3
  //computer cat cell 5

  let playerMovement = {};
  let catCellPosition = {};
  const catDirection = ['up','down','left','right'];
  let direction = 'up';


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
        } else if (cell === 5){
          $element.addClass('cats');
          catCellPosition = {x: i, y: j};
          grid[catCellPosition.x][catCellPosition.y] = 0;
        } else if(cell === 2){
          $element.addClass('treat path');
        } else if (cell === 3){
          $element.addClass('repellent path');
        }

        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.appendTo('#maze');
      });
    });
  }
  generateGrid();

  //Add up, down, right and left movements

  $(document).on('keydown', function(e){
    const x = playerMovement.x;
    const y = playerMovement.y;

    let checkSquareX = x, checkSquareY = y;
    let $checkSq;

    function getDiv(x, y) {
      return $(`div[data-x='${checkSquareX}'][data-y='${checkSquareY}']`);
    }
    let $playMove = getDiv(x, y);

    function movePlayer(){
      $('.mouse').removeClass('mouse').addClass('path');
      $(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).removeClass('treat').removeClass('repellent').addClass('mouse');
    }
    switch(e.which){
      case 38://up
        checkSquareX = x - 1;
        if (checkSquareX < 0) checkSquareX = 14;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.x -= 1;
          if($playMove.hasClass('wall')){
            playerMovement.x += 1;
            return null;
          }
          if(playerMovement.x < 0){
            playerMovement.x = 14;
          }
          movePlayer();
        }
        break;
      case 39://right
        checkSquareY = y + 1;
        if (checkSquareY > 14) checkSquareY = 0;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.y+= 1;
          if($playMove.hasClass('wall')){
            playerMovement.y-= 1;
            return null;
          }
          if(playerMovement.y > 14){
            playerMovement.y = 0;
          }
          movePlayer();
        }
        break;
      case 40://down
        checkSquareX = x + 1;
        if (checkSquareX > 14) checkSquareX = 0;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.x+= 1;
          if($playMove.hasClass('wall')){
            playerMovement.x-= 1;
            return null;
          }
          if(playerMovement.x > 14){
            playerMovement.x = 0;
          }
          movePlayer();
        }
        break;
      case 37://left
        checkSquareY = y - 1;
        if (checkSquareY < 0) checkSquareY = 14;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.y-= 1;
          if($playMove.hasClass('wall')){
            playerMovement.y+= 1;
            return null;
          }
          if(playerMovement.y < 0){
            playerMovement.y = 14;
          }
          movePlayer();
        }
        break;
    }
  });

  let cellX;
  let cellY;

  function moveCat(newPosition, oldPosition) {
    console.log(oldPosition, newPosition);
    // if wall
    if($(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).hasClass('wall')) {
      // don't move
      console.log('bump');
      return null;
    }
    else {
      // No wall. We're free to move
      // remove cat from old square
      $(`div[data-x='${oldPosition.x}'][data-y='${oldPosition.y}']`).removeClass('cats').addClass('path');
      // add cat at new position
      $(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).removeClass('path').addClass('cats');
      // update cat position
      return 'moved';
    }

  }

  window.setInterval(function(){
    direction = catDirection[Math.floor(Math.random() * catDirection.length)];
    console.log(direction);
    const newPosition = {};
    newPosition.x = catCellPosition.x;
    newPosition.y = catCellPosition.y;
    switch(direction) {
      case 'up':
        console.log('UP---->', direction);
        // if wall
        if($(`div[data-x='${catCellPosition.x - 1}'][data-y='${catCellPosition.y}']`).hasClass('wall')) {
          // don't move
          return null;
        }
        else {
          // No wall. We're free to move
          // remove cat from old square
          $(`div[data-x='${catCellPosition.x}'][data-y='${catCellPosition.y}']`).removeClass('cats').addClass('path');
          // update cat position
          catCellPosition.x -= 1;
          if (catCellPosition.x < 0) catCellPosition.x = 14;
          // add cat at new position
          $(`div[data-x='${catCellPosition.x}'][data-y='${catCellPosition.y}']`).removeClass('path').addClass('cats');
        }
        break;

      case 'right':
        newPosition.y += 1;
        if (newPosition.y > 14) newPosition.y = 0;
        if (moveCat(newPosition, catCellPosition)) catCellPosition = newPosition;
        break;

      case 'down':
        newPosition.x += 1;
        if (newPosition.x > 14) newPosition.x = 0;
        if (moveCat(newPosition, catCellPosition)) catCellPosition = newPosition;
        break;

      case 'left':
        newPosition.y -= 1;
        if (newPosition.y < 0) newPosition.y = 14;
        if (moveCat(newPosition, catCellPosition)) catCellPosition = newPosition;
        break;
    }

  }, 500);


  // });
  //add a function to make the character move only in the pathways
  //move the classes on the divs (moveClasses) ie player and pathway start with [1] to [0]
  //

  // start movement of the cats when a key is pressed ie (up) add event (possibly will include false and true statement which includes if up, right, left is pressed )
  // move cats same theory as moving mouse (ie up, down, left and right) but with set interval when hit wall will turn direction
  // set interval and stop cats when collision with a mouse or mouse has collected all cheese treats
  // cats to randomly patrol the pathway

});
