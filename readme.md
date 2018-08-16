![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-34 Project 1 - Tom and Jerry: Mouse Maze

As part of the WDI programme, Our first project requirement was to build an in-browser game using HTML, CSS, JavaScript and  JQuery Library. Utilising skills learnt during the first couple of weeks of the course.

<hr>

#### Planning and Concept:

For my first project my inspiration came from the modern mouse maze game I played on the apple store and my two cats who love catching mice.

I decided to add the Tom and Jerry theme to the project as this is one of my childhood favourites. Using Jerry the mouse and Tom cat and his feline alley cat friends as the enemies.  

Mouse Maze idea was taken from multiple maze games, my favourite cartoon characters and my imagination.

<!-- #### visit website[] (This game is made for desktop only.) -->

#### Game build:


CURRENT FEATURES (MVP):
- I decided to develop a grid based game where the player, opponents, treats and traps are mapped out.
- The player and enemies are able to walk through the maze and come through the opposite end.
- The treats can be picked up by Tom and added to the cheese scoreboard.
- The traps are picked up by Tom where his life will be lost making it closer to the game over.
- Built a one player game allowing Jerry to be moved by the player using the keyboard up, down, left and right keys.
- Tom and his friend Butch are controlled by the computer by generating a random direction of travel.

GAME LOGIC:
- Collect all cheese items, and the player wins the game.
- If you encounter the cats, you lose the game.


<p align="center"><img src="https://i.imgur.com/IkfZMLw.png" width="700"/></p>

<p align="center"><img src="https://i.imgur.com/GlOcmNX.png" width="700"/></p>

<p align="center"><img src="https://i.imgur.com/DxNkL7f.png" width="700"/></p>

<p align="center"><img src="https://i.imgur.com/Ohu7O0v.png" width="700"/></p>

CODE:
The following code iterates through all the cats and when any of them collides with Jerry the mouse life is deducted when the life counter reaches < 1 the player is taken to the game over screen. I am happy with my use of the forEach loop logic.

```
function mouseCaught() {
  cats.forEach(function(cat) {
    if($('#maze div').hasClass(`mouse ${cat.name}`)) {
      lifeCounter--;
      $livesScore.text('Jerrys Lives 💙 = ' + lifeCounter);
      if(lifeCounter < 1) {
        $introPage.hide();
        $playScreen.hide();
        $endScreen.show();
      }
    }
  });
}
```

#### Challenges:
The main challenges I faced during this project:
- Time constraint to get all planned features in place, as this was a learning process, it took longer to build and work out how to solve problems.
- Refactoring code. I feel most of my current code still needs further refactoring.
- I had difficulties and still need to further develop how the computer automatically moves the cats, they currently do not move and spin into all directions (i.e. I would like the cats to reach the wall at the end of the path)


#### Planned features:
The game is relatively simple, and I would desire to add additional features to enhance the gaming experience.

- A variety of levels which gradually makes the user interaction harder which includes further obstacles and potions.

- Make game into 2 players by adding the additional mouse character Nibbles as an opponent to Jerry.

I enjoyed producing this game and am happy with the final product as it works as a basic game. I am looking to implement the planned features but also looking forward to making other games to test my abilities.

I made some slight minor bug fixes post project delivery and felt vast improvements in my problem-solving abilities.
