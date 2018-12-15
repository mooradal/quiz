fetch(window.location.href.replace('quiz','answers'),{
	method:'GET'
}).then(res => res.json())
	.then(json => console.log(json))