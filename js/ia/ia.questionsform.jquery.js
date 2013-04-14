(function ($, IA) {
    "use strict";

    IA.QuestionsForm = function ($form, questions) {

        var question_index = 0,
            current_question = questions[question_index],
            num_questions = questions.length,
            that = this;

        $.each(questions, function (index, value) {
            value.setNumQuestionsInSet(num_questions);
        });

        this.isAtLastQuestion = function () {
            return question_index === num_questions - 1;
        };

        this.currentQuestion = function () {
            return current_question;
        };

        this.nextQuestion = function (callback) {

            if (question_index >= num_questions - 1) {

                return false;

            } else {

                current_question.fadeOut(function () {
                    current_question = questions[++question_index];
                    if (callback) {
                        current_question.fadeIn(callback);
                    } else {
                        current_question.fadeIn(callback);
                    }
                });
            }
        };
    };

}(jQuery, window.ia));
