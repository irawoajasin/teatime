let entryData = [
  {
    title: "Sunday",
    color: "rgba(255, 0, 0, 1)",
    text: [
      "What is boredom?",
      "Does it have severity?",
      "Is it simply just the act of noticing?",
      "Of not doing?",
      "Boredom is simply when I notice my plants",
      "My favorite plant has a leaf that's dying strangely",
      "like a pear left to rot",
      "thanks for being bored with me"
    ],
    durations: [60000] // 1 minute
  },
  {
    title: "Monday",
    color: "rgba(127, 0, 128, 1)",
    text: [
      "Boredom is the lack of stimulation",
      "even in the middle of a conversation",
      "Boredom is the absence of moving",
      "foreward, backwards, or sideways",
      "or moving at all"
    ],
    durations: [1020000, 2160000, 1980000] // 17, 36, 33 minutes
  },
  {
    title: "Tuesday",
    color: "rgba(127, 0, 128, 1)",
    text: [
      "Boredom can be useful",
      "when it isn't channeled into a cell phone",
      "I took a break from work differently today",
      "deciding to break in the physical world",
      "I practiced handstands",
      "and did dishes",
      "But the break felt incomplete until",
      "I allowed myself to sit on my phone",
      "thanks for being bored with me"
    ],
    durations: [1380000, 420000, 120000] // 23, 7, and 2 minutes
  },
  {
    title: "Wednesday",
    color: "rgba(0, 0, 255, 1)",
    text: [
      "At this point",
      "I don't think I know the difference",
      "between boredom and light stress",
      "The lack of having something in the short-term",
      "to look forward to",
      "They all feel like a headache",
      "They all are the same",
      "thanks for being bored with me"
    ],
    durations: [1440000, 720000] // 24 and 12 minutes
  },
  {
    title: "Friday",
    color: "rgba(64, 0, 191, 1)",
    text: [
      "My phone is not just for boredom",
      "It's my comfort object",
      "a pacifier",
      "I picked it up very few times today",
      "(I'm at a retreat with constant socialization",
      "so theres very little need)",
      "yet I craved it after every",
      "slightly awkward conversation",
      "every yawn of exhaustion",
      "every lull in activites",
      "or when walking from place to place",
      "thanks for being bored with me"
    ],
    durations: [60000] // 1 minute
  },
  {
    title: "Saturday",
    color: "rgba(191, 0, 64, 1)",
    text: [
      "Is stimulation the opposite of boredom?",
      "Yes, but how long of constant stimulation",
      "is needed before stimulation is boring?",
      "Is mind-wandering while",
      " someone else is talking, boredom?",
      "lessons learned:",
      "I want to sometimes",
      "leave my phone at home when I go out",
      "Today, it feels possible",
      "(after 4 days of little/no phone usage",
      "Tomorrow, who's to say",
      "thanks for being bored with me"
    ],
    durations: [60000] // 1 minute
  }
];

let selectedDuration;
let isHolding = false;
let holdStartTime;
let progress = 0;

let paragraph = [];
let selectedTitle = "";
let selectedColor = "";

let fadeAlphas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  
  // Select a random paragraph group
  let selectedSet = random(entryData);
  paragraph = selectedSet.text;
  selectedDuration = random(selectedSet.durations);
  selectedTitle = selectedSet.title;
  selectedColor = selectedSet.color;

  // Init fade values
  fadeAlphas = new Array(paragraph.length).fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(240);
  
  drawRoundedRectangle();
  updateProgress();
  drawProgressBar();
  drawFadingText();
  drawTitle();
}

function drawTitle() {
  textAlign(CENTER, TOP);
  textSize(20);
  fill(selectedColor);
  text("Take a moment to be bored with Alissa\non a random " + selectedTitle, width / 2, 25);
}


function drawRoundedRectangle() {
  fill(selectedColor);
  stroke(0);
  strokeWeight(0);
  rect(width / 2, height / 2, width * 0.2, height * 0.75, 20);
}

function updateProgress() {
  if (keyIsDown(32)) {
    if (!isHolding) {
      isHolding = true;
      holdStartTime = millis() - progress * selectedDuration;
    }
    let elapsed = millis() - holdStartTime;
    progress = constrain(elapsed / selectedDuration, 0, 1);

    for (let i = 0; i < paragraph.length; i++) {
      let lineTime = (i + 1) / paragraph.length;
      if (progress >= lineTime && fadeAlphas[i] < 255) {
        fadeAlphas[i] = lerp(fadeAlphas[i], 255, 0.05);
      }
    }
  } else {
    isHolding = false;
  }
}

function drawProgressBar() {
  let barWidth = width * 0.5;
  let barHeight = 10;
  let x = width / 2 - barWidth / 2;
  let y = height / 2 + height * 0.45;

  noStroke();
  
  // Background of progress bar
  fill(200);
  rectMode(CORNER);
  rect(x, y, barWidth, barHeight, 20);
  
  // Progress fill (grows left to right)
  fill(selectedColor);
  rect(x, y, barWidth * progress, barHeight, 20);
  rectMode(CENTER)

  // Timer display
  let elapsed = isHolding ? millis() - holdStartTime : progress * selectedDuration;
  let remainingTime = max(0, (selectedDuration - elapsed) / 60000).toFixed(2);

  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(`${remainingTime} min`, x + barWidth + 10, y + barHeight / 2);
  textAlign(CENTER, CENTER);
}

function drawFadingText() {
  textSize(12);
  fill(0);
  let startY = height / 2 - height * 0.15;
  for (let i = 0; i < paragraph.length; i++) {
    push();
    fill(255, fadeAlphas[i]);
    text(paragraph[i], width / 2, startY + i * 25);
    pop();
  }
}
