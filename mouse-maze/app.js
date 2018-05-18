$(()=>{

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
});
