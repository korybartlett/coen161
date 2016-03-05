var arraySize;
var qNum;
var size;
var correct;
var attempts;
var userAnswer;
var correctAnswer;

$(document).ready(function() {

	var totalQuestions = $.getJSON("php/questionsCount.php");

	$("#btnStart").click(function(){
		$("#btnStart").hide();
		$("#btnNext").show();
		$("#btnStop").show();
		$('#btnNext').prop('disabled', true);
	});

	totalQuestions.done(function(data) {
		totalQuestions = data;
		console.log(totalQuestions);
		init(totalQuestions);
		registerEvents();
	});

});

function init(num) {
	$('#theImages').hide();
	arraySize = num;
	qNum = new Array(arraySize);
	size = qNum.length;
	correct = 0;
	attempts = 0;

	for(var i = 0; i < size; i++) {
		qNum[i] = i;
	}
}

function registerEvents() {

	$('#btn1').click(function() {
		userAnswer = 'a';
		$('#btnNext').prop('disabled', false);
		$('#btn1').css('background-color', '#27AE60');
		$('#btn2, #btn3').css('background-color', '#3498DB');
	});

	$('#btn2').click(function() {
		userAnswer = 'b';
		$('#btnNext').prop('disabled', false);
		$('#btn2').css('background-color', '#27AE60');
		$('#btn1, #btn3').css('background-color', '#3498DB');
	});

	$('#btn3').click(function() {
		userAnswer = 'c';
		$('#btnNext').prop('disabled', false);
		$('#btn3').css('background-color', '#27AE60');
		$('#btn1, #btn2').css('background-color', '#3498DB');
	});

	$('#btnStop').click(function() {
		alert("Your score: " + correct + " / " + attempts);
		location.reload();
	});

	$('#btnStart').click(function() {
		$('#theImages').show();
		$('#btn1, #btn2, #btn3').css('background-color', '#3498DB');
		var qid = randomQuestion();
		getQuestion(qid);
	});

	$('#btnNext').click(function() {
		$('#btn1, #btn2, #btn3').css('background-color', '#3498DB');
		if (userAnswer == correctAnswer)
			correct++;

		attempts++;
		$('#btnNext').prop('disabled', true);
		$('#score > p').html("your score: " + correct + ' / ' + attempts);

		var qid = randomQuestion();
		if (qid < 0) {
			alert("Your score: " + correct + " / " + attempts + "\nNo more questions!");
			return;
		}

		getQuestion(qid);
	});
}

function getQuestion(id) {
	$.ajax({
		url: 'php/questionsQuery.php?qid=' + id,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			populateFields(data);
		},
		error: function() {
			console.log('error');
		}
	});
}

function populateFields(data) {
	correctAnswer = data[7];
	$('#questionTxt').html(data[0]);
	$('#answerA').html(data[1]);
	$('#answerB').html(data[3]);
	$('#answerC').html(data[5]);
	$('.answersss1').css('background', 'url(images/' + data[2] + ')');
	$('.answersss2').css('background', 'url(images/' + data[4] + ')');
	$('.answersss3').css('background', 'url(images/' + data[6] + ')');
}

function randomQuestion() {

	var end = size - 1;
	var random = Math.floor(Math.random()*size);
	if (size == 0) {
		return -1;
	}

	var temp = qNum[random];
	qNum[random] = qNum[end];
	qNum[end] = temp;
	size--;
	return qNum[end];
}