const newNotes = document.querySelector(".new-notes button");
const writeArear = document.querySelector(".write");

let allNotes = 0;

newNotes.addEventListener("click" , () => {
    writeArear.classList.remove("hide");
});

const addNote = document.querySelector(".add-btn button");

const cardsContainer = document.querySelector(".cards");

const originalCard = document.querySelector(".card");
let notesCount = document.querySelector(".notes-count");
let title = document.querySelector(".content input");
let note = document.querySelector(".content textarea");



// Creating new cards on click

// Tag mechanism
let greenCount = 0;
let blueCount = 0;
let redCount = 0;
let yellowCount = 0;
const allTags = document.querySelectorAll(".note-tag span");
let selectedTag = [];
allTags.forEach( tag => {
    tag.addEventListener("click" , () => {
        selectedTag[0] = tag.classList[0];
        selectedTag[1] = tag.querySelector("p").innerText;
        allTags.forEach( t => {
            t.classList.remove("clicked");
        });
    
        tag.classList.add("clicked");
    });
});

const category = document.querySelector(".ctg");
function update(cls , count){
    let tagClass = "." + cls + " .count";
    category.querySelector(tagClass).innerText = count;

    category.querySelector(".purple .count").innerText = greenCount + blueCount + redCount + yellowCount;
}
function increaseTagCount(){
    if(selectedTag[0] == "green"){
        greenCount++;
        update("green" , greenCount);
    }
    else if(selectedTag[0] == "blue"){
        blueCount++;
        update("blue" , blueCount);
    }
    else if(selectedTag[0] == "red"){
        redCount++;
        update("red" , redCount);
    }
    else if(selectedTag[0] == "yellow"){
        yellowCount++;
        update("yellow" , yellowCount);
    } 


}
function addTag(card) {
    card.classList.remove("none");
    card.classList.add(selectedTag[0]);
    increaseTagCount();
    let tag = card.querySelector(".tag span");
    tag.classList.remove("none");
    tag.classList.add(selectedTag[0]);
    tag.querySelector("p").innerText = selectedTag[1];
}

addNote.addEventListener("click" , () =>{
    const newCard = originalCard.cloneNode(true);
    newCard.querySelector("h5").innerText = title.value;
    newCard.querySelector("p").innerText = note.value;

    let dateTime = new Date().toLocaleString();
    newCard.querySelector(".date").innerText = dateTime;
    
    addTag(newCard);

    title.value = "";
    note.value = "";

    allNotes++;
    notesCount.innerText = allNotes;

    cardsContainer.appendChild(newCard);

});

// Remove card when deleate button was clicked

function decreaseTagCount(cls){
    if(cls == "green"){
        greenCount--;
        update("green" , greenCount);
    }
    else if(cls == "blue"){
        blueCount--;
        update("blue" , blueCount);
    }
    else if(cls == "red"){
        redCount--;
        update("red" , redCount);
    }
    else if(cls == "yellow"){
        yellowCount--;
        update("yellow" , yellowCount);
    }
}
cardsContainer.addEventListener("click" , (e) => {
    if(e.target.classList.contains("delete")) {
        e.target.closest(".card").remove();
    }
    allNotes--;
    notesCount.innerText = allNotes;
    let cls = e.target.closest(".card").classList[1];
    decreaseTagCount(cls);
});

// Edit the card

const editBtn = document.querySelector(".edit");

function editCard(card) {
    let heding = card.querySelector(".card-ttl h5");
    let content = card.querySelector(".card-cont p");
    title.value = heding.innerText;
    note.value = content.innerText;
}

cardsContainer.addEventListener("click" , (e) => {
    if(e.target.classList.contains("edit")){
        let currentCard = e.target.closest(".card");
        editCard(currentCard);
        currentCard.remove();
    }
});

// Theam button

const theamIcon = document.querySelector(".theam-icon");
const main = document.querySelector(".main-cont");
let isDark = false;
theamIcon.addEventListener("click" , () => {
    if(isDark == false){
        main.style.background = "#1e1e1e";
        theamIcon.style.color = "white";
        isDark = true;
    }
    else{
        main.style.background = "#f8f9fa";
        theamIcon.style.color = "black";
        isDark = false;
    }
});
