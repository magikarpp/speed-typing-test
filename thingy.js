let visible = 0; // 0 = inactive; 1 = active;
let curr_word_num = 0;
let word_count = 0;
let wrong_count = 0;
let correct_count = 0;
let start_time = 0;


let testing = "";
let words = testing.split(" ");
let letters = words[curr_word_num].split("");
let tempWord = "";
let tempPara = words;

let paragraph = document.getElementById("paragraph");
let start_button = document.getElementById("start-button");
let text_box = document.getElementById("text-box");
let cancel_button = document.getElementById("cancel-button");
let curr_word = document.getElementById("word");
let score_screen = document.getElementById("score_screen");

document.addEventListener("DOMContentLoaded", main);
start_button.addEventListener("click", start);
cancel_button.addEventListener("click", start);
text_box.addEventListener("keyup", inputCheck);

function randomParagraph(){
	let things = [];
	things[0] = "Hello World! This is my first testing paragraph - though it may not be that good, it's something to test this out on.";
	things[1] = "Just something simple. No punctuations or complicated/eccentric words in this one. Oh, no - not at all, good friend.";
	things[2] = "Maybe, just maybe, one day, in the grand scheme of this all, we will all find a place to settle down. Will you?";
	things[3] = "\"Oh my!\" said the old man, \"Was that you in the back of the spaceship that I found in my shoe?\ My deepest apologies.\"";
	things[4] = "How are you today? I'm fabulous, wonderful, and superb! Why, you ask? 1) The sun is shining, 2) The birds are chirping, 3) And we're coding.";

	return things[Math.floor(Math.random() * things.length)];
}

function main(){
	text_box.style.visibility = "hidden";
	cancel_button.style.visibility = "hidden";
	score_screen.style.visibility = "hidden";

	paragraph.innerHTML = testing;
	curr_word.innerHTML = words[curr_word_num];

}

function start(){
	if(visible == 0){ //Start

		paragraph.innerHTML = "Ready";
		curr_word.innerHTML = "";
		setTimeout(function(){
			paragraph.innerHTML = "Set";
		}, 1500);
		setTimeout(function(){
			paragraph.innerHTML = "Go!";
		}, 2500);
		setTimeout(function(){
			start_button.style.visibility = "hidden";
			text_box.style.visibility = "visible";
			cancel_button.style.visibility = "visible";
			score_screen.style.visibility = "hidden";
			text_box.value = "";
			text_box.focus();

			curr_word_num = 0;
			word_count = 0;
			wrong_count = 0;
			correct_count = 0;
			start_time = 0;

			testing = randomParagraph();
			words = testing.split(" ");
			letters = words[curr_word_num].split("");
			tempWord = "";
			tempPara = words;

			paragraph.innerHTML = testing;
			curr_word.innerHTML = words[curr_word_num];

			start_time = performance.now();

			visible = 1;
		}, 3500);

	} else{ //Cancel
		start_button.style.visibility = "visible";
		text_box.style.visibility = "hidden";
		cancel_button.style.visibility = "hidden";
		score_screen.style.visibility = "hidden";

		visible = 0;
		curr_word_num = 0;
	}
}

function inputCheck(event){
	if(event.which == 32){
		if(text_box.value == " " || text_box.value == undefined){
			tempWord = words[curr_word_num];
		}

		tempPara[curr_word_num] = tempWord;

		let tempitytemp = "";
		for(let i = 0; i < tempPara.length; i++){
			tempitytemp += tempPara[i] + " ";
		}

		paragraph.innerHTML = tempitytemp;

		curr_word_num++;
		if(curr_word_num > words.length - 1){
			finish();
		} else {
			curr_word.innerHTML = words[curr_word_num];
			letters = words[curr_word_num].split("");
			text_box.value = "";
		}
	} else{
		if(text_box.value.length <= words[curr_word_num].length){
			let tempArr = letters;
			for(let i = 0; i < text_box.value.length; i++){
				if(text_box.value[i] == words[curr_word_num][i]){
					tempArr[i] = "<span id=\"correct\">" + words[curr_word_num][i] + "</span>";
				} else{
					tempArr[i] = "<span id=\"wrong\">" + words[curr_word_num][i] + "</span>";
				}
			}

			tempWord = "";
			for(let i = 0; i < tempArr.length; i++){
				tempWord += tempArr[i];
			}

			curr_word.innerHTML = tempWord;
		}
	}
}

function finish(){
	start_button.style.visibility = "visible";
	text_box.style.visibility = "hidden";
	cancel_button.style.visibility = "hidden";
	visible = 0;
	curr_word_num = 0;

	score_screen.style.visibility = "visible";

	for(let i = 0; i < tempPara.length; i++){
		if(!tempPara[i].includes("id=\"correct\"") || tempPara[i].includes("id=\"wrong\"")){
			wrong_count++;
		} else{
			correct_count++;
		}
		word_count++;
	}

	let acc = Math.round(100*(correct_count/word_count)*100)/100;
	let total_time = Math.round(100*(performance.now() - start_time)/1000)/100;

	document.getElementById("score").innerHTML = Math.round(100*tempPara.length/(total_time/60))/100 + " words/min";
	document.getElementById("accuracy").innerHTML = acc + "%";
	document.getElementById("time").innerHTML = total_time + "s";
}
