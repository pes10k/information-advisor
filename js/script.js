(function ($, IA) {
    'use strict';

    $(function () {

        var debug = IA.debug,
            html = window.pes.html,
            form = new IA.QuestionsForm(
                $(".questions-form"),
                $.map($(".question"), function (elm) {
                    return new IA.Question($(elm));
                })
            ),
            $modal = $("#modal"),
            $next_button = $(".btn-next"),
            ppi_set = IA.PPICollection,
            ppi_in_current_question = function () {

                var current_response = form.currentQuestion().val(),
                    current_ppi = window.ia.ppi.find_ppi(current_response);

                return current_ppi;
            },
            count_ppi_in_current_question = function () {

                var ppi_count = 0,
                    ppi = ppi_in_current_question(),
                    k;

                for (k in ppi) {
                    ppi_count += ppi[k].length;
                }

                return ppi_count;
            },
            answer_accepted = function () {

                if (form.isAtLastQuestion()) {

                    // Handle being at the end of the world

                } else {

                    form.nextQuestion();
                }
            },
            prompt_user = function () {

                var ppi = ppi_in_current_question(),
                    ppi_count = count_ppi_in_current_question(),
                    rating = 100,
                    body = (html.p("There is potentially personally identifiying information in your response.") +
                            html.p("You may want to edit your response to remove potentially identifiying details to better preserve your anonymity.") +
                            html.div("We estimate that your current response makes you identifiable <strong>1 out of " + rating + "</strong> people."));

                if (debug) {
                    debug.add_ppi(ppi);
                }

                $modal.body.html($(body));
                $modal.label.text("Information");
                $modal.modal('show');
            };

        $modal.body = $modal.find(".modal-body");
        $modal.label = $modal.find("#modal-label");
        $modal.edit_button = $modal.find(".btn-edit").click(function () {
            $modal.modal('hide');
            return false;
        });

        $modal.submit_button = $modal.find(".btn-submit").click(function () {
            $modal.modal('hide');
            answer_accepted();
        });

        $next_button.click(function () {

            prompt_user();
        });
    });

}(jQuery, window.ia));
