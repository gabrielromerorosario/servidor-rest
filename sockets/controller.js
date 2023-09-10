const TicketControl = require('../models/ticket-controller')


const ticketcontrol = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket',ticketcontrol.ultimo);

    socket.on('siguiente-ticket', (payload, callback) => {
       const siguiente = ticketcontrol.siguiente();
       callback(siguiente);

    })

    socket.on('atender-ticket', (escritorio, callback) => {
      
        if (!escritorio) {
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            })
            
        }
 
     })
}

module.exports = {
    socketController
}