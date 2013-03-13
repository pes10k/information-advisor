$(function () {

    var $content_areas = $("textarea.editable"),
        year_regex = /\D([0-9]{4})\D/,
        email_regex = /\s\w+@\w.\w\s/,
        ppi_remove_regex = /<span class="ppi-marker">(.*?)<\/span>/mg,
        trim = $.trim,
        find_ppi = function (text) {
            var year_matches = year_regex.exec(text);
            return year_matches;
        },
        wrap_ppi = function (ppi) {
            return '<span class="ppi-marker">' + trim(ppi) + "</span>";
        },
        remove_ppi_markers = function (html) {
            var rs = html.replace(ppi_remove_regex, '$1');
            return rs;
        },
        add_ppi_marker = function (src, str) {
            var res = src.replace(str, wrap_ppi(str));
            return res;
        };

    $content_areas.each(function () {

        var editor = CKEDITOR.replace(this.id),
            $container = $(this).parent();

        editor.on('blur', function (event) {

            var current_html = this.getData(),
                has_ppi = find_ppi(current_html);

            this.setData(remove_ppi_markers(current_html), function () {

                if (has_ppi) {
                    this.setData(add_ppi_marker(current_html, has_ppi[1]));
                    $container.popover({
                        placement: "top",
                        title: "You done messed up",
                        content: "You revealed all kinds of private stuff"
                    }).popover('show');
                } else {
                    $container.popover('hide');
                }
            });
        });
    });
});
