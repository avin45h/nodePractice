var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});


app.engine('handlebars',handlebars.engine);

app.set('view engine','handlebars');

app.set('port', process.env.PORT || 4000);

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});


app.get('/',function(req,res){
    res.render('home');
});

app.get('/headers',function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ' : ' + req.headers[name] + '\n';
    res.send(s);
});


app.get('/about',function(req,res){
    res.render('about',{fortune : fortune.getFortune});
});


app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// for 404
app.use(
    function(req,res){
        res.type('text/plain');
        res.status(404);
        res.render('404');
    }
);


// for 500
app.use(
    function(req,res){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.render('500');
    }
);
