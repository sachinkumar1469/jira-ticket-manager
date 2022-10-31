
let addBtn = document.querySelector('.add-btn');
let modale = document.querySelector('.modale-container');
let modaleTextarea = document.querySelector('#modaleTextarea');
let modaleFlag = false;
let arrOfTicketsObject = [];

let colors = ["lightpink","lightblue","lightgreen","black"];
let modaleCurrColor = colors[colors.length-1];

let modaleColors = document.querySelectorAll('.modaleColors');

let navPriorityColors = document.querySelectorAll('.color');
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
        createTicket(modaleCurrColor,shortid(),modaleTextarea.value);
        
        modaleFlag = false;
        modaleHandler();
        
    }
})

// Function to create a new ticket
function createTicket(priorityColor,ticketId,ticketContent){
    let ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class','ticket-container');
    ticketContainer.innerHTML = `<div class="ticket-priority ${priorityColor}"></div>
    <div class="ticket-id">#${ticketId}</div>
    <div class="ticket-content">${ticketContent}</div>
    <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>
    `;
    document.querySelector('.main').appendChild(ticketContainer);
    arrOfTicketsObject.push({priorityColor,ticketId,ticketContent});
    lockHandler(ticketContainer);
    ticketColorChangeHandler(ticketContainer);
}

// Lock button toggle
function lockHandler(ticket){
    let lockIcon = ticket.lastElementChild.children[0];
    lockIcon.addEventListener('click',(e)=>{
        let lockClassList = lockIcon.classList;
        let classListArray = Array.from(lockClassList);
        let ticketContentEl = ticket.querySelector('.ticket-content');
        // console.log(ticketContentEl);
        if(classListArray.includes('fa-lock')){
            lockIcon.classList.remove('fa-lock');
            lockIcon.classList.add('fa-lock-open');
            ticketContentEl.setAttribute('contenteditable','true');
        } else {
            lockIcon.classList.remove('fa-lock-open');
            lockIcon.classList.add('fa-lock');
            ticketContentEl.removeAttribute('contenteditable');
        }
    })
}

// Ticket priority color toggle
function ticketColorChangeHandler(ticket){
    let ticketPriorityEl = ticket.querySelector('.ticket-priority');
    ticketPriorityEl.addEventListener('click',(e)=>{
        let currColor = ticketPriorityEl.classList[1];
        ticketPriorityEl.classList.remove(currColor);
        let currIndex = colors.indexOf(currColor);
        // console.log(currIndex,"current")
        currIndex++;
        currIndex%=4;
        ticketPriorityEl.classList.add(colors[currIndex]);
        // console.log(currIndex,"next");
        
    })
}

//Event listener to select priority color for modale
modaleColors.forEach((modaleColor,index)=>{
    modaleColor.addEventListener('click',(e)=>{
        let previousSelected = colors.indexOf(modaleCurrColor);
        modaleColors[previousSelected].classList.remove("borderActive");
        // console.log(modaleColors[previousSelected].classList)
        modaleColor.classList.add("borderActive");
        modaleCurrColor = colors[index];
    })
});

// Event listener on navbar priority colors
navPriorityColors.forEach((navColor)=>{
    
    navColor.addEventListener('click',(e)=>{
        let currColor = navColor.classList[0];
        // console.log(currColor);
        let allTickets = document.querySelectorAll('.ticket-container');
        // console.log(allTickets);
        allTickets.forEach((tickets)=>{
            let firstChildOfTicket = tickets.firstElementChild;
            let ticketColor = firstChildOfTicket.classList[1];
            if(currColor===ticketColor){
                tickets.style.display="block";
            } else {
                tickets.style.display="none";              
            }
        })
        e.stopPropagation();
        console.log("first click")
    });
    navColor.addEventListener('dblclick',(e)=>{
        
        let allTickets = document.querySelectorAll('.ticket-container');
        allTickets.forEach((tickets)=>{
            tickets.style.display="block";
        })
    })
});


    








