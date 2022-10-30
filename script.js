
let addBtn = document.querySelector('.add-btn');
let modale = document.querySelector('.modale-container');
let modaleTextarea = document.querySelector('#modaleTextarea');
let modaleFlag = false;

let colors = ["lightpink","lightblue","lightgreen","black"];
let modaleCurrColor = colors[colors.length-1];

let modaleColors = document.querySelectorAll('.modaleColors');

// Add btn event listener to open or close modale
addBtn.addEventListener('click',(e)=>{
    modaleFlag = !modaleFlag;
    modaleHandler();
  
})

// Function to handle modale
function modaleHandler(){  
    // console.log(modaleFlag);
    if(modaleFlag){
        modale.style.display = "flex"; // modaleFlag = true Display the modale
        addBtn.style.backgroundColor = "#718093";
    } else {
        modale.style.display = "none"; // modaleFlag = false Remove the modale
        addBtn.style.backgroundColor = "grey";
        modaleTextarea.value = "";
    }
}


// Shift event listener on modale to create new ticket
modale.addEventListener('keydown',(e)=>{
    let key = e.key;
    
    if(key === "Shift"){
        createTicket(modaleCurrColor,"1234",modaleTextarea.value);
        
        modaleFlag = false;
        modaleHandler();
        
    }
})

// Function to create a new ticket
function createTicket(priorityColor,ticketId,ticketContent){
    let ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class','ticket-container');
    ticketContainer.innerHTML = `<div class="ticket-priority ${priorityColor}"></div>
    <div class="ticket-id">${ticketId}</div>
    <div class="ticket-content">${ticketContent}</div>`;
    document.querySelector('.main').appendChild(ticketContainer);
}

//Event listener to select priority color for modale
modaleColors.forEach((modaleColor,index)=>{
    modaleColor.addEventListener('click',(e)=>{
        let previousSelected = colors.indexOf(modaleCurrColor);
        modaleColors[previousSelected].classList.remove("borderActive");
        console.log(modaleColors[previousSelected].classList)
        modaleColor.classList.add("borderActive");
        modaleCurrColor = colors[index];
    })
})





