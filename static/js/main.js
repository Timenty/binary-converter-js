var widthScreen = document.documentElement.clientWidth;
var heightScreen = document.documentElement.clientHeight;
var canvas = document.getElementById("Canvas");
var gameOverWindow = document.querySelector('.game-over-notify');
var squarepx = 50;
var greatWall = 0;
if (((widthScreen < 900 ) && (widthScreen > 500)) && (heightScreen > 500)) {
  // canvas.style.height = heightScreen-40+"px";
  // canvas.style.width = widthScreen-40+"px";
  canvas.style.height = 450 + "px";
  canvas.style.width = 450 + "px";
  // squarepx = 45;
}else if(widthScreen < 500){
  canvas.style.height = 300 + "px";
  canvas.style.width = 300 + "px";
  // squarepx = 30;
}
var gameCount = 0;
var ctx = canvas.getContext("2d");
var gameStop = 1;
var left = 37;
var down = 40;
var right = 39;
// var top = 38; Не работает хз почему
var top_key = 87; //wasd
var left_key = 65;
var down_key = 83;
var right_key = 68;

var Score = 0;
var map;
var snake = [];
var snake_length = 10;
var def_speed = 10;
var snake_spd_y = -10;
var snake_spd_x = 0;
var gameSpeed = 80;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function snakeBase(square){
  var center = square / 2;
  var coords = map[center][center];
  for (var i = 0; i<snake_length; i++) {
    snake[i] = {x: coords.x , y: coords.y};
  }
  // console.log(snake); //250 250
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}
function fieldMarking(width, height, square){

  var f_grid = square;
  var x_step = width / square;
  var y_step = height / square;
  // console.log('x шаг = '+ x_step);
  // console.log('y шаг = '+ y_step);

  // console.log("Aspect     = ", w/r, ":", h/r);
  map = Create2DArray(square);

  for (var i = 0; i<square; i++) {
    for (var e = 0; e<square; e++) {
      map[i][e] = {x: e * x_step, y: y_step * i};
    }
  }

  // console.log(map);
  // console.log();
  snakeBase(f_grid);

}
fieldMarking(canvas.width, canvas.height, squarepx);

document.addEventListener("keydown", keyDownHandler, false);
var delay = (function(){
    var timers = {};
    return function (callback, ms, label) {
        label = label || 'defaultTimer';
        clearTimeout(timers[label] || 0);
        timers[label] = setTimeout(callback, ms);
    };
})();

