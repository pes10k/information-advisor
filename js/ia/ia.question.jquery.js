(function ($, IA) {
    "use strict";

    IA.Question = function ($elm) {

        var $label = $elm.find("label"),
            $textarea = $elm.find("textarea"),
            $sequence_num = $elm.attr("data-question-sequence"),
            id = $elm.attr("data-question-sequence");

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
    };

}(jQuery, window.ia));
