/* Program name - Mission Moon 
   created by Abhiyanta a.k.a Rishav Tiwari
   Date of creation 18|07|2023, at Friday */
  
/* varible initialization and declaration */

alert("MUST READ: It's a simple game, your shuttle is revolving around your planet orbit, tap on the screen to shoot the shuttle in tangential position, the green area is your target!! Its not real physics, obviously!! Enjoy your game!");
alert("Welcome in a parallel Universe!!")
var name = prompt("Enter your name:");
alert("Hello, "+name+"! I know it's your first experience! But I trust you the most and that is why I am making you the encharge of our space mission!");
alert("Our mission is to use the gravity of that white celestial body to land, we can land easily there but the problem is that planet is so far from us, so we need your help too to shoot it on proper time position, so we can enter in that green area");
alert("Inshort: Target is green area!! You can post your sucessfull missions and can tag me");

// objects of elements
var earth = {x: 0, y: 0, r: 50};
var ship  = {x: 0, y: 0, r: 10};
var moon  = {x: 0, y: 0, r: 25}

// booleans value
var mainWindow = true;
var gameOver   = false;
var userTouch  = false;
var missonSuccess = false;

// factors which will affect ship's position
var angle = 0;
var delta_x = 0;
var delta_y = 0;
var total_missions = 0;
var sucessfull = 0;
var time = 1;
var count = 0;
var moontime = 0;

/* window config */
function setup() {
    createCanvas(
        windowWidth,
        windowHeight
    ); 
}

/* main program */
function draw() {
 
    // window 1st the main part
    if (mainWindow) {
        showWindowOne();
    } 
    
    // window of Game Over page
    if (gameOver) {
        showWindowTwo();
    }
}

/* showWindowOne() has logics of main game */
function showWindowOne() {
    background("black");
    count += 1;
    if (count % 50 == 0) {time += 1;}
    
    // just for giving star background effect
    for (let i=0 ; i <= 10 ; i++) {
        fill(255);
        ellipse(random(windowWidth), random(windowHeight), 2, 2);
    }
    
    textSize(10);
    fill("green");
    text("Total Missions: "+total_missions, 0, 50);
    text("Successfull Missions: "+sucessfull, 0, 70);
    fill("white");
    text("distance: "+Math.ceil(dist(ship.x, ship.y, moon.x+windowWidth/2, moon.y+100))+"km", 0, 90);
    text("time: "+ time + "sec", 0, 110);
    text("speed: "+ Math.ceil(dist(ship.x, ship.y, earth.x+windowWidth/2, earth.y+100)/time)+"km/sec", 0, 130);
    
    // earth orbit position
    stroke("red");
    fill("black");
    ellipse(earth.x+windowWidth/2, 
            earth.y+windowHeight/1.5,
            earth.r+150, earth.r+150);
    
    // earth position
    stroke("black");
    fill("blue");
    ellipse(earth.x+windowWidth/2, 
            earth.y+windowHeight/1.5,
            earth.r, earth.r);
    
    // save zone position
    fill("black");
    stroke("green");
    ellipse(moon.x+windowWidth/2, moon.y+100,
            moon.r+50, moon.r+50);
    
    // moon position
    stroke("black");
    fill("grey");
    ellipse(moon.x+windowWidth/2, moon.y+100, moon.r, moon.r);
          
    // rocket position
    fill("white");
    ellipse(ship.x, ship.y, ship.r, ship.r);
    
    /* updating variables section */
    angle = angle + 0.05;
    
    if (!userTouch) {
        ship.x = 2 * earth.r * Math.cos(angle) + windowWidth/2;
        ship.y = 2 * earth.r * Math.sin(angle) + windowHeight/1.5;
        delta_x = Math.cos(angle+0.1) - Math.cos(angle);
        delta_y = Math.sin(angle+0.1) - Math.sin(angle);
    } else {
        ship.x = ship.x + 20 * delta_x;
        ship.y = ship.y + 20 * delta_y;
    }
    
    // logics of distances
    if  (dist(ship.x, ship.y, moon.x+windowWidth/2, moon.y+100) < moon.r + 25) {
        ship.x = (moon.r+13) * Math.cos(angle) + windowWidth/2;
        ship.y = (moon.r+13) * Math.sin(angle) + 100 ;
        moontime += 1;
        if (moontime == 100) {
            gameOver = true;
            mainWindow = false;
            missonSuccess = true;
            total_missions += 1;
            sucessfull += 1;
        }
    }
    
    // logic of misson failed
    if (ship.x < 0 || ship.y < 0 || ship.x > windowWidth || ship.y > windowHeight) {
        gameOver = true;
        mainWindow = false;
        missonSuccess = false;
        total_missions += 1;
    }
}

/* showWindowTwo() has logics of game over */
function showWindowTwo() {
    // just for giving star background effect
    
    background("black");
    
    // starts for style
    for (let i=0 ; i <= 10 ; i++) {
        fill(255);
        ellipse(random(windowWidth), random(windowHeight), 2, 2);
    }
    
    // texts of mission
    if (missonSuccess) {
        fill("green");
        textSize(25);
        text("Mission Accomplished!!", 
             0, windowHeight/2);
    } else {
        fill("red");
        textSize(25);
        text("Mission Failed!!", 
            0, windowHeight/2);
    }
    fill("white");
    textSize(15);
    text("click the screen again to restart", 0, windowHeight/2+25);
    fill("green");
    textSize(25);
    text("Success Missions: "+sucessfull+"/"+total_missions, 0, 40);
    text("Success Rate: "+Math.round(((sucessfull/total_missions)*100)) + "%", 0, 70);
}

/* an event when mouse is clicked on window */
function mouseClicked() {
    userTouch = true;
    if (gameOver) {
        mainWindow = true;
        gameOver = false;
        userTouch = false;
        angle = 0;
        delta_x = 0;
        delta_y = 0;
        time = 0;
        count = 0;
        moontime = 0;
    }
}




