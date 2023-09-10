
const lblescritorio  =  document.querySelector('h1');
const btnAtender  =  document.querySelector('button');
const lblNuevoTicket  =  document.querySelector('#lblNuevoTicket');
const btnCRear  =  document.querySelector('button');

const searchPArams = new URLSearchParams(window.location.search);

if (!searchPArams.has('escritorio')) {
    console.log(searchPArams.has('escritorio'))
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchPArams.get('escritorio');

lblescritorio.innerText = escritorio;




const cliente = io();

cliente.on('connect',() => {

    btnAtender.disabled = false;
 
});



cliente.on('disconnect',() => {

    btnAtender.disabled = true;

});

cliente.on('ultimo-ticket', (ticket) => {
    //lblNuevoTicket.innerText = 'Ticket  ' + ticket;
});




btnAtender.addEventListener('click',() => {

    
    
    cliente.emit('atender-ticket', {escritorio},(payload) => {
        console.log(payload)
    });
})