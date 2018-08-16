// =========================
// DOMContentLoaded Listener
// =========================
$(()=> {

  const grid = [
    [9,9,9,9,9,9,0,9,9,9,9,9,9],
    [0,2,3,0,0,2,0,2,0,0,0,2,0],
    [9,9,2,9,9,9,0,9,9,9,2,9,9],
    [9,9,6,9,9,9,2,9,9,9,5,9,9],
    [9,9,2,9,9,9,0,9,9,9,2,9,9],
    [9,9,0,9,9,9,0,9,9,9,0,9,9],
    [0,0,0,0,0,0,1,0,0,0,3,0,0],
    [9,2,9,2,9,9,0,9,9,2,9,2,9],
    [9,0,9,3,9,9,0,9,9,0,9,0,9],
    [9,2,9,2,9,9,2,9,9,2,9,2,9],
    [9,0,9,0,9,9,0,9,9,0,9,0,9],
    [0,2,0,0,0,2,0,2,0,0,0,2,0],
    [9,9,9,9,9,9,0,9,9,9,9,9,9]
  ];


  // ****************************************************************************************
  //5 6 and 7 = cat * 1 = mouse * 2 = cheese * 0 = path * 9 = wall * 3 = mousetrap * 4 = bomb
  // ****************************************************************************************


  $('#maze').on('mouseover', 'div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

  let playerMovement = {};
  const catDirection = ['up','down','left','right'];
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

  const $livesScore = $('#livesScore');
  $livesScore.text('Jerrys Lives 💙 = ' + lifeCounter);

  const $treatScore = $('#treatScore');
  $treatScore.text('Cheese Score 🧀 = ' + treat);

  const audio = document.querySelector('audio');


  // *************************
  // Different screen elements
  // *************************


  const $introPage = $('.intropage');
  const $endScreen = $('.endScreen');
  const $playScreen = $('.playScreen');
  const $winScreen = $('.winScreen');


  // *********************
  // hide screens at start
  // *********************


  $playScreen.hide();
  $endScreen.hide();
  $winScreen.hide();


  // *******************
  // BUTTONS IN THE GAME
  // *******************


  $('#playBtn').on('click', function() {
    console.log('click');
    $introPage.hide();
    $playScreen.show();
    setup();
  });
  //reset the game to intro page
  document.getElementById('myForm').reset();
  //Audio to be added to the game


  // ******************
  // SOUNDS IN THE GAME
  // ******************


  function playTreats(){
    audio.src = './sound/hic-cup.wav';
    audio.play();
  }
  // function catchMouse(){
  //   audio.src = './sound/TheCatsMeOuch-Ah-Ha.wav';
  //   audio.play();
  // }

  // function endGameMusic(){
  //   audio.src = './sound/the-end.wav';
  //   audio.play();
  // }




  //**********************************************
  //START GAME - ONLY ONCE PLAY BUTTON IS SELECTED
  //**********************************************

  function setup(){
    generateGrid();
  }


  //******************************
  //GENERATE THE GRID FOR THE GAME
  //******************************


  function generateGrid(){
    //generate a grid
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
        } else if(cell === 3){
          $element.addClass('mousetrap path');
        }
        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.appendTo('#maze');
      });
    });
  }


  //*****************************************
  //MOUSE PICK UP CHEESE - GET POINTS AND WIN
  //*****************************************


  function obstacles(){
    $('.mouse').removeClass('mouse').addClass('path');
    if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('treat')){
      treat ++;
      playTreats();
      $treatScore.text('Cheese Score 🧀 = ' + treat);

    }
    if(treat > 21){
      $winScreen.show();
      $playScreen.hide();
      $endScreen.hide();
    }

    //**************************************
    //MOUSE CAUGHT BY MOUSETRAP - LOOSE LIFE
    //**************************************


    $('.mouse').removeClass('mouse').addClass('path');
    if($(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).hasClass('mousetrap path')){
      lifeCounter--;
      $livesScore.text('Jerrys Lives 💙 = ' + lifeCounter);
    }
    if (lifeCounter < 1) {
      // End game page
      $introPage.hide();
      $playScreen.hide();
      $endScreen.show();
    }
    $(`div[data-x='${playerMovement.x}'][data-y='${playerMovement.y}']`).removeClass('treat mousetrap path').addClass('mouse');
  }
  // ******************************
  // MOUSE CAUGHT BY CAT - GAMEOVER
  // ******************************


  function mouseCaught() {
    cats.forEach(function(cat) {
      if($('#maze div').hasClass(`mouse ${cat.name}`)) {
        //once cat catch mouse loose a life
        // catchMouse();
        lifeCounter--;
        $livesScore.text('Jerrys Lives 💙 = ' + lifeCounter);
        //check if mouseLife < 1
        if(lifeCounter < 1) {
          $introPage.hide();
          $playScreen.hide();
          $endScreen.show();
        }
        // alert('GAME OVER');
      }
    });
  }


  //***********************
  //MOVING THE MOUSE PLAYER
  //***********************


  $(document).on('keydown', function(e){
    e.preventDefault();
    const xTom = playerMovement.x;
    const yTom = playerMovement.y;

    let checkSquareX = xTom, checkSquareY = yTom;
    let $checkSq;

    function getDiv() {
      return $(`div[data-x='${checkSquareX}'][data-y='${checkSquareY}']`);
    }
    const $playMove = getDiv();


    // ************************************************
    //  FUNCTION TO MOVE MOUSE UP, DOWN, LEFT AND RIGHT
    // ************************************************


    //checkSquare calculates the grid pathway for the mouse to move enables it to move across from one side of the grid to another
    // playerMovement enables the mouse to move using the key up
    switch(e.which){
      case 38://up
        checkSquareX = xTom - 1;
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
          obstacles();
        }
        break;

      case 39://right
        checkSquareY = yTom + 1;
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
          obstacles();
        }
        break;

      case 40://down
        checkSquareX = xTom + 1;
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
          obstacles();
        }
        break;

      case 37://left
        checkSquareY = yTom - 1;
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
          obstacles();
        }
        break;
    }
  });


  //******************************
  //MOVING THE CAT ENEMIES
  //******************************


  window.setInterval(function(){
    direction = catDirection[Math.floor(Math.random() * 4)];
    // if (catDirection.getRandomNumber(100) < 10) {
    //   turn(catDirection.getRandomNumber(90) - 45);
    // }


    function moveCats(newPosition, oldPosition, cat){
      if($(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).hasClass('wall')) {
        return null;
      } else {
        if($(`div[data-x='${oldPosition.x}'][data-y='${oldPosition.y}']`).removeClass(cat).addClass('path'));
        $(`div[data-x='${newPosition.x}'][data-y='${newPosition.y}']`).removeClass('path').addClass(cat);
        mouseCaught();
        return 'moved';
      }
    }

    // **********************************************
    // FUNCTION TO MOVE CATS UP, DOWN, LEFT AND RIGHT
    // **********************************************


    cats.forEach(function(cat) {
      const newPosition = {x: cat.cellPosition.x, y: cat.cellPosition.y};

      switch(direction){
        case 'up':
          newPosition.x -= 1;
          if (newPosition.x < 0) newPosition.x = 12;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
        case 'right':
          newPosition.y += 1;
          if (newPosition.y > 12) newPosition.y = 0;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
        case 'down':
          newPosition.x += 1;
          if (newPosition.x > 12) newPosition.x = 0;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
        case 'left':
          newPosition.y -= 1;
          if (newPosition.y < 0) newPosition.y = 12;
          if (moveCats(newPosition, cat.cellPosition, cat.name)) cat.cellPosition = newPosition;
          break;
      }
    });
  }, 200);

});
