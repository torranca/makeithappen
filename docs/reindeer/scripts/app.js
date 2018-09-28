// START THE GAME
$("#startButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();

    $("#start").hide();
    game.start();

    var mainScreen = $('#mainScreen');
    var i;
    for (i = 1; i <= 10; i++) {
        mainScreen.removeClass("score"+i);
    }

    setupQuestion();

    $("#game").show();
});

//PLAY THE SOUND
$("#playSoundButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();

    $("#playSoundButtonText").text("Playing...");
	$('#playSoundButton').css('background-image','url(assets/playing.svg)');
    $.playSound("./audio/"+ getAudioFileName()+ ".mp3");
     setTimeout(function(){
        $("#playSoundButtonText").text("Play Again");
        $('#playSoundButton').css('background-image','url(assets/play_again.svg)');
        }, 2000);
});

function getAudioFileName() {
	var question = game.levels[game.level][game.question]
	return question.word.replace('_', question.answers[question.correct] ).toLowerCase()
}
function setupQuestion () {

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    if(game.question < game.levels[game.level].length) {
        $("#qt0").text(game.levels[game.level][game.question].word[0].toUpperCase());
        $("#qt1").text(game.levels[game.level][game.question].word[1].toUpperCase());
        $("#qt2").text(game.levels[game.level][game.question].word[2].toUpperCase());

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
    var spellResult = $('#spellResult');
    var nextButton = $('#nextButton');
    var mainScreen = $('#mainScreen');
    var correct = index === game.levels[game.level][game.question].correct;
    if(correct) {
        game.score += 1;
        spellResult.text("Correct");
        spellResult.removeClass("btn-danger").addClass("btn-success");
        nextButton.removeClass("btn-danger").addClass("btn-success");
        var i;
        for (i = 1; i <= 10; i++) {
            mainScreen.removeClass("score"+i);
        }
        mainScreen.addClass("score"+game.score);
    }else{
        spellResult.text("Incorrect");
        spellResult.removeClass("btn-success").addClass("btn-danger");
        nextButton.removeClass("btn-success").addClass("btn-danger");
    }

    $("#spellInputGroup").hide();
    $("#spellCheckGroup").show();

    game.question += 1;

    setupQuestion();
}

//NEXT BUTTON
$("#nextButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();

    $("#playSoundButtonText").text("Play Sound");
	$('#playSoundButton').css('background-image','url(assets/play.svg)');
    if(game.question === game.levels[game.level].length){
        game.finish();
        $("#game").hide();
        $("#finish").show();
    }

    $("#spellCheckGroup").hide();
    $("#spellInputGroup").show();

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
            {"word": "c_t", "correct": 0, answers: ["a","e","i"]},
            {"word": "d_g", "correct": 2, answers: ["i","e","o"]},
            {"word": "_um", "correct": 0, answers: ["m","l","s"]},
            {"word": "da_", "correct": 1, answers: ["t","d","b"]},
            {"word": "b_g", "correct": 1, answers: ["o","i","a"]},
            {"word": "da_", "correct": 0, answers: ["y","z","m"]},
            {"word": "_ld", "correct": 2, answers: ["e","a","o"]},
            {"word": "ma_", "correct": 1, answers: ["m","t","d"]},
            {"word": "he_", "correct": 0, answers: ["r","p","d"]},
            {"word": "re_", "correct": 1, answers: ["m","d","p"]}
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