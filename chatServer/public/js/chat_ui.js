function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemElement(messaage){
    return $('<div></div>').html('<i>' + message + '</i>');
}


function processUserInput(chaApp, socket) {
    var message = $('#send-message').val();
    var systemMessage;

    if(message.charAt[0] == '/'){
        sysemMessage = chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }
    else {
        chatApp.sendMessage($('#room').text(),message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}


