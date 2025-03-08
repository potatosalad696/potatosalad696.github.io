vertexPairs = 3 // ik this is bad practice, but this entire website is terrible by itself, so why not?

function gooGooGaaGaa() {
    alert("goo goo gaa gaa")
    return "goo goo gaa gaa"
}

/* SHOELACE */
function getVertices() {
    x = []
    y = []

    for (i = 1; i <= vertexPairs; i++) {
        x.push(document.getElementById(`x${i}`).value)
        y.push(document.getElementById(`y${i}`).value)
    }

    x.push(x[0])
    y.push(y[0])
    return [x, y]
}

function calculateArea() {
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
    document.getElementById("area").innerHTML = `Area: ${area} unit(s)`

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
function _clear() {
    for (i = 1; i <= vertexPairs; i++) {
        document.getElementById(`x${i}`).value = ""
        document.getElementById(`y${i}`).value = ""
    }

    document.getElementById("area").innerHTML = "Area:"
}