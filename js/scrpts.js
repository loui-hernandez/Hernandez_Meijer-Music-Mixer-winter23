function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var audioElement = document.getElementById(data);
    audioElement.play();
}

// Set up draggable items
const draggableItems = document.querySelectorAll(".audio-item");
draggableItems.forEach((item) => {
    item.ondragstart = function(event) {
        event.dataTransfer.setData("text", event.target.querySelector("audio").id);
    };
});
