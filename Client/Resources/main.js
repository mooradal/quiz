function runQuiz(element) {
	var id = element.dataset.quizid;
	window.location.href = `http://localhost:4000/quiz?id=${id}`;
}

