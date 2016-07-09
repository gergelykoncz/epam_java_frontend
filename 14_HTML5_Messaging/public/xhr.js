var btn = document.querySelector('#send');
btn.addEventListener('click', function () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4 && xhr.status === 200){
			var response = JSON.parse(xhr.responseText);
			var name = document.getElementById('name'),
				image = document.getElementById('image');

			name.innerHTML = response.name;
			image.setAttribute('src', response.image);

		}
	};

	xhr.open('GET', '/xhr', true);
	xhr.send();
});
