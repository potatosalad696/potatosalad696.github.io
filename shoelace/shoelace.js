vertexPairs = 3 // ik this is bad practice, but this entire website is terrible by itself, so why not?

// only for placeholders
function gooGooGaaGaa() {
    alert("goo goo gaa gaa")
    return "goo goo gaa gaa"
}

/* SHOELACE */
function getVertices() {
    x = []
    y = []

    for (i = 1; i <= vertexPairs; i++) {
        if (document.getElementById(`x${i}`).value === "" || document.getElementById(`y${i}`).value === "") {
            return "Incomplete"
        }

        x.push(document.getElementById(`x${i}`).value)
        y.push(document.getElementById(`y${i}`).value)
    }

    x.push(x[0])
    y.push(y[0])
    return [x, y]
}

function calculateArea() {
    if (getVertices() === "Incomplete") {
        return "Incomplete"
    }

    x = getVertices()[0]
    y = getVertices()[1]

    sum1 = 0
    sum2 = 0

    for (i = 0; i < vertexPairs; i++) {
        sum1 += x[i] * y[i + 1]
        sum2 += y[i] * x[i + 1]
    }

    area = Math.abs(sum1 - sum2) / 2
    return area
}

function update() {
    area = calculateArea()
    
    if (area === "Incomplete") {
        document.getElementById("area").innerHTML = "Incomplete"
    } else if (isNaN(area)) {
        document.getElementById("area").innerHTML = "Invalid"
    } else {
        document.getElementById("area").innerHTML = `Area: ${area} unit²`
        graph()
    }

    console.log("goo goo gaa gaa")
    /*

    Dear Future Developers,

    DO NOT DELETE console.log("goo goo gaa gaa")

    console.log("goo goo gaa gaa") is crucial to the longevity of the entire website.
    If you delete it, EVERYTHING WILL IRREVERSIBLY BREAK (I learned it the hard way).

    - PotatoSalad_, co-developer and co-owner of Fractals! and its related websites.
        
    */
}

/* MANAGEMENT (ADD, REMOVE, CLEAR) */
// turns out clear() doesnt work (idk why)
function clearVertices() {
    for (i = 1; i <= vertexPairs; i++) {
        document.getElementById(`x${i}`).value = ""
        document.getElementById(`y${i}`).value = ""
    }

    update()
}

function addVertex() {
    vertexPairs += 1

    // create the "container"
    const newVertex = document.createElement("div")
    newVertex.id = `vertex${vertexPairs}`
    document.getElementById("vertices").appendChild(newVertex)

    // create the content
    const vertexContent = document.createElement("span")
    vertexContent.innerHTML = `Vertex ${vertexPairs} (<input id='x${vertexPairs}' oninput='update()'>,<input id='y${vertexPairs}' oninput='update()'>)`
    document.getElementById(`vertex${vertexPairs}`).appendChild(vertexContent)

    update()
}

function removeVertex() {
    if (vertexPairs <= 3) {
        update()
        return
    }

    const vertexToRemove = document.getElementById(`vertex${vertexPairs}`)
    vertexToRemove.remove()

    vertexPairs -= 1
    update()
}

function resetVertices() {
    clearVertices()

    for (i = 4; i <= vertexPairs; i++) {
        const vertexToRemove = document.getElementById(`vertex${i}`)
        vertexToRemove.remove()
    }

    vertexPairs = 3
    update()
}

/* GRAPH */
board = JXG.JSXGraph.initBoard("jxgbox", {
    grid: {
        theme: 3 // with minor grids
    }
})

xAxis = board.create("axis", [[-1, 0], [1, 0]], {
    ticks: {
        strokeColor: "blue",
        strokeWidth: 2,
        minorticks: 3,
        majorHeight: 10,
        drawZero: true
    }
})

yAxis = board.create("axis", [[0, -1], [0, 1]], {
    ticks: {
        strokeColor: "green",
        strokeWidth: 2,
        minorticks: 3,
        majorHeight: 10,
        drawZero: true
    }
})

grid = board.create("grid", [xAxis, yAxis])

function graph() {
    x = getVertices()[0]
    y = getVertices()[1]
    pointPairs = []

    for (i = 0; i < vertexPairs; i++) {
        pair = [x[i], y[i]]
        pointPairs.push(pair)

        p = board.create("point", [x[i], y[i]], {
            name: `Vertex ${i + 1}`,
            fixed: true
        })
    }

    s = board.create("polygon", pointPairs)
}