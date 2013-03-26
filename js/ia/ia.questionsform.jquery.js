(function ($, IA) {
    "use strict";

    IA.QuestionsForm = function ($form, questions) {

        var question_index = 0,
            current_question = questions[question_index],
            num_questions = questions.length,
            that = this;

        this.isAtLastQuestion = function () {
            return question_index === num_questions - 1;
        };

        this.currentQuestion = function () {
            return current_question;
        };

        this.nextQuestion = function () {

            if (question_index >= num_questions - 1) {

                return false;

            } else {

                current_question.fadeOut(function () {
                    current_question = questions[++question_index];
                    current_question.fadeIn();
                });
            }
        };
    };

}(jQuery, window.ia));
