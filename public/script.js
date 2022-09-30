var socket = io('http://localhost:8383');

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>' + message.author + '</strong>:' + message.message + '</div>');
}

socket.on('previewsMessage', function(messages) {
    for (message of messages) {
        renderMessage(message);
    }

});

socket.on('receivedMessage', function(message) {

    renderMessage(message);
})


$('#chat').submit(function(ev) {
    ev.preventDefault();
    var message = $('input[name=message]').val();
    var author = $('input[name=author]').val();
    var MessageObject = { author: author, message: message, };
    renderMessage(MessageObject);
    socket.emit('sendMessage', MessageObject);
});