$(()=> {

  const grid = [
    [9,9,9,9,9,9,9,2,9,9,9,9,9,9,9],
    [2,0,2,0,2,0,2,0,2,0,2,0,2,0,2],
    [9,9,9,3,9,9,9,2,9,9,9,3,9,9,9],
    [9,9,9,2,9,9,9,0,9,9,9,2,9,9,9],
    [9,9,9,5,9,9,9,2,9,9,9,5,9,9,9],
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


  //moveCats
  // function checkMovement(){
  // case 'right':
  //   if(bearIndex%gridWidth !== gridWidth-1 && !cells[bearIndex+1].classList.contains('tree')) {
  //     cells[bearIndex].classList.remove('bear');
  //     bearIndex += 1;
  //     cells[bearIndex].classList.add('bear');
  //   } else {
  //     direction = bearPosition[Math.floor(Math.random() * bearPosition.length)];
  //     console.log(direction);
  //   }
  //   checkBear();
  //   break;


  window.setInterval(function(){
    let makeRandomDecision = false;
    switch(direction) {
      case 'up':
        if ($(`div[data-x='${catCellPosition.x + 1}'][data-y='${catCellPosition.y}']`).hasClass('cats')) {
          // path is clear!
          $(`div[data-x='${catCellPosition.x}'][data-y='${catCellPosition.y}']`).removeClass('cats').addClass('path');
          catCellPosition.x += 1;

          console.log(direction);
        } else {
          // cat is blocked!
          makeRandomDecision = true;
        }
        break;
    }
    if (makeRandomDecision) {
      direction = catDirection[Math.floor(Math.random() * catDirection.length)];
      console.log(direction);
    }
  }, 1000);

  // checkMovement();

  //   function moveCats(){
  //     $('.cats').removeClass('cats').addClass('path');
  //
  //   }
  // });
  //add a function to make the character move only in the pathways
  //move the classes on the divs (moveClasses) ie player and pathway start with [1] to [0]
  //

  // const catMovement = ['up','down','left','right'];
  // let direction = catMovement[3];
  //




  // set intercal called array with position
  // switch directiomn case right
  //
  // if
  //
  // els if maths random * catPosition.length

  //
  //
  //
  // //
  //
  // start movement of the cats when a key is pressed ie (up) add event (possibly will include false and true statement which includes if up, right, left is pressed )
  // move cats same theory as moving mouse (ie up, down, left and right) but with set interval when hit wall will turn direction
  // set interval and stop cats when collision with a mouse or mouse has collected all cheese treats
  // cats to randomly patrol the pathway
  //
  //   startCat.on('click', ()=> {

//   catDirection = Math.floor(Math.random() * 2)
// //
// //   setInterval(() => {
// //     if(playerMovement ===
// //   });
  // }
});
