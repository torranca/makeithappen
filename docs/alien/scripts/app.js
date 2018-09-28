// START THE GAME
$("#startButton").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  $("#start").hide();
  game.start();
  var mainScreen = $('#mainScreen');
  var i;
  for (i = 1; i <= 10; i++) {
    mainScreen.removeClass("score" + i);
  }
  setupQuestion();
  $("#game").show();
});


function setupQuestion() {

  $("#score").text(game.score + ' / ' + game.levels[game.level].length);
  $("#finalscore").text(game.score);

  if (game.question < game.levels[game.level].length) {
    $("#qt0").text(game.levels[game.level][game.question].word);

    setFontSize(game.level);

    $("#at0").text(game.levels[game.level][game.question].answers[0].toUpperCase());
    $("#at1").text(game.levels[game.level][game.question].answers[1].toUpperCase());
    $("#at2").text(game.levels[game.level][game.question].answers[2].toUpperCase());
  }
}

function setFontSize(level) {
  var lengthOfAnswer1 = game.levels[level][game.question].answers[0].length;
  var lengthOfAnswer2 = game.levels[level][game.question].answers[1].length;
  var lengthOfAnswer3 = game.levels[level][game.question].answers[2].length;

  if (lengthOfAnswer1 > 7 || lengthOfAnswer2 > 7 || lengthOfAnswer3 > 7) {
    $("#at0").css("font-size", "0.7rem");
    $("#at1").css("font-size", "0.7rem");
    $("#at2").css("font-size", "0.7rem");
    $("#ar0").css("font-size", "0.7rem");
    $("#ar1").css("font-size", "0.7rem");
    $("#ar2").css("font-size", "0.7rem");
  } else {
    $("#at0").css("font-size", "1rem");
    $("#at1").css("font-size", "1rem");
    $("#at2").css("font-size", "1rem");
    $("#ar0").css("font-size", "1rem");
    $("#ar1").css("font-size", "1rem");
    $("#ar2").css("font-size", "1rem");
  }
}

$("#at0").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  checkAnswer(0);
  return false;
});
$("#at1").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  checkAnswer(1);
  return false;
});
$("#at2").on("touchend click", function(event) {
  checkAnswer(2);
  event.preventDefault();
  event.stopPropagation();

  return false;
});

function checkAnswer(index) {

  var spellResult = $('#spellResult');
  var mainScreen = $('#mainScreen');
  var questionResponse = $('#qr0');
  var answerSelected = findSelectedAnswer(index);
  setUpAnswerBoxes();
  var correct = index === game.levels[game.level][game.question].correct;
  if (correct) {
    game.score += 1;
    spellResult.text("Correct");
    questionResponse.text(game.levels[game.level][game.question].word);

    spellResult.removeClass("btn-danger").addClass("btn-success");
    answerSelected.removeClass("btn-default").removeClass("gameresponse").addClass(
      "btn-success");
    var i;
    for (i = 1; i <= 10; i++) {
      mainScreen.removeClass("score" + i);
    }
    mainScreen.addClass("score" + game.score);

  } else {
    spellResult.text("Incorrect");
    spellResult.removeClass("btn-success").addClass("btn-danger");
    questionResponse.text(game.levels[game.level][game.question].word);
    answerSelected.removeClass("btn-default").removeClass("gameresponse").addClass(
      "btn-danger");
  }

  if (!game.started) {
    return false;
  }
  $("#spellInputGroup").hide();
  $("#spellCheckGroup").show();

  game.question += 1;

}

function setUpAnswerBoxes() {
  var answerBox0 = $("#ar0");
  var answerBox1 = $("#ar1");
  var answerBox2 = $("#ar2");
  var level = game.level;
  if (game.level >= 1) {
    level = level - 1;
  }

  setFontSize(level);
  answerBox0.text(game.levels[game.level][game.question].answers[0].toUpperCase());
  answerBox0.removeClass("btn-success").removeClass("btn-danger").addClass(
    "gameresponse");

  answerBox1.text(game.levels[game.level][game.question].answers[1].toUpperCase());
  answerBox1.removeClass("btn-success").removeClass("btn-danger").addClass(
    "gameresponse");
  answerBox2.text(game.levels[game.level][game.question].answers[2].toUpperCase());
  answerBox2.removeClass("btn-success").removeClass("btn-danger").addClass(
    "gameresponse");
}

function findSelectedAnswer(index) {
  if (index == 1) {
    return $('#ar1');
  } else if (index == 2) {
    return $('#ar2');
  } else {
    return $('#ar0');
  }

}

//NEXT BUTTON
$("#nextButton").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  $("#playSoundButtonText").text("Play Sound");

  if (game.question === game.levels[game.level].length) {
    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);
    game.finish();
    $("#game").hide();
    $("#finish").show();
  } else {
    setupQuestion();
  }

  $("#spellCheckGroup").hide();
  $("#spellInputGroup").show();

});

//BACK BUTTON
$("#backButton").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  $("#game").hide();
  $("#start").show();
});

//FINISH THE GAME
$("#finishButton").on("touchend click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  $("#finish").hide();
  $("#start").show();
});


//ALIEN GAME DATA
var game = {
  started: false,
  score: 0,
  level: 0,
  question: 0,
  levels: [
    [{
      "word": "A Sport in water",
      "correct": 2,
      answers: ["Hockey", "Swiming", "Swimming"]
    }, {
      "word": "A musical instrument with lots of keys",
      "correct": 1,
      answers: ["Guitar", "Piano", "Pano"]
    }, {
      "word": "What's an alien with cotton buds in its ears called?",
      "correct": 0,
      answers: ["Anything you like, it won't hear you",
        "Anything yu like it won't har yu", "Tiger"
      ]
    }, {
      "word": "Who created this app?",
      "correct": 2,
      answers: ["Moira & Roza", "Morgan & Roze", "Morrin & Rosa"]
    }, {
      "word": "What do you wear on your feet?",
      "correct": 2,
      answers: ["Shoo", "Computer", "Shoes"]
    }]
  ],
  start: function() {
    this.score = 0;
    this.level = 0;
    this.question = 0;
    this.started = true;
  },
  finish: function() {
    this.started = false;
  }
};
