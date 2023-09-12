
const lblescritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const lblTicket = document.querySelector('small');
const btnCRear = document.querySelector('button');
const divalert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes')

const searchPArams = new URLSearchParams(window.location.search);

if (!searchPArams.has('escritorio')) {
    console.log(searchPArams.has('escritorio'))
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchPArams.get('escritorio');

lblescritorio.innerText = escritorio;
divalert.style.display = 'none';






const cliente = io();

cliente.on('connect', () => {

    btnAtender.disabled = false;

});





cliente.on('ticket-pendiente', (ticketPendiente) => {
    if (ticketPendiente === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = ticketPendiente;
    }

});





btnAtender.addEventListener('click', () => {



    cliente.emit('atender-ticket', { escritorio }, ({ ok, ticket ,ticketPendiente}) => {
        if (!ok) {
            lblTicket.innerText = `N/A`;

            return divalert.style.display = '';

        }
        lblTicket.innerText = `Ticket  ${ticket.numero}`;
        lblPendientes.innerText = ticketPendiente;




    });
})