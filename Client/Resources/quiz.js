var correctAnswers = [];
fetch(window.location.href.replace('/quiz', '/answers'), {
	method: 'GET'
}).then(res => res.json())
	.then((json) => {
		correctAnswers = json;
		console.log(correctAnswers);
	});

function check(element) {
	var index = element.dataset.answerindex;
	var parentIndex = element.parentNode.dataset.questionindex;
	console.log('Clicked');
	if (!element.parentNode.className.includes('finished')) {
		if (index == correctAnswers[parentIndex]) {
			console.log('Correct Answer');
			element.style.boxShadow = '0px 0px 0px 10px #20BF55 inset';
		} else {
			element.style.boxShadow = '0px 0px 0px 10px #ed0100 inset';
			element.parentNode.getElementsByClassName('grid-element')[correctAnswers[parentIndex]].style.boxShadow = '0px 0px 0px 10px #20BF55 inset';
			element.parentNode.className = element.parentNode.className + ' finished';
		}
	}
}

document.getElementById('twitter').href = 'https://twitter.com/intent/tweet?text=Check%20out%20this%20Quiz%20' + window.location.href;