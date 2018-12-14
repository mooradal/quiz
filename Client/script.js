var landingText = document.getElementsByClassName('landing-text')[0];
const word = 'The World of Quiz Creativity';
var blink = true;
for (var i = 0;i < word.length;i++) {
	setTimeout(() => {landingText.innerText = word.slice(0,i);console.log('for ')},200*i);
}
setTimeout(() => {
	setInterval(() => {loop()},700);
},6600);


function loop() {
	landingText.innerText = blink ? landingText.innerText + ' |' : landingText.innerText.slice(0,-2);
	blink = !blink;
	console.log('looped');
}