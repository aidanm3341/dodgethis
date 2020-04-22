export class Player{
    constructor(){
        this.x = 10;
        this.y = 10;
    }

    export render(){
        sprite(122, this.x, this.y);
    }

    export setX(x){
        this.x = x;
    }

    export setY(y){
        this.y = y;
    }
}