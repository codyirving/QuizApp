const USERDATA = {
  currentQuestion: 0,
  rightAnswers: 0,
  wrongAnswers: 0
}
const DATASTORE = [
  { 
    question: 'Who was the legendary Benedictine monk who invented champagne',
    answer: 'Dom Perignon',
    wrongAnswers: [
      {answer: 'Benedict of Aniane'},
      {answer: 'Peter Damian'},
      {answer: 'Benedict of Nursia'}
    ]
  },
  { 
    question: 'What is someone who shoes horses called?',
    answer: 'A Farrier',
    wrongAnswers: [
      {answer: 'A Hoofer'},
      {answer: 'A Shoeman'},
      {answer: 'A Cobbler'}
    ]
  },
  { 
    question: 'Name the largest freshwater lake in the world?',
    answer: 'Lake Superior',
    wrongAnswers: [
      {answer: 'Lake Titicaca'},
      {answer: 'Great Salt Lake'},
      {answer: 'Lake Maracaibo'}
    ]
  },
  { 
    question: 'What is a falchion?',
    answer: 'A sword',
    wrongAnswers: [
      {answer: 'An eagle'},
      {answer: 'A boat'},
      {answer: 'A backpack'}
    ]
  },
  { 
    question: 'What item of clothing was named after its Scottish inventor?',
    answer: 'A Mackintosh',
    wrongAnswers: [
      {answer: 'A Kilt'},
      {answer: 'A Tartan'},
      {answer: 'A Bagpipe'}
    ]
  },
  { 
    question: 'Where would you find the Sea of Tranquility? ',
    answer: 'The moon',
    wrongAnswers: [
      {answer: 'Hawaii'},
      {answer: 'Africa'},
      {answer: 'China'}
    ]
  },
  { 
    question: 'Who invented the rabies vaccination?',
    answer: 'Louis Pasteur',
    wrongAnswers: [
      {answer: 'Jonas Salk'},
      {answer: 'Marie Curie'},
      {answer: 'Linus Pauling'}
    ]
  },
  { 
    question: 'What colour jersey is worn by the winners of each stage of the Tour De France? ',
    answer: 'Yellow',
    wrongAnswers: [
      {answer: 'Red'},
      {answer: 'Gold'},
      {answer: 'Blue'}
    ]
  },
  { 
    question: 'If you were painting with tempera, what would you be using to bind together colour pigments?',
    answer: 'Egg yolk',
    wrongAnswers: [
      {answer: 'Mineral Oil'},
      {answer: 'Water'},
      {answer: 'Insect shells'}
    ]
  },
  { 
    question: 'What is the painting \'La Gioconda\' more usually known as?',
    answer: 'The Mona Lisa',
    wrongAnswers: [
      {answer: 'Scream'},
      {answer: 'The Kiss'},
      {answer: 'Water Lilies'}
    ]
  }
];
let blankCallback = function (value) {
  if (value) {}
};
let dialog = function(message,callback) { vex.dialog.alert({
    message: message, 
    callback: callback ? callback : blankCallback
  }); 
};
function checkProgress() {
  $('.question-number-current').html(USERDATA.currentQuestion + "/" + DATASTORE.length);
  $('.question-performance-current').html(`Correct: ${USERDATA.rightAnswers} <br>Incorrect: ${USERDATA.wrongAnswers}`);
}
function checkAnswer() {
  if(DATASTORE[USERDATA.currentQuestion-1].answer === $('input[name=answers]:checked').siblings('.answer').html()) {
    USERDATA.rightAnswers++;
    dialog('Correct!, Nice Job!', USERDATA.currentQuestion === DATASTORE.length ? giveFinalScore():updateAndContinue()); 
  }else {
    USERDATA.wrongAnswers++;
    dialog('Wrong...' + DATASTORE[USERDATA.currentQuestion - 1].answer, USERDATA.currentQuestion === DATASTORE.length ? giveFinalScore():updateAndContinue());
  }
}
function updateAndContinue() {
  USERDATA.currentQuestion++;
  checkProgress();
  giveNextQuestion();
}
function giveNextQuestion() {
  loadQuestion(USERDATA.currentQuestion === 0 ? ++USERDATA.currentQuestion : USERDATA.currentQuestion);
  $(window).scrollTop(0);
}
function loadQuestion(questionNumber) {
  checkProgress();
  $('.question').text(DATASTORE[(questionNumber - 1)].question);
 
  //Choose random number between 1 and 4 to randomize answers each time.
  let randomizer = Math.floor(Math.random() * 4) + 1;
  
  $('#answer-' + randomizer + '> .answer').text(DATASTORE[(questionNumber - 1)].answer);
  $('#answer-' + randomizer + '> #answer-one').val(DATASTORE[(questionNumber - 1)].answer);
  ++randomizer <=4 ? randomizer :randomizer=1;
  $('#answer-' + randomizer + '> .answer').text(DATASTORE[(questionNumber - 1)].wrongAnswers[0].answer);
  $('#answer-' + randomizer + '> #answer-two').val(DATASTORE[(questionNumber - 1)].wrongAnswers[0].answer);
  ++randomizer <=4 ? randomizer :randomizer=1;
  $('#answer-' + randomizer + '> .answer').text(DATASTORE[(questionNumber - 1)].wrongAnswers[1].answer);
  $('#answer-' + randomizer + '> #answer-three').val(DATASTORE[(questionNumber - 1)].wrongAnswers[1].answer);
  ++randomizer <=4 ? randomizer :randomizer=1;
  $('#answer-' + randomizer + '> .answer').text(DATASTORE[(questionNumber - 1)].wrongAnswers[2].answer);
  $('#answer-' + randomizer + '> #answer-four').val(DATASTORE[(questionNumber - 1)].wrongAnswers[2].answer);
}
function giveFinalScore() {
  dialog("You got " + USERDATA.rightAnswers + " right and " + USERDATA.wrongAnswers + " wrong answers");
  showWelcomeScreen();
}
function initializeUser() {
  USERDATA.currentQuestion = 0;
  USERDATA.rightAnswers = 0;
  USERDATA.wrongAnswers = 0;
}
function startQuestions() {
  initializeUser();
  checkProgress();
  giveNextQuestion();

}
function showWelcomeScreen() {
  initializeUser();
  checkProgress();
  $('.welcome').css("display", "block");
  $('.container').css("display", "none");
}

$('#answer-button').on('click', e=> {
  e.preventDefault();
  checkAnswer();
});

$('#continue-button').on('click', e=> {
  e.preventDefault();
  $('.welcome').css("display", "none");
  $('.container').css("display", "block");
  startQuestions();
});

