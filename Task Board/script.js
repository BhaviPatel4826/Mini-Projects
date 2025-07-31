

const lists = document.querySelectorAll('.list');
const btn = document.getElementById('generateBtn');
const toDoList = document.getElementById("list1");

let cardCount = 0; // start from 4 since you already have card1 to card3

btn.addEventListener('click', addCard);


for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}


function dragStart(e) {
    // this allows the drop location to know which element is being moved when you release it
    e.dataTransfer.setData("text/plain", this.id);
  }
  
  function dragEnd() {
    console.log("Drag ended");
  }
  
  function dragOver(e) {
    // this line is important because by default, browsers don't allow you to drop elements onto other elements.
    e.preventDefault();
  }
  
  function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
  }
  
  function dragLeave(e) {
    this.classList.remove("over");
  }
  
  function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
  
    this.appendChild(card);
    this.classList.remove('over');
  }


  function enableEditing(e){
    const card = e.target;
    const currentText = card.textContent;
    const input = document.createElement("input");
    input.type = "text";
    if(currentText != 'Add a task to do...'){
        input.value = currentText;
    }
    input.className = "edit-input";

    card.textContent = "";
    card.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => {
        card.textContent = input.value || currentText;
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
        input.blur();
        }
    });
  }

  function addCard(e) {

    const newCard = document.createElement('div');
    newCard.draggable = true;
    newCard.id = `card${cardCount++}`;
    newCard.textContent = 'Add a task to do...'
    newCard.classList.add('card');
    // Add drag events
    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);

    // Allow editing
    newCard.addEventListener("click", enableEditing);

    toDoList.appendChild(newCard);

  }