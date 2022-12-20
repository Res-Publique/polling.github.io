let lock = false
console.log("asdasd")

let guys = [
    "Коля Галиуллин",
    "Максим Король",
    "Дима Белоус",
    "Даня Холац",
    "Рома Солецкий",
    "Ярик Видрук",
    "Денис Дьячков",
    "Рэм Логинов",
    "Женя Песня",
    "Леша Пушкарев",
    "Рома Саркисян",
    "Мигаль Салех",
    "Катя Зелинская",
    "Маргарита Крылова",
]
let pairs = []
let pts = []
let currentPairIndex = -1
const text1 = $('#op-text-1')[0]
const text2 = $('#op-text-2')[0]

const ava = $("#ava")[0]
const initialPoll = $("#pick-self")[0]
const mianPoll = $("#poll")[0]
const exportMsg = $("#export")[0]
const rating = $("#rating")[0]
const ratingContent = $("#rating-content")[0]
const sub = $("#sub-msg")[0]
console.log(initialPoll)
initialPoll.style.display = "none"
rating.style.display = "none"
mianPoll.style.display = "none"
exportMsg.style.display = "none"
sub.style.display = "none"

function askWhoAreYou() {
    const placeholder = $(".poll-ops-placeholder")[0]
    for (const guy of guys) {
        const op = document.createElement("div")
        op.classList.add("poll-op")
        op.classList.add("initial-poll")
        const circle = document.createElement("div")
        circle.classList.add("circle")
        op.appendChild(circle)
        const name = document.createElement("div")
        name.classList.add("op-text")
        name.textContent = guy
        op.appendChild(name)
        placeholder.appendChild(op)
    }
}

function makePairs() {
    const rootGuys = makeShuffledGuys()
    let resultPairs = []
    for (let i = 0; i < rootGuys.length - 1; i++) {
        for (let j = i + 1; j < rootGuys.length; j++) {
            resultPairs.push(shuffle([rootGuys[i], rootGuys[j]]))
        }
    }
    return shuffle(resultPairs)
}

askWhoAreYou()

$(".poll-op").each((i, e) => {
    console.log("asdaweq")
    e.addEventListener("click", () => {
        if (lock) { return }
        lock = true
        setTimeout(() => {
            lock = false
        }, 500)
        if (e.classList.contains('initial-poll')) {
            handleInitialPoll(i, e)
        } else {
            handleMainPoll(i, e)
        }
        const c = e.querySelector(".circle")
        // c.style.backgroundColor = "rgb(255, 251, 0)";
        // c.style.borderColor = "rgb(255, 251, 0)";
        e.style.backgroundColor = "#535353"
        setTimeout(() => {
            // c.style.borderColor = "#535353";
            // c.style.backgroundColor = "#3C3C3C";
            e.style.backgroundColor = "#3C3C3C"
        }, 300)
    })
})

function showNextPair() {
    currentPairIndex++
    if (currentPairIndex >= pairs.length) {
        hideMessage(rating, () => {
            updateRating()
            showMsg(rating)
            showMsg(sub)
        })
        hideMessage(mianPoll, () => {
            showMsg(exportMsg)
        })
        return
    }
    setTimeout(() => {
        hideMessage(rating, () => {})
        hideMessage(mianPoll, () => {
            updateNames()
            updateRating()
            showMsg(mianPoll)
            showMsg(rating)
        })
    }, (currentPairIndex < 1) ? 0 : 0)
}
function updateNames() {
    const pair = pairs[currentPairIndex]
    console.log(text1)
    text1.textContent = pair[0]
    text2.textContent = pair[1]
}
function updateRating() {
    let newHtml = ""
    if (currentPairIndex >= pairs.length) {
        newHtml = "Реузльтат (можно скопировать в конфу) <br><br>"
    } else {
        newHtml = "Опрос №" + (currentPairIndex + 1) + " из " + pairs.length + "<br><br>"
    }
    var items = Object.keys(pts).map(function(key) {
        return [key, pts[key]];
    })
    items.sort(function(first, second) {
        return second[1] - first[1];
    })
    
    for (const item of items) {
        newHtml += item[0] + ": " + item[1].toFixed(1) + "<br/>"
    }
    console.log(rating.firstChild)
    ratingContent.innerHTML = newHtml
}

function handleInitialPoll(index, element) {
    guys.splice(index, 1)
    for (const guy of guys) {
        pts[guy] = 1400.0
    }
    pairs = makePairs()

    setTimeout(() => {
        hideMessage(initialPoll, () => {
            showNextPair()
        })
    }, 0)
}
function makeShuffledGuys() {
    return shuffle(guys.map((v, i) => i)).map(e => guys[e])
}
function shuffle(array) {
    var result = Array(...array)
    for (let i = result.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result
}

function handleMainPoll(i, e) {
    adjustRating(e.id.indexOf("1") !== -1)
    console.log(pts)
    showNextPair()
}

function adjustRating(firstWins) {
    const pair = pairs[currentPairIndex]
    const r1 = pts[pair[0]]
    const r2 = pts[pair[1]]
    const e1 = 1 / (1 + Math.pow(10, (r2 - r1) / 400.0))
    const e2 = 1 / (1 + Math.pow(10, (r1 - r2) / 400.0))
    const newR1 = r1 + 32 * ((firstWins ? 1 : 0) - e1)
    const newR2 = r2 + 32 * ((firstWins ? 0 : 1) - e2)
    pts[pair[0]] = newR1
    pts[pair[1]] = newR2
}

$("#export").click(() => {
    navigator.clipboard.writeText("asdawd").then(() => {
        alert("Скопировано в буфер обмена")
    }, () => {
        alert("Все пошло по пизде")
    })
})

function showMsg(e) {
    e.style.display = "block"
    setTimeout(() => {
        e.style.margin = "0.5em auto"
        e.style.opacity = "1"
    }, 300)
}
function hideMessage(e, callback) {
    setTimeout(() => {
        e.style.margin = "1.5em auto"
        e.style.opacity = "0"
        setTimeout(() => {
            e.style.display = "none"
            callback()
        }, 200)
    }, 100)
}
showMsg(ava)
setTimeout(() => {
    showMsg(initialPoll)
}, 500)