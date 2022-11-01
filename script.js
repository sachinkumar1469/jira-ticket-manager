
let addBtn = document.querySelector('.add-btn');
let modale = document.querySelector('.modale-container');
let modaleTextarea = document.querySelector('#modaleTextarea');
let modaleFlag = false;
let arrOfTicketsObject = [];

if(JSON.parse(localStorage.getItem("objLocalStorage"))){   
    arrOfTicketsObject = [...JSON.parse(localStorage.getItem("objLocalStorage"))];
}

let removeFlag = false;
let removeBtn = document.querySelector('.remove-btn');

removeBtn.addEventListener('click',(e)=>{
    removeFlag = !removeFlag;
    if(removeFlag){
        removeBtn.style.backgroundColor = "#718093";
    } else {
        removeBtn.style.backgroundColor = "grey";
    }
})


// localStorage.setItem('arrOfTicketsObject',JSON.stringify(arrOfTicketsObject));
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

// Shift event listener on modale to create new ticket
modale.addEventListener('keydown',(e)=>{
    let key = e.key;
    
    if(key === "Shift"){
        createTicket(modaleCurrColor,shortid(),modaleTextarea.value);        
        modaleFlag = false;
        modaleHandler();       
    }
});



// Function to create a new ticket
function createTicket(priorityColor,ticketId,ticketContent){
    
    if(JSON.parse(localStorage.getItem("objLocalStorage"))){
        // console.log("local is not null");
        arrOfTicketsObject = [...JSON.parse(localStorage.getItem("objLocalStorage"))];
        // console.log(arrOfTicketsObject);
    } else {
        console.log("local is null");
    }
    arrOfTicketsObject.push({priorityColor,ticketId,ticketContent});
    localStorage.setItem("objLocalStorage",JSON.stringify(arrOfTicketsObject));
    
    renderTicket();
    
}

function renderTicket(){
    // arrOfTicketsObject = JSON.parse(localStorage.getItem("objLocalStorage"));
    objLocalStorage = JSON.parse(localStorage.getItem("objLocalStorage"));
    
    Array.from(document.querySelector('.main').children).forEach((child)=>{
        child.remove();
    })
    // console.log(Array.isArray(arrOfTicketsObject));
    if(objLocalStorage){
        objLocalStorage.forEach((ticketObject)=>{
            let ticketContainer = document.createElement('div');
            ticketContainer.setAttribute('class','ticket-container');
            ticketContainer.innerHTML = `<div class="ticket-priority ${ticketObject['priorityColor']}"></div>
            <div class="ticket-id">#${ticketObject['ticketId']}</div>
            <div class="ticket-content">${ticketObject['ticketContent']}</div>
            <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>
            `;
            document.querySelector('.main').appendChild(ticketContainer);
            lockHandler(ticketContainer);
            ticketColorChangeHandler(ticketContainer);
            removeTicketHandler(ticketContainer);
        });
    }
    
}
renderTicket();


function removeTicketHandler(ticket){
    ticket.addEventListener('click',(e)=>{
        if(removeFlag){
            ticket.remove();
            e.stopPropagation();
            
        }
        
    })
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
            let currElId = (e.target.parentElement.parentElement.querySelector('.ticket-id').textContent).slice(1);
            
            console.log(currElId);
            // console.log(arrOfTicketsObject);
            let filterReturn = arrOfTicketsObject.filter((ticketObj)=>{
                return currElId == ticketObj['ticketId']
            });
            let indexOfticket = arrOfTicketsObject.indexOf(filterReturn[0]);
            let updatedValue = e.target.parentElement.parentElement.querySelector('.ticket-content').textContent;
            arrOfTicketsObject[indexOfticket]['ticketContent'] = updatedValue;
            localStorage.setItem("objLocalStorage",JSON.stringify(arrOfTicketsObject));
            
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

        let currElId = (e.target.parentElement.querySelector('.ticket-id').textContent).slice(1);           
        console.log(currElId);
        let filterReturn = arrOfTicketsObject.filter((ticketObj)=>{
            return currElId == ticketObj['ticketId']
        });
        let indexOfticket = arrOfTicketsObject.indexOf(filterReturn[0]);
        console.log(indexOfticket);
        arrOfTicketsObject[indexOfticket]['priorityColor'] = colors[currIndex] ;
        localStorage.setItem("objLocalStorage",JSON.stringify(arrOfTicketsObject));
      
        
    })
}



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


    








