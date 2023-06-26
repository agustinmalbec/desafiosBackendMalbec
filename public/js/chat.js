const socket = io();
const inputMessage = document.getElementById('message');

inputMessage.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        let msj = inputMessage.value;
        if (msj.trim().length > 0) {
            socket.emit('sendMessage', msj);
            inputMessage.value = '';
        }
    }
});


function render(data) {
    const html = data.map((elem) => {
        return `<div>
                <em>${elem.message}</em>
            </div>`;
    })
        .join(' ');
    document.getElementById('history').innerHTML = html;
}

socket.on('messages', (data) => {
    render(data);
});