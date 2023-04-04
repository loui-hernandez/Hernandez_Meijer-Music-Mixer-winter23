(() => {
    const theSoundwave = document.querySelectorAll("#buttonHolder img"),
        icons = document.querySelector(".drop-area"),
        instruments = document.querySelectorAll('.instruments img'),
        dropZones = document.querySelectorAll(".drop-zone");

    // Change background image of the puzzle board
    function changeBgImg() {
        icons.style.backgroundImage = `url(img/backGround${this.dataset.bgref}.jpg)`;
    }

    // Allow dragging of instrument icons
    function allowDrag(event) {
        console.log("started dragging");
        event.dataTransfer.setData("draggedEl", this.id);
    }

    // Allow drag over drop zones
    function allowDragOver(event) {
        event.preventDefault();
    }

    // Allow dropping instrument icons on drop zones
    function allowDrop(event) {
        event.preventDefault();
        console.log("dropped");

        const droppedElId = event.dataTransfer.getData("draggedEl");
        const droppedElement = document.querySelector(`#${droppedElId}`);
        const audioId = "audio_" + droppedElId;
        let audio = document.getElementById(audioId);

        if (this.childNodes.length === 0 && this.classList.contains("drop-zone")) {
            this.appendChild(droppedElement);

            if (!audio) {
                audio = document.createElement("audio");
                audio.id = audioId;
                audio.src = 'audio/' + droppedElement.dataset.trackref + '.mp3';
                audio.loop = true;
                document.body.appendChild(audio);
            }

            audio.play();
        } else if (!this.classList.contains("drop-zone")) {
            const originalZone = document.querySelector('.instruments');
            originalZone.appendChild(droppedElement);

            if (audio) {
                audio.pause();
            }
        }
    }

    theSoundwave.forEach(item => item.addEventListener("click", changeBgImg));
    instruments.forEach(piece => piece.addEventListener('dragstart', allowDrag));

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", allowDragOver);
        zone.addEventListener("drop", allowDrop);
    });

    const originalZone = document.querySelector('.instruments');
    originalZone.addEventListener("dragover", allowDragOver);
    originalZone.addEventListener("drop", allowDrop);

})();
