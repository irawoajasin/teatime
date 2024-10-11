let i = 0;
let interA;
let steeptime;
let startSteep = false;
let brewing = false;
let brewed = false;

let secondStart = 59;
let lastSecond, timeSecond ;
let minusSecond = 0;
let minusMinute = 1;

let dayColorOffset = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  frameRate(10);
  background(255, 255, 255);
  timeSecond = secondStart;
}

function draw() {
  // setups
  let black = color(145, 51, 22);
  let green = color(176, 201, 117);
  let herbal = color(245, 240, 203);
  let start = color(255, 255, 255);
  textSize(24);
  fill(10, 10, 10);
  
  //brewing process
  if(keyIsDown(32)){
    if(i <= 1) {
      i= i + dayColorOffset; //0.05 was 3 sec, 0.005
      background(interA);
    } else {
      print('color progress finished')
    }
    countDown()
    brewing = true;
    print('brewing');
  }

  // time of day
  if (hour() < 12 && hour() > 2) {
    interA = lerpColor(start, black, i);
    steeptime = 4;
    dayColorOffset = 0.0004;

    if (startSteep == false) {
      fill(10, 10, 10);
      textSize(24);
      text('good morning, hold space bar to brew your tea.', (windowWidth/2)-125, (windowHeight/2)+250);
      text('this morning we have black tea for energy.', (windowWidth/2)-175, (windowHeight/2)+300);
    }

    if(brewing == true) {
      background(interA);
      if (keyIsDown(32)) {
        
      } else if (brewed == false) {
        text('hold space to keep brewing', (windowWidth/2)-125, (windowHeight/2)+250);
      }
    }

  } else if (hour() < 17 && hour() > 12) {
    interA = lerpColor(start, green, i);
    steeptime = 3;
    dayColorOffset = 0.0009;
    if (startSteep == false) {
      fill(10, 10, 10);
      textSize(24);
      text('good afternoon. hold space bar to brew your tea.', (windowWidth/2)-200, (windowHeight/2)+250);
      text('today we have green tea for focus.', (windowWidth/2)-175, (windowHeight/2)+300);
    }

    if(brewing == true) {
      background(interA);
      if (keyIsDown(32)) {
        
      } else if (brewed == false) {
        text('hold space to keep brewing', (windowWidth/2)-125, (windowHeight/2)+250);
      }
    }
    
  } else {
    interA = lerpColor(start, herbal, i);
    steeptime = 2;
    dayColorOffset = 0.002;
    print('night');    
    if (startSteep == false) {
      fill(10, 10, 10);
      textSize(24);
      text('good evening. hold space bar to brew your tea.', (windowWidth/2)-200, (windowHeight/2)+250);
      text('tonight we have herbal tea for relaxation.', (windowWidth/2)-175, (windowHeight/2)+300);
    }
    
    if(brewing == true) {
      background(interA);
      if (keyIsDown(32)) {
        
      } else if (brewed == false) {
        text('hold space to keep brewing', (windowWidth/2)-125, (windowHeight/2)+250);
      }
    }
  }

  // checking if brewed
  print('time seconds is ' + timeSecond);
  if (timeSecond < 10 && steeptime > 1) {
    if (steeptime == 0 && timeSecond == -1){
      print("im brewed!")
      text('your tea is ready.', (windowWidth/2)-90, (windowHeight/2)+250);
      text('come back soon for another cup', (windowWidth/2)-90, (windowHeight/2)+300);
      brewed = true;
    } else {
      print(steeptime + ":0" + timeSecond);
      text('your tea will be ready in ' +steeptime + ":0" + timeSecond, (windowWidth/2)-110, (windowHeight/2)+300);
    }
  } else {
    if(brewing == true) {
      print(steeptime + ":" + timeSecond);
      text('your tea will be ready in ' +steeptime + ":" + timeSecond, (windowWidth/2)-110, (windowHeight/2)+300);
    }
  }
  
  //draw mug
  noStroke();
  fill(10, 10, 10);
  rect((windowWidth/2)-90, (windowHeight/2)-100, 250, 200);
  fill(10, 10, 10);
  ellipse((windowWidth/2)+35, (windowHeight/2)+100, 250, 115);
  ellipse((windowWidth/2)+35, (windowHeight/2)-105, 250, 115);
  fill(interA);
  ellipse((windowWidth/2)+35, (windowHeight/2)-100, 240, 115);
}

// change text once steeping begins
function keyPressed(){
  if (key == ' '){
    startSteep = true;
  }  
} 

function countDown(){
  if (second() != lastSecond){
    if (steeptime > -1 && timeSecond > -1){
      minusSecond++;
    }
  }
  
  if (timeSecond == 0 && steeptime != 0){
    minusMinute++;
    secondStart = 59 ;
    minusSecond = 0 ;
  }
  
  // second timer
  timeSecond = secondStart - minusSecond ;
  steeptime = steeptime - minusMinute ;
  
  //keep track of last second
  lastSecond = second();
}