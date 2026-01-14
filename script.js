
window.onload = tryagain;
let moves = 0;
let draggedImg = null;
function dragstartHandler(ev) {
    draggedImg = ev.target;
}
function dragoverHandler(ev) {
    ev.preventDefault();
}
function dropHandler(ev) {
    ev.preventDefault();
    const targetImg = ev.target.tagName === "IMG" ? ev.target : ev.target.querySelector("img");
    if (!targetImg || draggedImg === targetImg) return;
    if (ev.target.querySelector("img") && ev.target !== draggedImg.parentNode) {
        return;
    }
    const draggedParent = draggedImg.parentNode;
    const targetParent = targetImg.parentNode;
    draggedParent.appendChild(targetImg);
    targetParent.appendChild(draggedImg);
    moves++;
    document.getElementById("moves").innerText = "Moves: " + moves;
}

const divs = Array.from(document.querySelectorAll(".main >div"));

let main = document.querySelector(".main");
let winBtn = document.getElementById("winBtn")
let rstBtn = document.getElementById("reset");

function checkimg() {
    const images = Array.from(document.querySelectorAll(".main img"));
    const correct = divs.every((div, index) => {
        return divs[index].firstElementChild.id === `img${index + 1}`;
    });
    if (correct) {
        winBtn.innerHTML = " Congratulations You Win!!";
        winBtn.hidden = false;
        winBtn.classList.add("win");
        winBtn.classList.remove("loose");
        main.style.display = "none";
        document.getElementById("org").style.border = "2px solid green";
        document.getElementById("heading").style.display = "none";
        document.getElementById("check").disabled = true;
    }
    else {
        winBtn.innerHTML = "You Loose try Again!";
        winBtn.hidden = false;
        winBtn.classList.add("loose");
        winBtn.classList.remove("win");
        rstBtn.hidden = false;
    }
}
function tryagain() {
    const images = Array.from(document.querySelectorAll(".main img"));
    main.style.display = "grid";
    document.getElementById("org").style.border = "2px solid black";
    moves = 0;
    document.getElementById("moves").innerText = "Moves: 0";
    // fishe-yates shuffel
    for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    divs.forEach((div, index) => {
        div.appendChild(images[index]);
    });
    winBtn.hidden = true;
    rstBtn.hidden = true;
    document.getElementById("check").disabled = false;
}


