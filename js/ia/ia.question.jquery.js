(function ($, IA) {
    "use strict";

    IA.Question = function ($elm) {

        var $textarea = $elm.find("textarea"),
            $sequence_num = $elm.attr("data-question-sequence"),
            id = $elm.attr("data-question-sequence"),
            $label = $elm.prepend("<label for='question_" + id + "''>Question " + id + " / <span class='question-count'> </span></label>"),
            $num_questions = $label.find('.question-count');

        this.id = function () {
            return id;
        };

        this.fadeIn = function (callback) {
            $elm
                .find(":input")
                    .removeAttr("disabled")
                    .end()
                .fadeIn(callback);
            return this;
        };

        this.fadeOut = function (callback) {
            $elm
                .find(":input")
                    .attr("disabled", "disabled")
                    .end()
                .fadeOut(callback);
            return this;
        };

        this.val = function () {
            return $textarea.val();
        };

        this.setNumQuestionsInSet = function (num) {
            $num_questions.text(num);
        };
    };

}(jQuery, window.ia));
