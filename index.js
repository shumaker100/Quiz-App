const correctAnswerIcon = "http://billionairesbayou.net/wp-content/uploads/2016/10/man-with-check-sign-05-1-300x300.png" ;
const wrongAnswerIcon="http://billionairesbayou.net/wp-content/uploads/2016/10/man-with-check-sign-05-1-300x300.png";
const warningIcon = "http://billionairesbayou.net/wp-content/uploads/2016/10/man-with-check-sign-05-1-300x300.png";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {question: "What is the state bird",
     optionone: "Bald Eagle",
    optiontwo: "Scrubhouse Jay",
    optionthree: "California Gull",
    optionfour: "Mocking Jay",
    correctAnswer: "California Gull"
  },
  {
     question: "What is the state nickname that was inspired by a very industrious animal?",
    optionone: "The Beaver State",
    optiontwo: "The Beehive State",
    optionthree: "The Termite State",
    optionfour: "The Leafcutter State",
    correctAnswer: "The Beehive State"
  
  },
  {
     question: "How many national parks are located within the state of Utah?",
    optionone: "5",
    optiontwo: "1",
    optionthree: "6",
    optionfour: "4",
    correctAnswer: "5"
    
  },
  {
    question: "Utah has over 11,000 miles of fishing streams and more than 147,000 acres of lakes and reservoirs. What is the state fish?",
    optionone: "Lake Trout",
    optiontwo: "Bonneville Cutthroat Trout",
    optionthree: "Red Lipped Batfish",
    optionfour: "Ramora Fish",
    correctAnswer: "Bonneville Cutthroat Trout"
  },
  {
    question: "Utah is famous for its skiing terrain and powdery dry snow. What is the annual average snowfall for the mountains near Salt Lake City?",
    optionone: "200 inches",
    optiontwo: "100 inches",
    optionthree: " 800 inches",
    optionfour: "500 inches",
    correctAnswer: "500 inches"
  }
  ];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 

	});
}


function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`Score: ${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}


function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
    
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}



function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}


function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
        
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}


function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
