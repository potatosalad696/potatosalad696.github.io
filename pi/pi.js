let points = 0
let outside = 0
let inside = 0

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

function update() {
    points += 1

    isPointInside()
    const approx = piApproximation()

    document.getElementById("approx").innerHTML = `π ≈ ${approx} (${Math.abs(Math.PI - approx)} off)`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`
}

function reset() {
    points = 0
    outside = 0
    inside = 0

    document.getElementById("approx").innerHTML = `π ≈ 0 (${Math.PI} off)`
    document.getElementById("points").innerHTML = `${points} point(s) (${inside} inside, ${outside} outside)`
}