var logs = document.getElementById('logs');

function log(text) {
	logs.innerHTML += text + '\n';
}

var employeeData = [
	{id: 1, name: "sponge", age: 11},
	{id: 2, name: "bob", age: 22}
];
var db;
var request = window.indexedDB.open("newDatabase", 1);
log('Requesting opening of newDatabase with version 1');

request.onerror = function (event) {
	console.log("error: ", event);
};

request.onsuccess = function (event) {
	log('Request was successful, we have the db instance');
	db = request.result;
};

request.onupgradeneeded = function (event) {
	log('onupgradeneeded event was triggered. The db does not exist yet, or the version was incremented');
	var db = event.target.result;
	var objectStore = db.createObjectStore("employee", {keyPath: "id"});

	for (var i in employeeData) {
		objectStore.add(employeeData[i]);
	}
};

function read() {
	var transaction = db.transaction(["employee"]);
	var objectStore = transaction.objectStore("employee");
	var request = objectStore.get(3);

	request.onsuccess = function (event) {
		// Do something with the request.result!
		if (request.result) {
			alert("Name: " + request.result.name + ", Age: " + request.result.age);
		}

		else {
			alert("Kenny couldn't be found in your database!");
		}
	};
}

function readAll() {
	var objectStore = db.transaction("employee").objectStore("employee");

	objectStore.openCursor().onsuccess = function (event) {
		var cursor = event.target.result;

		if (cursor) {
			alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age);
			cursor.continue();
		}
	};
}

function add() {
	var request = db.transaction(["employee"], "readwrite")
		.objectStore("employee")
		.add({id: 3, name: "Mr Krabs", age: 40});
}

function remove() {
	var request = db.transaction(["employee"], "readwrite")
		.objectStore("employee")
		.delete(3);
}
