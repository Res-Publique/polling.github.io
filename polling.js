let lock = false
console.log("asdasd")\

$(".poll-op").each((i, e) => {
    console.log("asdaweq")
    e.addEventListener("click", () => {
        if (lock) { return }
        lock = true
        setTimeout(() => {
            lock = false
        }, 1000)
        console.log("click")
        e.style.backgroundColor = "#535353"
        setTimeout(() => {
            e.style.backgroundColor = "#3C3C3C"
        }, 300)
        e.animate({
            backgroundColor: "#3C3C3C"
        }, 300)
        // e.classList.add("clicked-op")
    })
})
$("#export").click(() => {
    navigator.clipboard.writeText("asdawd").then(() => {
        alert("Скопировано в буфер обмена")
    }, () => {
        alert("Все пошло по пизде")
    })
})