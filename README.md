[Pokemon Memory Game](https://lymanjohnson.github.io/memory-game/)

In addition to the "Hard Mode" Features (timer, life counter, etc), it includes:

- Sound effects and intro music
- A rotating cast of pokemon that are different every game, pulled from a collection of the first 483 pokemon. Their unique sound effects play when you flip them over.
- Game settings. You can tweak the number of lives you start with, the size of the board, and how many cards you need to match to clear the cards. The default match size is a pair, but perhaps you want to find a three-, four-, or five-of-a-kind
- A pokedex that shows the images of all the available pokemon grayed out. As you discover pokemon while playing the game, these images become colorized so you can keep track of all the monsters you've caught. Can you collect all 483?
- Semi-responsive design. It uses no media queries so no special tablet or phone functionality, but it does include flex boxes so it will fit in various sized windows.

CHALLENGES

- The pokedex images wouldn't all load consistently. I surmised that there was some sort of internal timeout where JS would fail to load an image if it didn't find it before the current appendChild loop had finished.
  - My solution to this was to split the process into multiple loops.
  - The first loop only imported the images using new Image() and defined their src.
  - I then had a separate loop that created image nodes (but didn't append them to anything) and stored them in an array.
  - Then I'd run a final loop to appendChild() those nodes to the <ul> element.
  - I put those loops in a separate js file that loaded in the head.
  - This was somewhat effective. Before, about a dozen images would fail to load consistently. Afterward, they would often load completely, and only occasionally would 1 or 2 fail to load.
