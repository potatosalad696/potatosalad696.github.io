let vertexPairs = 3 // ik this is bad practice, but this entire website is terrible by itself, so why not?

// only for placeholders
function gooGooGaaGaa() {
    alert("goo goo gaa gaa")
    return "goo goo gaa gaa"
}

/* SHOELACE */
function getVertices() {
    let x = []
    let y = []

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

    let x = getVertices()[0]
    let y = getVertices()[1]

    let sum1 = 0
    let sum2 = 0

    for (i = 0; i < vertexPairs; i++) {
        sum1 += x[i] * y[i + 1]
        sum2 += y[i] * x[i + 1]
    }

    let area = Math.abs(sum1 - sum2) / 2
    return area
}

function update() {
    clearGraph()
    
    let area = calculateArea()
    
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
    let newVertex = document.createElement("div")
    newVertex.id = `vertex${vertexPairs}`
    document.getElementById("vertices").appendChild(newVertex)

    // create the content
    let vertexContent = document.createElement("span")
    vertexContent.innerHTML = `Vertex ${vertexPairs} (<input id='x${vertexPairs}' oninput='update()'>,<input id='y${vertexPairs}' oninput='update()'>)`
    document.getElementById(`vertex${vertexPairs}`).appendChild(vertexContent)

    update()
}

function removeVertex() {
    if (vertexPairs <= 3) {
        update()
        return
    }

    let vertexToRemove = document.getElementById(`vertex${vertexPairs}`)
    vertexToRemove.remove()

    vertexPairs -= 1
    update()
}

function resetVertices() {
    clearVertices()

    for (i = 4; i <= vertexPairs; i++) {
        let vertexToRemove = document.getElementById(`vertex${i}`)
        vertexToRemove.remove()
    }

    vertexPairs = 3
    update()
}

/* GRAPH */
let board = JXG.JSXGraph.initBoard("jxgbox", {
    grid: {
        theme: 3 // with minor grids
    }
})

let xAxis = board.create("axis", [[-1, 0], [1, 0]], {
    ticks: {
        strokeColor: "blue",
        strokeWidth: 2,
        minorticks: 3,
        majorHeight: 10,
        drawZero: true,
    }
})

let yAxis = board.create("axis", [[0, -1], [0, 1]], {
    ticks: {
        strokeColor: "green",
        strokeWidth: 2,
        minorticks: 3,
        majorHeight: 10,
        drawZero: true,
    }
})

board.create("grid", [xAxis, yAxis])

function graph() {
    let x = getVertices()[0]
    let y = getVertices()[1]

    for (i = 0; i < vertexPairs; i++) {
        board.create("point", [x[i], y[i]], {
            name: `Vertex ${i + 1}`,
            fixed: true
        })
    }

    board.create("polygon", [...Array(vertexPairs).keys()].map(i => `Vertex ${i + 1}`), {
        name: "Polygon"
    })
}

function clearGraph() {
    board.removeObject("Polygon")

    for (i = 1; i <= vertexPairs; i++) {
        board.removeObject(`Vertex ${i}`)
    }
}