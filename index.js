0
const questions = [
	{
	 'question':	'What is the state bird?',
	 'answers': ["Bald Eagle","Scrubhouse Jay","California Gull","Mocking Jay"],
	 'correct': 2
	},
	{
	 'question': 'What is the state nickname that was inspired by a very industrious animal?',
	 'answers': ["The Beaver State", "The Beehive State", "The Termite State", "The Leafcutter State"],
	 'correct':  1
	},
	{
	 'question': "How many national parks are located within the state of Utah?",
	 'answers': ["5","1","6","4"],
	 'correct':  0
	},
	{
	'question': "Utah has over 11,000 miles of fishing streams and more than 147,000 acres of lakes and reservoirs. What is the state fish?",
	'answers': ["Lake Trout","Bonneville Cutthroat Trout","Red Lipped Batfish","Ramora Fish"],
	'correct':  1
	},
	{
	'question': "Utah is famous for its skiing terrain and powdery dry snow. What is the annual average snowfall for the mountains near Salt Lake City?",
  'answers': ["200 inches", "100 inches", "800 inches" , "500 inches"],
	'correct': 3
	},
	
	

	
	
	];

var score = 0;
var current = 0;

$(document).ready(function(){
  // Event listener for start button
  $(".start-button").click(function(){
     $('.start-quiz').hide();
     $('.next').hide();
     $('.questions').show();
     displayQuestion();
      $('.score').text('Current Score: '+score);
    console.log("Start Quiz button clicked");
  });
  
  // Next button event listener
  $(".next-button").click(function(event){
    console.log("Next button clicked");
    displayQuestion();
    $('.next').hide();
    $('.submit').show();
  });
  
  $(".submit-button").click(function(event){
    if($('li.selected').length){
      var answer = $('li.selected').attr('id');
      checkAnswer(answer);
      $('.next').show();
      $('.submit').hide();
    } else {
      alert('Please select an answer');
    }
  });
  
  // Event listener for button click
  $(".retake-button").click(function(){
  location.reload();
    console.log("Retake button clicked");
  });
  
  //Click listener to show a selected answer
  $('ul.list').on('click', 'li', function(event) {
    $('.selected').removeClass();
    $(this).addClass('selected');
  });
  
});

//FUNCTIONS Here
function displayQuestion(){
  $('.question-number').text('Question Number: '+(current + 1)+"/5" );
  if(current < questions.length){
    var listQuestion = questions[current];
    $('h2').text(listQuestion.question);
    $('ul.list').html('');
    for (var i = 0; i < listQuestion.answers.length; i++) {
      $('ul.list').append('<li id = "'+i+'">'+listQuestion.answers[i] +'</li>');
    }
  } else {
    // show summary that says how many you got correct
    displayScore();
  }
}

// Validate answers to show correct/incorrect
function checkAnswer(answer){
  var listQuestion = questions[current];
  if(listQuestion.correct == answer){
    score++;
    $('li.selected').addClass('correct');
  } else {
    $('li.selected').addClass('incorrect');
    $('listQuestion.correct').addClass('correct');
  }
  $('.score').text('Current Score: '+score);
  current++;
}

//Show score
function displayScore(){
  $('.questions').hide();
  $('.end-quiz').show();
  $('.end-score').text("Your score is: " +score + '/5');
  if(score >= 4){
    $('.comment').text('GREAT JOB!');
  }else{
    $('.comment').text('Try Again!');
  }
}





