function keyDownHandler(e) {
  // p = 80
  // console.log(e.keyCode);
    switch (e.keyCode) {
      case 38:
      case top_key:
        if (gameStop == 1 ) return 0;
        delay(function(){
        if ((snake_spd_y == 0) && (snake_spd_x != 0)) {
            snake_spd_y = -def_speed;
            snake_spd_x = 0;
        }
        }, gameSpeed);
        break;
      case left:
      case left_key:
        if (gameStop == 1 ) return 0;
        delay(function(){
        if (snake_spd_x == 0) {
          snake_spd_y = 0;
          snake_spd_x = -def_speed
        }
        }, gameSpeed);
        break;
      case down:
      case down_key:
        if (gameStop == 1 ) return 0;
        delay(function(){
        if ((snake_spd_y == 0) && (snake_spd_x != 0)) {
          snake_spd_y = def_speed;
          snake_spd_x = 0;
        }
        }, gameSpeed);
        break;
      case right:
      case right_key:
        if (gameStop == 1 ) return 0;
        delay(function(){
        if (snake_spd_x == 0) {
            snake_spd_y = 0;
            snake_spd_x = def_speed
        }
        }, gameSpeed);
        break;
      case 80:
        gameStop = !gameStop;
        break;
    default:
    }
}
var base_w = canvas.width;
var base_h = canvas.height;
function theWall(){
  if ((snake[0].x > base_w-10) || (snake[0].x < 0)) {
    fail();
  }
  if ((snake[0].y > base_h-10) || (snake[0].y < 0)) {
    fail();
  }
}
function offWall(){
  if ((snake[0].x > base_w-10) || (snake[0].x < 0)) {
    teleport(snake[0].x, 0);
  }
  if ((snake[0].y > base_h-10) || (snake[0].y < 0)) {
    teleport(snake[0].y, 1);
  }
}
// dir = 0 ~ x
// dir = 1 ~ y
function teleport(xy,dirt){
  if (dirt == 0) {
    if ((snake[0].x > base_w-10)) {
      snake[0].x = 0;
    }else{
      snake[0].x = 500;
    }
  }
  if (dirt == 1) {
    if ((snake[0].y > base_h-10)) {
      snake[0].y = 0;
    }else{
      snake[0].y = 500;
    }
  }
};
function theEat(){
  for (var i = 0; i < Foods.length; i++) {

    if (Foods[i].x != undefined) {

      if (((Foods[i].x - 5) == snake[0].x) && ((Foods[i].y - 5) == snake[0].y)) {
        // console.log(Foods);
        logicVar = getRandomInt(1,5);
        Foods.splice(i, 1);
        // console.log(Foods);
        generateFood();
        var random = getRandomInt(0,5);
        if (random == 3) {
          generateBigFood();
        }
        return 1;
      }
    }
  }
  if (BigFoods.length) {
    // console.log('ss');
    for (var i = 0; i < BigFoods.length; i++) {

      if (BigFoods[i].x != undefined) {
        var arch = 12;
        while(--arch){
          if (((BigFoods[i].x - 6 - arch) == snake[0].x) && ((BigFoods[i].y - 6 - arch) == snake[0].y)) {
            // console.log("Big food x : "+ BigFoods[i].x);
            // console.log("Big food y: " + BigFoods[i].y);
            // console.log("snake y x :" + snake[0].y +" "+ snake[0].x)
            //  console.log("arch : "+ arch);
            logicVar = getRandomInt(10,27);
            BigFoods.splice(i, 1);
            // generateBigFood();
            return 1;
          }
          if (((BigFoods[i].x - 6 + arch) == snake[0].x) && ((BigFoods[i].y - 6 + arch) == snake[0].y)) {

            logicVar = getRandomInt(5,25);
            //  console.log("Big food x : "+ BigFoods[i].x);
            // console.log("Big food y: " + BigFoods[i].y);
            // console.log("snake y x :" + snake[0].y +" "+ snake[0].x)
            //  console.log("arch : "+ arch);
            BigFoods.splice(i, 1);
            // generateBigFood();
            return 1;
          }
        }
      }
    }
  }
}
function fail(){
    // location.reload();
    gameStop = 1;
    ++gameCount;
    scoreUi.textContent = Score; 
    window.setTimeout(function(){
      gameOverWindow.classList.add('active');
    },350);
}
var state = 0;
function snakeBite(snake_y, snake_x){
  if ((snake[0].x == snake_x) && (snake[0].y == snake_y)) {
    fail();
  }
}
function collisionDetection() {
  if (greatWall == 0) {
    theWall();
  }else{
    offWall();
  }
  theEat();
}

