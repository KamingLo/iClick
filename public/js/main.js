const socket = io();
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const nameInput = document.getElementById('name-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

function sendMessage() {
    if (messageInput.value.trim()) {
        const data = {
            text: messageInput.value,
            name: nameInput.value,
            dateTime: new Date()
        };
        socket.emit('chat message', data);
        messageInput.value = '';
    }
}

socket.on('chat message', (data) => {
    addMessageToUI(data);
});

socket.on('clients-total', (total) => {
    // Update connected clients count if needed
    console.log('Connected clients:', total);
});

function addMessageToUI(data) {
    const messageElement = document.createElement('li');
    messageElement.className = `message-${data.name === nameInput.value ? 'right' : 'left'}`;
    
    messageElement.innerHTML = `
        <p class="message">
            ${data.text}
            <span>${data.name} ● ${new Date(data.dateTime).toLocaleTimeString()}</span>
        </p>
    `;
    
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}