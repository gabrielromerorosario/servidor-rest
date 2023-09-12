const TicketControl = require('../models/ticket-controller')


const ticketcontrol = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketcontrol.ultimo);
    socket.emit('estado-actual', ticketcontrol.ultimos4);
    socket.emit('ticket-pendiente',ticketcontrol.tickets.length)
    
    socket.on('siguiente-ticket', (payload, callback) => {
        
        
        const siguiente = ticketcontrol.siguiente();
        callback(siguiente);
        socket.broadcast.emit('ticket-pendiente',ticketcontrol.tickets.length);

    })

    socket.on('atender-ticket', (escritorio, callback) => {
        socket.broadcast.emit('estado-actual', ticketcontrol.ultimos4);
        socket.broadcast.emit('ticket-pendiente',ticketcontrol.tickets.length);
        const ticketPendiente = ticketcontrol.tickets.length;
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })

        }

        const ticket = ticketcontrol.atenderTicket(escritorio);
        
        if (!ticket) {
            callback({
                ok: false,
                msg: "No hay tickets para atender"
            })

        } else {
            callback({
                ok: true,
                ticket,
                ticketPendiente
                

            })
        }
        



    })
}

module.exports = {
    socketController
}