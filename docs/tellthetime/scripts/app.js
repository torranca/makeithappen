// START THE GAME
$("#startButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#start").hide();
    game.start();

    setupQuestion();

    $("#game").show();
});

function setupQuestion () {

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    if(game.question < game.levels[game.level].length) {
     
		$("#clockImg").attr("src", 'assets/Clock_'+ game.levels[game.level][game.question].time + '.png');

        $("#at0").text(game.levels[game.level][game.question].answers[0].toUpperCase());
        $("#at1").text(game.levels[game.level][game.question].answers[1].toUpperCase());
        $("#at2").text(game.levels[game.level][game.question].answers[2].toUpperCase());
    }
}

$("#a0").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    checkAnswer(0);
    return false;
});
$("#a1").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    checkAnswer(1);
    return false;
});
$("#a2").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    checkAnswer(2);
    return false;
});
function checkAnswer(index) {
    if(!game.started){
        return false;
    }
    var tellTheTimeResult = $('#tellTheTimeResult');
    var nextButton = $('#nextButton');
    var correct = index === game.levels[game.level][game.question].correct;
    if(correct) {
        game.score += 1;
        tellTheTimeResult.text("Correct");
        tellTheTimeResult.removeClass("btn-danger").addClass("btn-success");
        nextButton.removeClass("btn-danger").addClass("btn-success");
    }else{
        tellTheTimeResult.text("Incorrect");
        tellTheTimeResult.removeClass("btn-success").addClass("btn-danger");
        nextButton.removeClass("btn-success").addClass("btn-danger");
    }

    $("#tellTheTimeInputGroup").hide();
    $("#tellTheTimeResultGroup").show();

    game.question += 1;

    setupQuestion();
}

//NEXT BUTTON
$("#nextButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    if(game.question === game.levels[game.level].length){
        game.finish();
        $("#game").hide();
        $("#finish").show();
    }

    $("#tellTheTimeResultGroup").hide();
    $("#tellTheTimeInputGroup").show();

});

//BACK BUTTON
$("#backButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#game").hide();
    $("#start").show();
});

//FINISH THE GAME
$("#finishButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#finish").hide();
    $("#start").show();
});

//OUR GAME DATA
var game = {
    started: false,
    score: 0,
    level: 0,
    question: 0,
    levels: [
        [
            {"time": "0205", "correct": 1, answers: ["3:45","2:05","4:30"]},
            {"time": "0510", "correct": 0, answers: ["5:10","7:15","8:40"]},
            {"time": "0655", "correct": 2, answers: ["6:30","10:40","6:55"]},
            {"time": "1010", "correct": 1, answers: ["4:30","10:10","8:20"]},
            {"time": "1200", "correct": 1, answers: ["7:15","12:00","1:40"]},
            {"time": "1430", "correct": 2, answers: ["6:10","8:40","2:30"]},
            {"time": "1500", "correct": 1, answers: ["7:15","3:00","4:40"]},
            {"time": "1555", "correct": 0, answers: ["3:55","7:45","2:40"]},
            {"time": "1800", "correct": 1, answers: ["2:50","6:00","8:40"]},
            {"time": "2120", "correct": 1, answers: ["5:00","9:20","11:40"]}
        ]
    ],
    start: function () {
        this.score = 0;
        this.level = 0;
        this.question = 0;
        this.started = true;
    },
    finish: function () {
        this.started = false;
    }
};