
let addBtn = document.querySelector('.add-btn');
let modale = document.querySelector('.modale-container');
let modaleFlag = false;
addBtn.addEventListener('click',(e)=>{
    // Create Modale
    
    modaleFlag = !modaleFlag;
    console.log(modaleFlag);
    if(modaleFlag){
        modale.style.display = "flex"; // modaleFlag = true Display the modale
        addBtn.style.backgroundColor = "#718093";
    } else {
        modale.style.display = "none"; // modaleFlag = false Remove the modale
        addBtn.style.backgroundColor = "grey";
    }

    // Generate Ticket
})

function createTicket(){
    let ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class','ticket-container');
    ticketContainer.innerHTML = `<div class="ticket-priority lightpink"></div>
    <div class="ticket-id">#1dc456vg</div>
    <div class="ticket-content">Hello </div>`;
    document.querySelector('.main').appendChild(ticketContainer);
}
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();
createTicket();

