const TILE_SIZE = 8;
const SWORD_WIDTH = 6;
var hasDied = false;
var swordsDodged = 0;
var timeUntilSwordSpawn = 20;
var startTime = new Date();

class Player{
    constructor(){
        this.x = 60;
        this.y = 100;
        this.dir = 'right'
    }

    update(){
        if(this.dir == 'right')
            sprite(122, this.x, this.y);
        else if(this.dir == 'left')
            sprite(122, this.x, this.y, true)

        //rect(this.x, this.y, TILE_SIZE, TILE_SIZE)
    }
}

var swords = [];
var swordSpawnCounter = 0;

class Sword{
    constructor(x, y){
        this.x = x;
        this.y = y;
        swords.push(this);
    }

    update(){
        this.y += 2;

        if(this.y > 128){
            swords.splice(swords.indexOf(this), 1);
            if(!hasDied)
                swordsDodged++;
        }

        sprite(141, this.x, this.y, false, true)
        //rect(this.x, this.y, SWORD_WIDTH, TILE_SIZE)
    }
}

function collides(x1, y1, x2, y2){
    return  x1 < x2 + SWORD_WIDTH &&
            x1 + TILE_SIZE > x2 &&
            y1 < y2 + TILE_SIZE &&
            y1 + TILE_SIZE > y2
}


var player = new Player();

function playerControls(){
    if(btn.right && player.x < 128 - TILE_SIZE){ 
        player.x += 1;
        player.dir = 'right';
    }
    if(btn.left && player.x > 0) {
        player.x -= 1;
        player.dir = 'left';
    }
}

function spawnSwords(){
    swordSpawnCounter += 1;
    if(swordSpawnCounter >= timeUntilSwordSpawn){
        swordSpawnCounter = 0;
        new Sword(random(128), -10);

        var currentTime = new Date();
        if(currentTime - startTime > 1000){
            timeUntilSwordSpawn -= 1;
            startTime = new Date();
        }
    }

    if(timeUntilSwordSpawn <= 5)
        timeUntilSwordSpawn = 5;
}

function checkForReset(){
    if(btn.A){
        swordsDodged = 0;
        hasDied = false;
        timeUntilSwordSpawn = 20;
    }
}

// Update is called once per frame
exports.update = function () {
    cls();

    if(!hasDied){
        playerControls();
        spawnSwords();
    }else{
        print("Game Over!", 43, 35)
        print("you dodged " + swordsDodged + " swords!", 25, 60)
        print("press space to restart", 20, 80)

       checkForReset();
    }

    var map = getMap('map');
    map.draw(0, 0);
    player.update();
    swords.forEach(sword => {
        sword.update();

        if(collides(player.x, player.y, sword.x, sword.y))
            hasDied = true;
    });
};
