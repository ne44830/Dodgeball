;

function Player(name,c,x,y,r,ballsarray,lives,balls){
    var self = this;
    self.radius = r;
    self.position = {x: x, y: y};
    self.position_accel = {x: 0,y: 0};
    self.playerballs = ballsarray;
    self.boundry = boundry;
    self.name = name;
    self.lives = lives;
    self.balls = balls;

    justFired = false;

    self.draw = function(pen) {

        pen.beginPath();
        pen.arc(self.position.x,self.position.y,self.radius,0,2*3.14159, false);
        pen.fillStyle = c ;
        pen.fill();
    };

    self.moveLeft = function(){
        self.lastY = self.position.y;
        self.lastX = self.position.x;
        if(self.position.x >= 25){
            self.position_accel.x += -0.05;
            self.position.x += -1 + self.position_accel.x
        }
        else {self.position.x = self.lastX}
        resetAccel(self)



    };

    self.moveRight = function(){
        self.lastY = self.position.y;
        self.lastX = self.position.x;
        if(self.position.x <= 575){
            self.position_accel.x += 0.05;
            self.position.x += 1 + self.position_accel.x
        }
        else {self.position.x = self.lastX}
        resetAccel(self)


    };

    self.MoveUp = function(){
        self.lastY = self.position.y;
        self.lastX = self.position.x;
        if (self.position.y <325 && self.position.y >275){
        self.position_accel.y += -0.05;
        self.position.y += -1 + self.position_accel.y
        }
        else {self.position.y = self.lastY}
        resetAccel(self)
    };

    self.moveDown = function(){
        self.lastY = self.position.y;
        self.lastX = self.position.x;
        if (self.position.y <325 && self.position.y >275){
        self.position_accel.y += 0.05;
        self.position.y += 1 + self.position_accel.y
        }
        else {self.position.y = self.lastY}
        resetAccel(self)
    };

}

function throwBall(player){

    if (player == players[0] && (justFired == false) ){
        player.playerballs[0].position.x = player.position.x;
        player.playerballs[0].position.y = player.position.y - 38;
        player.playerballs[0].velocity += -12;
        fieldballs.push(player.playerballs[0]);
        player.playerballs.splice(0,1);
        justFired = true;
    }


    if (player == players[1] && (justFired == false)) {
        player.playerballs[0].position.x = player.position.x;
        player.playerballs[0].position.y = player.position.y + 38;
        player.playerballs[0].velocity += 12;
        fieldballs.push(player.playerballs[0]);
        player.playerballs.splice(0,1);
        justFired = true;
    }
    setTimeout(function(){justFired = false},250);
    console.log(justFired)
}

function resetAccel(self){
    self.position_accel.x = 0;
    self.position_accel.y = 0;
}

function decelerate(self){
   /* if (self.position_accel.x < 0)
        self.position_accel.x += 1.25;
    else if (self.position_accel.x > 0)
        self.position_accel.x -= 1.25 ;

    if (self.position_accel.y < 0)
        self.position_accel.y += 1.25;
    else if (self.position_accel.y > 0)
        self.position_accel.y -= 1.25; */
}

function DodgeBall(x,y,r,v,a){
    var self = this;
    self.radius = r;
    self.position = {x: x,y: y};
    self.active = a;
    self.velocity = v;


    self.draw = function(pen) {
        pen.beginPath();
        pen.arc(self.position.x,self.position.y,self.radius,0,2*3.14159, false);
        pen.fillStyle = "red" ;
        pen.fill();
    };

    self.move = function() {
        if (self.active){self.position.y += self.velocity;}

        if (self.position.y <= 12){
            self.position.y = 12;
            ricochet(self);

            self.active = false}
        if (self.position.y >= 588){
            self.position.y = 588;
            ricochet(self);

            self.active = false}
        if (self.velocity == 0) {self.active = false}

    }


}

function collision(player,fieldballs){
    //finds the distance between a player and a ball objects
    for (var i = 0; i < fieldballs.length; i++) {
        var player_to_ball = Math.sqrt(Math.pow((player.position.x - fieldballs[i].position.x), 2) + Math.pow((player.position.y - fieldballs[i].position.y), 2));
         // if the distance is less than or equal to the combines radii of the objects
         // and the ball is not active  and the player doesn't already have 2 balls then it pushes it fromt he field balls array into the playerballs array
        if ((player_to_ball <= player.radius + fieldballs[i].radius) && (fieldballs[i].active == false) && player.playerballs.length < 2 ) {
            fieldballs[i].active = true;
            player.playerballs.push(fieldballs[i]);
            fieldballs.splice(i, 1);
            player.balls += 1;

        }
            // if a collision is detected adn the ball is active then the player loses and life and the game is restarted
        if ((player_to_ball <= player.radius + fieldballs[i].radius) && (fieldballs[i].active == true)){

            ricochet(fieldballs[i]);
            player.lives -= 1;
            startGame()
        }
    }
}

function reduceVelocity(object){
    /*for (i = .5; object.velocity != 0; i+=.1){
     if (object.velocity > 0) {object.velocity -= i}
     if (object.velocity < 0) {object.velocity += i}
     } */
}

