var stop, staticx;
var canvas, cxt;

// 萤火虫类
function Firefly(x, y, size, brightness, speed) {
  this.x = x;
  this.y = y;
  this.size = size; // 萤火虫大小
  this.brightness = brightness; // 亮度（0-1）
  this.speed = speed; // 飞行速度
  this.vx = (Math.random() - 0.5) * speed; // X方向速度
  this.vy = (Math.random() - 0.5) * speed; // Y方向速度
  this.pulseRate = 0.02 + Math.random() * 0.03; // 闪烁频率
}

// 绘制萤火虫
Firefly.prototype.draw = function (cxt) {
  cxt.save();
  
  // 绘制发光核心
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  cxt.fillStyle = `rgba(255, 255, 180, ${this.brightness})`; // 暖黄色
  cxt.fill();
  
  // 绘制光晕
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
  cxt.fillStyle = `rgba(255, 255, 200, ${this.brightness * 0.2})`; // 淡光晕
  cxt.fill();
  
  cxt.restore();
};

// 更新萤火虫状态
Firefly.prototype.update = function () {
  // 随机改变方向（模拟不规则飞行）
  if (Math.random() < 0.05) {
    this.vx = (Math.random() - 0.5) * this.speed;
    this.vy = (Math.random() - 0.5) * this.speed;
  }
  
  // 移动位置
  this.x += this.vx;
  this.y += this.vy;
  
  // 闪烁效果
  this.brightness += this.pulseRate;
  if (this.brightness > 1 || this.brightness < 0.3) {
    this.pulseRate = -this.pulseRate; // 反转闪烁方向
  }
  
  // 边界检测（超出屏幕后从另一边出现）
  if (this.x < 0) this.x = window.innerWidth;
  if (this.x > window.innerWidth) this.x = 0;
  if (this.y < 0) this.y = window.innerHeight;
  if (this.y > window.innerHeight) this.y = 0;
};

// 萤火虫群管理
function FireflyList() {
  this.list = [];
}

FireflyList.prototype.push = function (firefly) {
  this.list.push(firefly);
};

FireflyList.prototype.update = function () {
  this.list.forEach(firefly => firefly.update());
};

FireflyList.prototype.draw = function (cxt) {
  this.list.forEach(firefly => firefly.draw(cxt));
};

// 初始化函数
function startFireflies() {
  // 兼容浏览器动画API
  requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame;
  
  // 创建画布
  canvas = document.createElement("canvas");
  staticx = true;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute("style", "position: fixed; left: 0; top: 0; pointer-events: none; z-index: 9999;");
  canvas.setAttribute("id", "canvas_fireflies");
  document.body.appendChild(canvas);
  cxt = canvas.getContext("2d");
  
  // 创建萤火虫群（15-20只）
  var fireflyList = new FireflyList();
  for (var i = 0; i < 18; i++) {
    var firefly = new Firefly(
      Math.random() * window.innerWidth, // 随机X位置
      Math.random() * window.innerHeight, // 随机Y位置
      1 + Math.random() * 1.5, // 大小（1-2.5px）
      0.5 + Math.random() * 0.5, // 初始亮度
      0.5 + Math.random() * 1.5 // 速度（0.5-2px/帧）
    );
    fireflyList.push(firefly);
  }
  
  // 动画循环
  stop = requestAnimationFrame(animate);
  
  function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    fireflyList.update();
    fireflyList.draw(cxt);
    stop = requestAnimationFrame(animate);
  }
}

// 窗口大小变化时调整画布
window.onresize = function () {
  if (canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
};

// 停止/启动动画
function toggleFireflies() {
  if (staticx) {
    var canvas = document.getElementById("canvas_fireflies");
    if (canvas) canvas.parentNode.removeChild(canvas);
    window.cancelAnimationFrame(stop);
    staticx = false;
  } else {
    startFireflies();
  }
}

// 页面加载完成后启动
window.addEventListener('load', startFireflies);
