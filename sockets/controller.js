const TicketControl = require('../models/ticket-controller')


const ticketcontrol = new TicketControl();
const socketController = (socket) => {
    console.log('Cleinte Conectado', socket.id)    

    socket.on('disconnect', () => {
        console.log('Cleinte Desconectado', socket.id)
    })

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = 123456

        callback(id)
        socket.broadcast.emit('enviar-mensaje', payload)
    })
}

module.exports = {
    socketController
}