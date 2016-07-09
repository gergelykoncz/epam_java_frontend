var log = document.querySelector('#log'),
	btn = document.getElementById('send'),
	msg = document.querySelectorAll('input')[0];

var socket = new WebSocket("ws://localhost:8002");

socket.onmessage = function (e) {
	var res = JSON.parse(e.data);
	log.innerHTML += res.name + ': ' + res.msg + '\n';
};

btn.addEventListener('click', function () {
	socket.send(msg.value);
	log.innerHTML += 'You: ' + msg.value + '\n';
	msg.value = '';
});