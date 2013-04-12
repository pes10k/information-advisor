(function ($, IA) {
    'use strict';

    $(function () {

        var debug = IA.debug,
            is_control_group = (Math.round(Math.random() * 10) % 2),
            html = window.pes.html,
            responses = [],

            ppi_per_question = {},
            ppi_sum = function () {
                var total = 0,
                    key;
                for (key in ppi_per_question) {
                    total += ppi_per_question[key];
                }
                return total;
            },

            // Elements used for handling the into text and initial
            // user agreement
            $question_section = $("#question-section"),
            $survey_section = $("#survey-section"),
            $intro_section = $("#intro-section"),
            $being_survey_button = $("#begin-survey"),

            // Elements used for only the survey page
            $survey_form = $survey_section.find("form"),
            $cancel_survey_button = $survey_section.find(".btn-cancel"),
            $submit_survey_button = $survey_section.find(".btn-submit"),
            survey_complete = function () {
                $survey_form.fadeOut(function () {
                    $survey_section.find(".form-complete-message").fadeIn();
                });
            },

            // Elements used for prompting users for questions
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

                    $question_section.fadeOut(function () {
                        $survey_section.fadeIn();
                    });

                } else {

                    form.nextQuestion();
                }
            },
            prompt_user = function () {

                var ppi = ppi_in_current_question(),
                    ppi_count = count_ppi_in_current_question(),
                    ppi_serialized = {},
                    rating,
                    body,
                    key;

                for (key in ppi) {
                    ppi_serialized[key] = ppi[key].length;
                }

                ppi_per_question[form.currentQuestion().id()] = ppi_count;
                rating = ppi_count ? (1000000 / Math.pow(10, ppi_sum())) : false;

                responses.push({
                    group: is_control_group ? "control" : "test",
                    question: form.currentQuestion().id(),
                    rating: rating ? "1 in " + rating : "none",
                    ppi_counts: ppi_serialized,
                    time: Date.now()
                });

                if (debug) {
                    debug.add_item(responses[responses.length - 1]);
                }

                // If there is identifiable PPI, then prompt the user and allow
                // them to edit their response accordinly
                if (rating && !is_control_group) {

                    body = (html.p("There is potentially personally identifiying information in your response.") +
                        html.p("You may want to edit your response to remove potentially identifiying details to better preserve your anonymity.") +
                        html.div("We estimate that your current response makes you identifiable") +
                        html.div("1 out of " + rating + " people.", {"class": "well ident-measure"}));

                    $modal.body.html($(body));
                    $modal.label.text("Information");
                    $modal.modal('show');

                // Otherwise, just move them to the next dang question already
                } else {

                    answer_accepted();
                }
            };

        if (debug) {
            debug.log(is_control_group ? "In Control Group" : "In Test Group");
        }

        if (is_control_group) {
            $(".test-group-only").remove();
        }

        $modal.body = $modal.find(".modal-body");
        $modal.label = $modal.find("#modal-label");

        $being_survey_button.click(function () {
            $intro_section.fadeOut(function () {
                $question_section.fadeIn();
            });
        });

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

        // Survey Functionality
        $cancel_survey_button.click(function () {
            survey_complete();
            return false;
        });

        $submit_survey_button.click(function () {

            var form_values = {
                age: $("#age").val(),
                gender: $("#gender").val(),
                student_status: $("#student_status").val(),
                tool_response: $("input[name='tool_response']:checked").val(),
                uic_student: $("#uic_student").val(),
                responses: responses
            };

            $survey_form
                .find(":input")
                    .attr("disabled", "disabled")
                    .end()
                .prepend("<div class='alert-info alert'>Submitting form values&hellip;</div>");

            $.post(
                "/survey.php",
                form_values,
                function (json) {
                    survey_complete();
                },
                "json"
            );

            return false;
        });
    });

}(jQuery, window.ia));