function ricochet(object){
    object.velocity *= -1
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/*function accelBounds(players) {

   for (var i = 0; i < players.length; i++) {
        var posYdis = players[i].position.y +  players[i].position_accel;
        var negYdis = players[i].position.y -  players[i].position_accel;

        if (players[i].position.x<25) {
            players[i].position.x = 25
        }
        if (players[i].position.x > 575) {
            players[i].position.x = 575
        }
        if ( negYdis < 25 ) {players[i].position.y = 25;resetAccel(players[i])}
        if ( posYdis > 575 ) {players[i].position.y = 25;resetAccel(players[i])}
        if ( negYdis > 275 ) {players[i].position.y = 275;resetAccel(players[i])}
        if (posYdis < 325) {players[i].position.y = 325;resetAccel(players[i])}
    }
} */

function redrawfield(pen){
    function dmz(){
        pen.fillStyle = 'lightslategray';
        pen.fillRect(0,235,600,130);
    }

    function topFaultLine(c){
        pen.beginPath();
        pen.moveTo(0,235);
        pen.lineTo(600,235);
        pen.closePath();
        pen.stroke();
        pen.strokeStyle = c  }

    function bottomFaultLine(c){
        pen.beginPath();
        pen.moveTo(0,365);
        pen.lineTo(600,365);
        pen.closePath();
        pen.stroke();
        pen.strokeStyle = c }

    function centerLine(c){
        pen.beginPath();
        pen.moveTo(0,300);
        pen.lineTo(600,300);
        pen.closePath();
        pen.stroke();
        pen.strokeStyle = c;}
    dmz();
    topFaultLine('black');
    centerLine('black');
    bottomFaultLine('black');

}

function draw_loop(pen,objects1,objects2) {
    pen.clearRect(0,0,600,600);
    redrawfield(pen);
    $.each(objects1, function(i,object){
        object.draw(pen);
    });
    $.each(objects2, function(i,object){
        object.draw(pen);
    });

}

function move_loop(objects) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].move();
        reduceVelocity(objects[i])


    }
}

function startGame(){
    player1 = new Player(player1,"Gold",300,550,25,player1balls,player1Lives,0);
    player1.draw(pen);
    player2 = new Player(player2,"Purple",300,50,25,player2balls,player2Lives,0);
    player2.draw(pen);

    if (player1Lives == 0){
        window.location.replace("/player2wins");
    }
    if (player2Lives == 0){
        window.location.replace("127.0.0.1:4567/player1wins");
    }

    players.push(player1,player2);

    var ball1 = new DodgeBall(50,300,12,0,false);
    ball1.draw(pen);
    var ball2 = new DodgeBall(150,300,12,0,false);
    ball2.draw(pen);
    var ball3 = new DodgeBall(250,300,12,0,false);
    ball3.draw(pen);
    var ball4 = new DodgeBall(350,300,12,0,false);
    ball4.draw(pen);
    var ball5 = new DodgeBall(450,300,12,0,false);
    ball5.draw(pen);
    var ball6 = new DodgeBall(550,300,12,0,false);
    ball6.draw(pen);

    fieldballs.push(ball1,ball2,ball3,ball4,ball5,ball6);
}

$(function(){
    var $mycanvas = $('#mycanvas');
    pen = $mycanvas[0].getContext('2d');
    players = [];
    fieldballs = [];
    keys_pressed = [];
    player1balls = [];
    player2balls = [];
    player1Lives = 3;
    player2Lives = 3;

    startGame();

    //captures keydown events and puts that keys char code into the keys_pressed array
    $(document).keydown(function(e) {
        var index =
            keys_pressed.indexOf(e.which);
        if (index < 0)
            keys_pressed.push(e.which)
    });

    //captures keyup events and removes that keys char code from the array
    $(document).keyup(function(e) {
        var index =
            keys_pressed.indexOf(e.which);
        keys_pressed.splice(index, 1);
    });

    //prevent window scrolling by use of arrow keys
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    setInterval(function(){
        //player1 deceleration
        if (!contains(keys_pressed,37) && !contains(keys_pressed,38) && !contains(keys_pressed,39) && !contains(keys_pressed,40)) {decelerate(player1)}

        //player 1 movements
        if (contains(keys_pressed,37)){player1.moveLeft()}//left arrow
        if (contains(keys_pressed,38)&& (player1.position.y >= 325)) {player1.MoveUp()}//up arrow
        if (contains(keys_pressed,39)){player1.moveRight()}// right arrow
        if (contains(keys_pressed,40)&& (player1.position.y <= 575)) {player1.moveDown()}// down arrow

        if (contains(keys_pressed,96) && (player1.playerballs.length) > 0 ){
            throwBall(player1);
            console.log('throw1')

        } //throw dodge ball

        //player2 deceleration
        if (!contains(keys_pressed,65) && !contains(keys_pressed,87) && !contains(keys_pressed,68) && !contains(keys_pressed,83)) {decelerate(player2)}

        //player2 movements
        if (contains(keys_pressed,65)) {player2.moveLeft()} //a left
        if (contains(keys_pressed,87)&&(player2.position.y >= 25)) {player2.MoveUp()} //w up
        if (contains(keys_pressed,68)) {player2.moveRight()} //d right
        if (contains(keys_pressed,83)&&(player2.position.y <= 275)) {player2.moveDown()}//s down

        if (contains(keys_pressed,70)&& player2.playerballs.length > 0 ){
            throwBall(player2);
            console.log('throw2')
        }  //throw dodge ball


        //player1 acceleration reset
        if (contains(keys_pressed,37) && contains(keys_pressed,39)) {resetAccel(player1)}
        if (contains(keys_pressed,38) && contains(keys_pressed,40)) {resetAccel(player1)}
        //player2 acceleration reset
        if (contains(keys_pressed,65) && contains(keys_pressed,68)) {resetAccel(player2)}
        if (contains(keys_pressed,87) && contains(keys_pressed,83)) {resetAccel(player2)}
    },8);

    setInterval(function(){
        move_loop(fieldballs);
        collision(player1, fieldballs);
        $("#player1balls").text(player1.balls);
        $("#player1lives").text(player1.lives);
        collision(player2, fieldballs);

        $("#player2balls").text(player2.balls);
        $("#player2lives").text(player2.lives);
        draw_loop(pen, players, fieldballs);
    },10)

});



