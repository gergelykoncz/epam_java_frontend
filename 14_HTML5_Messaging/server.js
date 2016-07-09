var express = require('express');
var app = express();
var ws = require("nodejs-websocket")
var bulba = {
		name: 'Bulbasaur',
		id: 1,
		image: 'http:\/\/pokeapi.co\/media\/sprites\/pokemon\/1.png'
	},
	chari = {
		name: 'Charizard',
		id: 2,
		image: 'http:\/\/pokeapi.co\/media\/sprites\/pokemon\/6.png'
	};

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/xhr', function (req, res) {
	res.json(bulba);
});

app.all('/sse', function (req, res) {
	res.writeHead(200, {
		'Connection': 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache'
	});
	var even = true;
	setInterval(function () {
		var poke = even ? bulba : chari;
		even = !even;
		res.write('id: 1\ndata: ' + JSON.stringify(poke) + '\n\n');
	}, 1000);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection");
	conn.on("text", function (str) {
		console.log("Received " + str);
		conn.sendText(str.toUpperCase() + "!!!")
	});
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	});
}).listen(8001);

var chatServer = ws.createServer(function (conn) {
	console.log("New connection");
	conn.name = 'Random' + conn.key;
	conn.on("text", function (str) {
		chatServer.connections.forEach(function (stored) {

			if (conn.key !== stored.key) {
				var message = {
					name: conn.name,
					msg: str
				};
				stored.sendText(JSON.stringify(message));
			}
		});
	});
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	});
}).listen(8002);