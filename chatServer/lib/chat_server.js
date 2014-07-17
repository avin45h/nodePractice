var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = {};
var curentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level',1);

    io.sockets.on('connetion', function(socket){
        guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed);
        joinRoom(socket,'Lobby');

        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);
    
        socket.on('rooms',function() {
            socket.emit('rooms',io.socket.manager.rooms);
        });
        
        handleClientDisconnection(socket, nickNames, namesUsed);
    });


    
}