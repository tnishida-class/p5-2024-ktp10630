// 最終課題を制作しよう

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height - 25;
}

function draw(){
  background(160, 192, 255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

let x, y;
let speed = 5;
let boost = 10;
let now = speed;

let enemyX, enemyY, enemySpeed; 
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height - 25;

  // 敵の初期位置と速度
  enemyX = random(width);
  enemyY = 0;
  enemySpeed = 10;
}

function draw() {
  if (gameOver) {
    // ゲームオーバー画面
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(`Game Over! Your Score: ${score}`, width / 2, height / 2);
    textSize(20);
    text('Press Space to Restart', width / 2, height / 2 + 50);
    return;
  }

  background(160, 192, 255);

  // プレイヤーを描画
  fill(255);
  ellipse(x, y, 50);

  // 敵を描画
  fill(255, 0, 0);
  ellipse(enemyX, enemyY, 50);

  // プレイヤーの移動
  if (keyIsDown(LEFT_ARROW)) { x -= now; }
  if (keyIsDown(RIGHT_ARROW)) { x += now; }
  if (keyIsDown("X".charCodeAt(0))) { x += now; }
  if (keyIsDown("Z".charCodeAt(0))) { x -= now; }
  if (keyIsDown(32)) { now = boost; } else { now = speed; }

  // プレイヤーが画面外に出ないようにする
  x = constrain(x, 25, width - 25);

  // 敵の移動
  enemyY += enemySpeed;

  // 敵が画面外に出たらリセット
  if (enemyY > height) {
    enemyY = 0;
    enemyX = random(width);
    enemySpeed += 0.75; // 少しずつ速度を上げる
  }

  // 当たり判定
  let d = dist(x, y, enemyX, enemyY);
  if (d < 50) {
    gameOver = true;
  }

  // スコアの更新
  score += 1;

  // スコアを描画
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
}

function keyPressed() {
  if (gameOver && key === " ") {
    // リスタート
    gameOver = false;
    x = width / 2;
    y = height - 25;
    enemyX = random(width);
    enemyY = 0;
    enemySpeed = 10;
    score = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
