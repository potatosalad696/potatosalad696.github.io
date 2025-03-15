function piApproximation() {
    pointsInCircle = 0
    iteration = 1000000

    for (i = 0; i < iteration; i++) {
        point = [Math.random(), Math.random()]

        // (2x - 1)^2 + (2y - 1)^2 <= 1
        // true = inside circle
        if (Math.pow((point[0] - 1), 2) + Math.pow((point[1] - 1), 2) <= 1) {
            pointsInCircle += 1
        }
    }

    piApprox = 4 * pointsInCircle / iteration
    return piApprox
}

console.log(piApproximation())