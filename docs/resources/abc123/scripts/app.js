// START THE GAME
$("#startABCButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();

    $("#start").hide();
    $("#mainScreen").removeClass("screen123").addClass("screenABC");
    $("#finishScreen").removeClass("screen123").addClass("screenABC");
    $("#numberInputGroup").hide();
    $("#spellInputGroup").show();
    game = gameABC;
    game.start();

    setupQuestion();

    $("#game").show();
});
$("#start123Button").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();

    $("#start").hide();
    $("#mainScreen").removeClass("screenABC").addClass("screen123");
    $("#finishScreen").removeClass("screenABC").addClass("screen123");
    $("#spellInputGroup").hide();
    $("#numberInputGroup").show();
    game = game123;
    game.start();

    setupQuestion();

    $("#game").show();
});

function setupQuestion () {

    $("#score").text(game.score + ' / ' + game.levels[game.level].length);
    $("#finalscore").text(game.score);

    if(game.mode === 'ABC' && game.question < game.levels[game.level].length) {
        $("#qt0").text(game.levels[game.level][game.question].word[0].toUpperCase());
        $("#qt1").text(game.levels[game.level][game.question].word[1].toUpperCase());
        $("#qt2").text(game.levels[game.level][game.question].word[2].toUpperCase());

        $("#at0").text(game.levels[game.level][game.question].answers[0].toUpperCase());
        $("#at1").text(game.levels[game.level][game.question].answers[1].toUpperCase());
        $("#at2").text(game.levels[game.level][game.question].answers[2].toUpperCase());
    } else if(game.mode === '123' && game.question < game.levels[game.level].length) {

        var n0 = $("#n0");
        var n2 = $("#n2");
        var na0 = $("#na0");
        var na1 = $("#na1");
        var na2 = $("#na2");

        var i;
        for (i = 1; i <= 12; i++) {
            n0.removeClass("spot"+i);
            n2.removeClass("spot"+i);
            na0.removeClass("spot"+i);
            na1.removeClass("spot"+i);
            na2.removeClass("spot"+i);
        }


        n0.addClass("spot"+game.levels[game.level][game.question].sum[0]);
        n2.addClass("spot"+game.levels[game.level][game.question].sum[2]);

        na0.addClass("spot"+game.levels[game.level][game.question].answers[0]);
        na1.addClass("spot"+game.levels[game.level][game.question].answers[1]);
        na2.addClass("spot"+game.levels[game.level][game.question].answers[2]);

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

$("#na0").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    checkAnswer(0);
    return false;
});
$("#na1").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    checkAnswer(1);
    return false;
});
$("#na2").on("touchend click", function(event){
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

    }else{
        spellResult.text("Incorrect");
        spellResult.removeClass("btn-success").addClass("btn-danger");
        nextButton.removeClass("btn-success").addClass("btn-danger");
    }

    if(game.mode === 'ABC') {
        $("#spellInputGroup").hide();
    }else{
        $("#numberInputGroup").hide();
    }

    $("#spellCheckGroup").show();
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

    $("#spellCheckGroup").hide();
    if(game.mode === 'ABC') {
        $("#spellInputGroup").show();
    }else{
        $("#numberInputGroup").show();
    }

});

//BACK BUTTON
$("#backButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#spellCheckGroup").hide();
    $("#game").hide();
    $("#start").show();
});

//FINISH THE GAME
$("#finishButton").on("touchend click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#spellCheckGroup").hide();
    $("#finish").hide();
    $("#start").show();
});

//OUR GAME DATA
var game = {};
var gameABC = {
    started: false,
    mode: 'ABC',
    score: 0,
    level: 0,
    question: 0,
    levels: [
        [
            {"word": "c_t", "correct": 0, answers: ["a","b","z"]},
            {"word": "d_g", "correct": 2, answers: ["f","e","o"]},
            {"word": "_um", "correct": 0, answers: ["m","x","w"]},
            {"word": "da_", "correct": 1, answers: ["t","d","r"]},
            {"word": "b_g", "correct": 1, answers: ["h","i","p"]},
            {"word": "da_", "correct": 0, answers: ["y","v","c"]},
            {"word": "_ld", "correct": 2, answers: ["e","a","o"]},
            {"word": "ma_", "correct": 1, answers: ["q","t","b"]},
            {"word": "he_", "correct": 0, answers: ["r","p","d"]},
            {"word": "re_", "correct": 1, answers: ["j","d","l"]}
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

var game123 = {
    started: false,
    mode: '123',
    score: 0,
    level: 0,
    question: 0,
    levels: [
        [
            {"sum": ["1","+","3"], "correct": 0, answers: ["4","5","3"]},
            {"sum": ["2","+","4"], "correct": 1, answers: ["2","6","5"]},
            {"sum": ["5","+","4"], "correct": 0, answers: ["9","2","12"]},
            {"sum": ["2","+","3"], "correct": 2, answers: ["8","6","5"]},
            {"sum": ["1","+","7"], "correct": 0, answers: ["8","3","9"]},
            {"sum": ["2","+","2"], "correct": 1, answers: ["2","4","6"]},
            {"sum": ["4","+","4"], "correct": 2, answers: ["6","10","8"]},
            {"sum": ["9","+","1"], "correct": 2, answers: ["8","6","10"]},
            {"sum": ["3","+","6"], "correct": 0, answers: ["9","7","12"]},
            {"sum": ["6","+","5"], "correct": 0, answers: ["11","10","12"]}
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