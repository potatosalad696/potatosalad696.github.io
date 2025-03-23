let points = 0
let outside = 0
let inside = 0

let increment // for incrementer

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

function updatePi() {
    points += 1

    isPointInside()
    const approx = piApproximation()

    document.getElementById("approx").innerHTML = `π ≈ ${approx}`
    document.getElementById("error").innerHTML = `Error = ${approx - Math.PI}`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`
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

    stopIncrementer()

    document.getElementById("approx").innerHTML = `π ≈ 0`
    document.getElementById("error").innerHTML = `Error = ${0 - Math.PI}`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`
}