function drawSnake() {
  for (var i = snake.length - 1; i >= 0; i--) {
    if (i != 0){
      snakeBite(snake[i].y, snake[i].x);
    }
    ctx.beginPath();
    ctx.rect(snake[i].x, snake[i].y, 10, 10);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

}
var Foods = [];
var BigFoods = [];
// Пофикшено Эдом
function generateFood(){
  // console.log(map.length);
  var lengthM = map.length;
  var random_x = getRandomInt(0,lengthM+1);
  var random_y = getRandomInt(0,lengthM+1);

  if (typeof map[random_x] == 'undefined' || typeof map[random_x][random_y] == 'undefined') {
    generateFood();
    return;
  } 

  var food_coords = map[random_x][random_y];
  // console.log(snake.length);
  for (var i = snake.length - 1; i >= 0; i--) {
    if (typeof(snake[i].x) == undefined) {
      generateFood();
      return;
      continue;
    }
    try {
      if ((snake[i].x != food_coords.x) && (snake[i].y != food_coords.y)) {
        Foods.push({x:5+food_coords.x,y:5+food_coords.y});
        break;
      }
    }catch{
      continue;
    }
  }
}
function generateBigFood(){
  var lengthM = map.length;
  var random_x = getRandomInt(0,lengthM+1);
  var random_y = getRandomInt(0,lengthM+1);

  if (typeof map[random_x] == 'undefined' || typeof map[random_x][random_y] == 'undefined') {
    generateBigFood();
    return;
  } 

  var food_coords = map[random_x][random_y];
  for (var i = snake.length - 1; i >= 0; i--) {
    if (typeof(snake[i].x) == undefined) {
      generateBigFood();
      return;
      continue;
    }
    try {
      if ((snake[i].x != food_coords.x) && (snake[i].y != food_coords.y)) {
        BigFoods.push({x:5+food_coords.x,y:5+food_coords.y});
        break;
      }
    }catch{
      continue;
    }
  }
}
function renderFood(cord_x,cord_y){
  // console.log('coordx ='+cord_x+ '?SSC='+cord_y);
  ctx.beginPath();
  // ctx.rect(cord_x, cord_y, 10, 10);
  ctx.arc(cord_x,cord_y,6,0, Math.PI*2);
  ctx.fillStyle = "#690";
  ctx.fill();
  ctx.closePath();
}
function renderBigFood(cord_x,cord_y){
  var randomColor = ["#690", "#df4037" ,"#8bc34a"];
  // console.log('coordx ='+cord_x+ '?SSC='+cord_y);
  ctx.beginPath();
  // ctx.rect(cord_x, cord_y, 10, 10);
  ctx.arc(cord_x,cord_y,12,0, Math.PI*2);
  ctx.fillStyle = randomColor[1];
  ctx.fill();
  ctx.closePath();
}
function drawStop() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#de0e37";
  ctx.fillText("Stop ⚫", 445, 20);
}
function drawScore() {
  Score = snake.length - 10; 
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+Score, 8, 20);
}
var logicVar = 0;
function snakeMoveLogic(){
  theEat();
  if (logicVar) {
    logicVar = --logicVar;
  }else{
    snake.pop();
  }
  snake.unshift({x:snake[0].x + snake_spd_x,y:snake[0].y + snake_spd_y});
}
function draw() {
  if (gameStop == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < Foods.length; i++) {
      renderFood(Foods[i].x,Foods[i].y);
    }
    for (var i = 0; i < BigFoods.length; i++) {
      renderBigFood(BigFoods[i].x,BigFoods[i].y);
    }
    snakeMoveLogic();
    drawSnake();
    collisionDetection();
    drawScore();
  }else{
    drawStop();
  }
}
function clear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
}
function Restart(){
  snake = [];
  Score = 0;
  Foods = [];
  BigFoods = [];
  clear();
  fieldMarking(canvas.width, canvas.height, squarepx);
  window.setTimeout(function(){
    generateFood();
    clear();
    gameStop = 0;
  },200);
  clear();
}
draw();
function recursiveTimeout(){
  window.setTimeout(function(){
    draw();
    recursiveTimeout();
  },gameSpeed);
}
recursiveTimeout();
// setInterval(draw, gameSpeed);
generateFood();
generateBigFood();
// ctx.beginPath();
// // rect - square
// // 1 - axisX
// // 2 - axisY
// // 3 - width start with left
// // 4 - height start with top
// ctx.fillStyle = "green";
// ctx.rect(55,55,50,50);
// ctx.closePath();
// ctx.fill();
// ctx.beginPath();
// // arc -  circle
// // 1 - axisX => circle center
// // 2 - axisY => circle center
// // 3 - circle radius
// // 4 - angle and end angle in radians
// // 5 - direction of drawing (false for clockwise (по часовой) the default, or true for anti-clockwise)
// // optional parameter
// // rgb, rgba supported

// ctx.arc(240,160,20,0, Math.PI*2, false);
// ctx.strokeStyle = "green";
// /// если строук то рисуем линией
// ctx.stroke();
// ctx.closePath();

// ctx.beginPath();

// ctx.arc(280,160,20,0, Math.PI*2, false);
// ctx.fillStyle = "#000000";
// /// если строук то рисуем линией
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();

// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();