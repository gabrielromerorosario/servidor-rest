const lblOnline  =  document.querySelector('#lblOnline');
const lblOffline =  document.querySelector('#lblOffline');
const txtMensaje =  document.querySelector('#txtMensaje');
const btnEnviar  =  document.querySelector('#btnEnviar');



const cliente = io();

cliente.on('connect',() => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

})

cliente.on('disconnect',() => {

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';


})

cliente.on('enviar-mensaje', (payload)=>{
    console.log(payload)
})


btnEnviar.addEventListener('click',() => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '1234ABC',
        fecha: new Date().getTime()
    }
    cliente.emit('enviar-mensaje', payload,(id) => {
        console.log('Desde el server', id)
    });
})