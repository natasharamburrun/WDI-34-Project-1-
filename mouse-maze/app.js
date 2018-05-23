$(()=> {

  let grid = [
    [9,9,9,9,9,9,9,2,9,9,9,9,9,9,9],
    [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2],
    [9,9,9,0,9,9,9,2,9,9,9,0,9,9,9],
    [9,9,9,2,9,9,9,0,9,9,9,2,9,9,9],
    [9,9,9,6,9,9,9,2,9,9,9,5,9,9,9],
    [9,9,9,2,9,9,9,0,9,9,9,2,9,9,9],
    [9,9,9,0,9,9,9,0,9,9,9,0,9,9,9],
    [0,2,0,2,0,2,0,1,0,2,0,2,0,2,0],
    [9,9,2,9,2,9,9,0,9,9,2,9,2,9,9],
    [9,9,0,9,0,9,9,0,9,9,0,9,0,9,9],
    [9,9,2,9,2,9,9,2,9,9,2,9,2,9,9],
    [9,9,0,9,0,9,9,7,9,9,0,9,0,9,9],
    [9,9,2,9,2,9,9,2,9,9,2,9,2,9,9],
    [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2],
    [9,9,9,9,9,9,9,2,9,9,9,9,9,9,9]
  ];
  //grid 14 by 14
  //Player mouse cell 1, path cell 0, walls cell 9
  //cheese cell 2, repellent 3
  //computer cat cell 5

  let playerMovement = {};
  let cat1CellPosition = {};
  let cat2CellPosition = {};
  let cat3CellPosition = {};
  const catDirection = ['up','down','left','right'];
  let direction = 'up';
  // let scoreBoard = 0;
  let levelCounter = 3;


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
          $element.addClass('cat1');
          cat1CellPosition = {x: i, y: j};
          grid[cat1CellPosition.x][cat1CellPosition.y] = 0;
        } else if (cell === 6){
          $element.addClass('cat2');
          cat2CellPosition = {x: i, y: j};
          grid[cat2CellPosition.x][cat2CellPosition.y] = 0;
        } else if (cell === 7) {
          $element.addClass('cat3');
          cat3CellPosition = {x: i, y: j};
          grid[cat3CellPosition.x][cat3CellPosition.y] = 0;
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



  $(document).on('keydown', function(e){
    const x = playerMovement.x;
    const y = playerMovement.y;

    let checkSquareX = x, checkSquareY = y;
    let $checkSq;

    function getDiv() {
      return $(`div[data-x='${checkSquareX}'][data-y='${checkSquareY}']`);
    }
    const $playMove = getDiv();
    // let $caughtMouse;
    //
    //
    // function catchMouse(){
    //   if (cat1.hasClass('mouse') || cat2.hasClass('mouse') || cat3.hasClass('mouse')){
    //     console.log('caught');
    //     levelCounter--;
    //     //check life if mouseLife < 0
    //     //     if(levelCounter < 0) {
    //     //       //gameOver!!
    //   }
    // }

    // function checkMousePath(){
    //   if($playMove.hasClass('cat1') || $playMove.hasClass('cat2') || $playMove.hasClass('cat3')){
    //     console.log('caught!');
    //     levelCounter--;
    //     //check life if mouseLife < 0
    //     if(levelCounter < 0) {
    //       //gameOver!!
    //     }
    //   }
    // }

    function movePlayer(){
    //replace mouse placement with paveway
      $('.mouse').removeClass('mouse').addClass('path');
      //movePlayer function is there to enable the mouse to access the pathways and pick up treats and repellent
      $(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).removeClass('treat').removeClass('repellent').addClass('mouse');
    }
    //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
    // playerMovement enables the mouse to move using the key up
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
          // catchMouse();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key right
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
          // catchMouse();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key down
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
          // catchMouse();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key left
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
          // catchMouse();
        }
        break;
    }
  });
  // function positionOfCatOne(){
  //   return $catPosition = $(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`);
  // }
  function moveCats(newPosition, oldPosition, cat){
    if($(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).hasClass('wall')) {
      // don't move
      // console.log('bump');
      return null;
    } else {
      // No wall. We're free to move
      // remove cat from old square
      if($(`div[data-x='${oldPosition.x}'][data-y='${oldPosition.y}']`).removeClass(cat).addClass('path'));
      // add cat at new position
      $(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).removeClass('path').addClass(cat);
      // update cat position
      return 'moved';
    }
  }

  window.setInterval(function(){
    //automated cats to move around the grid. Direction of travel is detemined randomly by computer
    direction = catDirection[Math.floor(Math.random() * catDirection.length)];

    const newPosition = {};
    newPosition.x = cat1CellPosition.x;
    newPosition.y = cat1CellPosition.y;
    switch(direction) {
      //change the direction of the cats travel to up
      case 'up':
        newPosition.x -= 1;
        //stops cats from traveling past the grid parameters
        if (newPosition.x < 0) newPosition.x = 14;
        if (moveCats(newPosition, cat1CellPosition, 'cat1')) cat1CellPosition = newPosition;
        break;
        //change the direction of the cats travel to right
      case 'right':
        newPosition.y += 1;
        //stops cats from traveling past the grid parameters
        if (newPosition.y > 14) newPosition.y = 0;
        if (moveCats(newPosition, cat1CellPosition, 'cat1')) cat1CellPosition = newPosition;
        break;
        //change the direction of the cats travel to down
      case 'down':
        newPosition.x += 1;
        //stops cats from traveling past the grid parameters
        if (newPosition.x > 14) newPosition.x = 0;
        if (moveCats(newPosition, cat1CellPosition, 'cat1')) cat1CellPosition = newPosition;
        break;
        //change the direction of the cats travel to left
      case 'left':
        newPosition.y -= 1;
        //stops cats from traveling past the grid parameters
        if (newPosition.y < 0) newPosition.y = 14;
        if (moveCats(newPosition, cat1CellPosition, 'cat1')) cat1CellPosition = newPosition;
        break;
    }
  }, 200);



  window.setInterval(function(){
    //automated cats to move around the grid. Direction of travel is detemined randomly by computer
    direction = catDirection[Math.floor(Math.random() * catDirection.length)];
    const newPosition = {};
    newPosition.x = cat2CellPosition.x;
    newPosition.y = cat2CellPosition.y;
    switch(direction) {
      case 'up':
        newPosition.x -= 1;
        if (newPosition.x < 0) newPosition.x = 14;
        if (moveCats(newPosition, cat2CellPosition, 'cat2')) cat2CellPosition = newPosition;
        break;

      case 'right':
        newPosition.y += 1;
        if (newPosition.y > 14) newPosition.y = 0;
        if (moveCats(newPosition, cat2CellPosition, 'cat2')) cat2CellPosition = newPosition;
        break;

      case 'down':
        newPosition.x += 1;
        if (newPosition.x > 14) newPosition.x = 0;
        if (moveCats(newPosition, cat2CellPosition, 'cat2')) cat2CellPosition = newPosition;
        break;

      case 'left':
        newPosition.y -= 1;
        if (newPosition.y < 0) newPosition.y = 14;
        if (moveCats(newPosition, cat2CellPosition, 'cat2')) cat2CellPosition = newPosition;
        break;
    }
  }, 200);


  window.setInterval(function(){
    //automated cats to move around the grid. Direction of travel is detemined randomly by computer
    direction = catDirection[Math.floor(Math.random() * catDirection.length)];
    const newPosition = {};
    newPosition.x = cat3CellPosition.x;
    newPosition.y = cat3CellPosition.y;

    switch(direction) {

      case 'up':
        newPosition.x -= 1;
        if (newPosition.x < 0) newPosition.x = 14;
        if (moveCats(newPosition, cat3CellPosition, 'cat3')) cat3CellPosition = newPosition;
        break;

      case 'right':
        newPosition.y += 1;
        if (newPosition.y > 14) newPosition.y = 0;
        if (moveCats(newPosition, cat3CellPosition, 'cat3')) cat3CellPosition = newPosition;
        break;

      case 'down':
        newPosition.x += 1;
        if (newPosition.x > 14) newPosition.x = 0;
        if (moveCats(newPosition, cat3CellPosition, 'cat3')) cat3CellPosition = newPosition;
        break;

      case 'left':
        newPosition.y -= 1;
        if (newPosition.y < 0) newPosition.y = 14;
        if (moveCats(newPosition, cat3CellPosition, 'cat3')) cat3CellPosition = newPosition;
        break;
    }
  }, 200);
  //

// for postions - clear interval set to how long
  // });
  //add a function to make the character move only in the pathways
  //move the classes on the divs (moveClasses) ie player and pathway start with [1] to [0]
  //

  // start movement of the cat1 when a key is pressed ie (up) add event (possibly will include false and true statement which includes if up, right, left is pressed )
  // move cat1 same theory as moving mouse (ie up, down, left and right) but with set interval when hit wall will turn direction
  // set interval and stop cat1 when collision with a mouse or mouse has collected all cheese treats
  // cat1 to randomly patrol the pathway

});
