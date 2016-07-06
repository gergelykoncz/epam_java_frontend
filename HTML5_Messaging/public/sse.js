var src = new EventSource('/sse');
src.onmessage = function (event) {
	var response = JSON.parse(event.data);
	var name = document.getElementById('name'),
		image = document.getElementById('image');

	name.innerHTML = response.name;
	image.setAttribute('src', response.image);
};