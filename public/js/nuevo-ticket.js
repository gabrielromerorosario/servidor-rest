const lblNuevoTicket  =  document.querySelector('#lblNuevoTicket');
const btnCRear  =  document.querySelector('button');



const cliente = io();

cliente.on('connect',() => {

    btnCRear.disabled = false;
 
});



cliente.on('disconnect',() => {

    btnCRear.disabled = true;

});

cliente.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerText = 'Ticket  ' + ticket;
});




btnCRear.addEventListener('click',() => {
    
    cliente.emit('siguiente-ticket', null,(ticket) => {
        lblNuevoTicket.innerText = 'Ticket  ' + ticket;
    });
})