function runQuiz(element) {
	var id = element.dataset.quizid;
	window.location.href = `${window.location.href.replace('/quizzes','')}/quiz?id=${id}`;
}

