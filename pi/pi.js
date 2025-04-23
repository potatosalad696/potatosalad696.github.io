let points = 0
let outside = 0
let inside = 0

let increment // for incrementer

let bestApprox = 0
let pointsAtBest = 0
let insideAtBest = 0

function isPointInside() {
    let point = [2 * Math.random() - 1, 2 * Math.random() - 1]

    if (Math.pow(point[0], 2) + Math.pow(point[1], 2) <= 1) {
        inside += 1
    } else {
        outside += 1
    }
}

function piApproximation() {
    return (inside / points) * 4
}

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b]
    }

    return a
}

function updatePi() {
    points += 1

    isPointInside()
    const approx = piApproximation()

    if (Math.abs(approx - Math.PI) < Math.abs(bestApprox - Math.PI)) {
        bestApprox = approx
        pointsAtBest = points
        insideAtBest = inside
    }

    document.getElementById("approx").innerHTML = `π ≈ ${approx}`
    document.getElementById("error").innerHTML = `Error = ${approx - Math.PI}`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`

    document.getElementById("best").innerHTML = `Best approximation: ${bestApprox} (${insideAtBest * 4 / gcd(pointsAtBest, insideAtBest * 4)}/${pointsAtBest / gcd(pointsAtBest, insideAtBest * 4)})`
    document.getElementById("besterror").innerHTML = `Error = ${bestApprox - Math.PI}`
}

function incrementer() {
    increment = setInterval(updatePi, 10)
}

function stopIncrementer() {
    clearInterval(increment)
}

function reset() {
    points = 0
    outside = 0
    inside = 0

    bestApprox = 0
    pointsAtBest = 0
    insideAtBest = 0

    stopIncrementer()

    document.getElementById("approx").innerHTML = `π ≈ 0`
    document.getElementById("error").innerHTML = `Error = ${0 - Math.PI}`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`

    document.getElementById("best").innerHTML = `Best approximation: ${bestApprox} (N/A)`
    document.getElementById("besterror").innerHTML = `Error = ${bestApprox - Math.PI}`
}