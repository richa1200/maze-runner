const prompt = require('prompt-sync')({sigint: true});


const dollar = '$';
const hole = 'O';
const playFieldCharacter =  '░';
const pathCharacter = '*';

class playField {
  constructor(playField = [[]]) {
    this.playField = playField;
    this.locationX = 0;
    this.locationY = 0;
    // Set the "home" position before the game starts
    this.playField[0][0] = pathCharacter;
  }


  Game() {
    let playing = true;
    console.log("Reach the dollar. Use Keys u/U, d/D, r/R, l/L for moving Up, Down, Right, Left\n");
    while (playing) {
      this.print();
      this.askQuestion();
      if (!this.isInBounds()) {
        console.log('Out of bounds instruction!');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('Game Over, you fell down a hole!');
        playing = false;
        break;
      } else if (this.isdollar()) {
        console.log('Congrats, you found your dollar!');
        playing = false;
        break;
      }
      // Update the current location on the map
      this.playField[this.locationY][this.locationX] = pathCharacter;
    }
  }

  askQuestion() {
    const answer = prompt('Which way? ').toUpperCase();
    switch (answer) {
      case 'U':
        this.locationY -= 1;
        break;
      case 'D':
        this.locationY += 1;
        break;
      case 'L':
        this.locationX -= 1;
        break;
      case 'R':
        this.locationX += 1;
        break;
      default:
        console.log('Enter U, D, L or R.');
        this.askQuestion();
        break;
    }
  }

  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.playField.length &&
      this.locationX < this.playField[0].length
    );
  }

  isdollar() {
    return this.playField[this.locationY][this.locationX] === dollar;
  }

  isHole() {
    return this.playField[this.locationY][this.locationX] === hole;
  }

  print() {
    const displayString = this.playField.map(row => {
        return row.join('');
      }).join('\n');
    console.log(displayString);
  }

  static generateplayField(height, width, percentage = 0.1) {
    const playField = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        playField[y][x] = prob > percentage ? playFieldCharacter : hole;
      }
    }
    // Set the "dollar" location
    const dollarLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // Make sure the "dollar" is not at the starting point
    while (dollarLocation.x === 0 && dollarLocation.y === 0) {
      dollarLocation.x = Math.floor(Math.random() * width);
      dollarLocation.y = Math.floor(Math.random() * height);
    }
    playField[dollarLocation.y][dollarLocation.x] = dollar;
    return playField;
  }
}

const myplayField = new playField(playField.generateplayField(10, 10, 0.2));
myplayField.Game();
