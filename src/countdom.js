let windowWidth = 1024
let windowHeight = 768
let RADIUS = 8
let MARGIN_TOP = 60
let MARGIN_LEFT = 30

let balls = []
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]


window.onload = () => {
    windowWidth = document.body.clientWidth
    windowHeight = document.body.clientHeight

    MARGIN_LEFT = Math.round(windowWidth / 10)
    RADIUS = Math.round(windowWidth * 4 / 5 / 108) - 1
    MARGIN_TOP = Math.round(windowHeight / 5)

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = windowWidth
    canvas.height = windowHeight
    currentDate = new Date()
    setInterval(() => {
        render(ctx)
        update()
    }, 50)
}

function update() {
    const nextDate = new Date()
    const nextHours = nextDate.getHours()
    const nextMinutes = nextDate.getMinutes()
    const nextSeconds = nextDate.getSeconds()
    const currentHours = currentDate.getHours()
    const currentMinutes = currentDate.getMinutes()
    const currentSeconds = currentDate.getSeconds()

    if (nextSeconds !== currentSeconds) {
        if (parseInt(currentHours / 10) !== parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(currentHours / 10))
        }
        if (parseInt(currentHours % 10) !== parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(currentHours % 10))
        }
        if (parseInt(currentMinutes / 10) !== parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(currentMinutes / 10));
        }
        if (parseInt(currentMinutes % 10) !== parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(currentMinutes % 10));
        }
        if (parseInt(currentSeconds / 10) !== parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(currentSeconds / 10));
        }
        if (parseInt(currentSeconds % 10) !== parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }
        currentDate = nextDate
    }
    updateBalls()
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= windowHeight - RADIUS) {
            balls[i].y = windowHeight - RADIUS;
            balls[i].vy = - balls[i].vy * 0.7;
        }
    }
    balls = balls.filter((item) => {
        return item.x + RADIUS > 0 && item.x - RADIUS < windowWidth;
    });
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                const aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall)
            }
}

function render(ctx) {
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)"
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                ctx.beginPath()
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}