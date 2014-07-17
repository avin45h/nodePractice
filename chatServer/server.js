var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var cache = {};
var chatServer = require('./lib/chat_server');

function send404(response){
    response.writeHead(404,{'Content-Type' : 'text/plain'});
    response.write("Error 404 : No such resource found");
    response.end();
}


function sendFile(response,filePath,fileContents){
    response.writeHead(200,
            {'Content-type':mime.lookup(path.basename(filePath))}
            );
    response.end(fileContents);
}

function serveStatic(response,cache,absPath){
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    } else {
        fs.exists(absPath, function(exists){
            if(exists){
                fs.readFile(absPath,function(error,data){
                    if(error){
                        send404(response);
                    }
                    else{
                        cache[absPath] = data;
                        sendFile(response,absPath,data);
                    }
                });
            }
        });
    }
}

var server = http.createServer(function(request,response){
    var filePath = 'false';
    console.log(request.url);
    if(request.url == '/'){
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }
    var absPath = './'+filePath;
    console.log(absPath);
    serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
    console.log("Server listening at port 3000");
});

chatServer.listen(server);
