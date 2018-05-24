$(()=> {

  let grid = [
    [9,9,9,9,9,9,0,9,9,9,9,9,9],
    [0,2,0,0,0,2,0,2,0,0,0,2,0],
    [9,9,2,9,9,9,0,9,9,9,2,9,9],
    [9,9,6,9,9,9,2,9,9,9,5,9,9],
    [9,9,2,9,9,9,0,9,9,9,2,9,9],
    [9,9,0,9,9,9,0,9,9,9,0,9,9],
    [0,0,0,0,0,0,1,0,0,0,0,0,0],
    [9,2,9,2,9,9,0,9,9,2,9,2,9],
    [9,0,9,0,9,9,0,9,9,0,9,0,9],
    [9,2,9,2,9,9,2,9,9,2,9,2,9],
    [9,0,9,0,9,9,7,9,9,0,9,0,9],
    [0,2,0,0,0,2,0,2,0,0,0,2,0],
    [9,9,9,9,9,9,0,9,9,9,9,9,9]
  ];
  //grid 11 by 10
  //Player mouse cell 1, path cell 0, walls cell 9
  //cheese cell 2, repellent 3
  //computer cat cell 5
  $('#maze').on('mouseover', 'div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  let playerMovement = {};
  const catDirection = ['up','down','left','right'];
  //merge the cats inc name and position on grid
  const cats = [{
    name: 'cat1',
    cellPosition: {}
  }, {
    name: 'cat2',
    cellPosition: {}
  }, {
    name: 'cat3',
    cellPosition: {}
  }];
  let direction;
  let lifeCounter = 3;
  let treat = 0;
  const $endScreen = $('.endScreen');
  const $startScreen = $('.startScreen');
  $endScreen.hide();
  document.getElementById('myForm').reset();

  const $life = $('.life');
  $life.text(lifeCounter);


  //Audio to be added to the game
  const audio = document.querySelector('audio');

  function playTreats(){
    audio.src = './sound/collect_treats_sound.wav';
    audio.play();
  }

  function catchMouse(){
    audio.src = './sound/collect_treats_sound.wav';
    audio.play();
  }

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
          cats[0].cellPosition = {x: i, y: j};
          grid[cats[0].cellPosition.x][cats[0].cellPosition.y] = 0;
        } else if (cell === 6){
          $element.addClass('cat2');
          cats[1].cellPosition = {x: i, y: j};
          grid[cats[1].cellPosition.x][cats[1].cellPosition.y] = 0;
        } else if (cell === 7) {
          $element.addClass('cat3');
          cats[2].cellPosition = {x: i, y: j};
          grid[cats[2].cellPosition.x][cats[2].cellPosition.y] = 0;
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
    e.preventDefault();
    const x = playerMovement.x;
    const y = playerMovement.y;

    let checkSquareX = x, checkSquareY = y;
    let $checkSq;

    function getDiv() {
      return $(`div[data-x='${checkSquareX}'][data-y='${checkSquareY}']`);
    }
    const $playMove = getDiv();
  //
  //   function init(){
  //     lifeCounter = document.querySelector('#lifeCounter');
  //     for(let i=0; i<3; i++) addLife();
  //     // grid.appendChild(Instructions)
  //   }
  //   init();
  //
  //   function addLife(){
  //     numOfLives++;
  //     const life = document.createElement('img');
  //     life.src ='./images/heart.png';
  //   lifebar.appendChild(life);
  // }

    function movePlayer(){
      //cat caught mouse
      cats.forEach(function(cat) {
        if($('#maze div').hasClass(`mouse ${cat.name}`)) {
          lifeCounter--;
          $life.text(lifeCounter);
          //check if mouseLife < 1
          if(lifeCounter < 1)
            alert('GAME OVER');
          catchMouse();
          $startScreen.hide();
          $endScreen.show();
        }
      });

      const resetButton = function () {
      };


      $('.mouse').removeClass('mouse').addClass('path');
      //movePlayer function is there to enable the mouse to access the pathways and pick up treats and repellent
      if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('treat')){
        treat ++;
        playTreats();
      }
      if(treat > 21){
        alert('you win!');
        location.reload();
      }
      $(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).removeClass('treat repellent path').addClass('mouse');
    }

    //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
    // playerMovement enables the mouse to move using the key up
    switch(e.which){
      case 38://up
        checkSquareX = x - 1;
        if (checkSquareX < 0) checkSquareX = 12;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.x -= 1;
          if($playMove.hasClass('wall')){
            playerMovement.x += 1;
            return null;
          }
          if(playerMovement.x < 0){
            playerMovement.x = 12;
          }
          movePlayer();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key right
      case 39://right
        checkSquareY = y + 1;
        if (checkSquareY > 12) checkSquareY = 0;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.y+= 1;
          if($playMove.hasClass('wall')){
            playerMovement.y-= 1;
            return null;
          }
          if(playerMovement.y > 12){
            playerMovement.y = 0;
          }
          movePlayer();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key down
      case 40://down
        checkSquareX = x + 1;
        if (checkSquareX > 12) checkSquareX = 0;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.x+= 1;
          if($playMove.hasClass('wall')){
            playerMovement.x-= 1;
            return null;
          }
          if(playerMovement.x > 12){
            playerMovement.x = 0;
          }
          movePlayer();
        }
        break;
        //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
        // playerMovement enables the mouse to move using the key left
      case 37://left
        checkSquareY = y - 1;
        if (checkSquareY < 0) checkSquareY = 12;
        $checkSq = getDiv(checkSquareX, checkSquareY);
        if ($checkSq.hasClass('path')){
          playerMovement.y-= 1;
          if($playMove.hasClass('wall')){
            playerMovement.y+= 1;
            return null;
          }
          if(playerMovement.y < 0){
            playerMovement.y = 12;
          }
          movePlayer();
        }
        break;
    }
  });
  //function to determine the position of the cats
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
    cats.forEach(function(cat) {
      const newPosition = {x: cat.cellPosition.x, y: cat.cellPosition.y};
      switch(direction){
        //change the direction of the cats travel to up
        case 'up':
          newPosition.x -= 1;
          //stops cats from traveling past the grid parameters
          if (newPosition.x < 0) newPosition.x = 12;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
          //change the direction of the cats travel to right
        case 'right':
          newPosition.y += 1;
          //stops cats from traveling past the grid parameters
          if (newPosition.y > 12) newPosition.y = 0;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
          //change the direction of the cats travel to down
        case 'down':
          newPosition.x += 1;
          //stops cats from traveling past the grid parameters
          if (newPosition.x > 12) newPosition.x = 0;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
          //change the direction of the cats travel to left
        case 'left':
          newPosition.y -= 1;
          //stops cats from traveling past the grid parameters
          if (newPosition.y < 0) newPosition.y = 12;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
      }
    });
  }, 200);

  //      if(lifebar.lastChild) lifebar.removeChild(lifebar.lastChild);
  //      else lumberjackState = 3; // dead!
  //      actionCell = cells[lumberjackIndex];
  //      actionCell.classList.add('lumberjackAttack');

});
