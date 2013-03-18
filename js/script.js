(function ($, IA) {
    'use strict';

    $(function () {

        var $content_areas = $("textarea.editable"),
            ppi = IA.ppi,
            ppi_remove_regex = /<span class="ppi-marker">(.*?)<\/span>/mg,
            font_tag_remove_regex = '/<font color=".*?">(.*?)<\/font>/mg',
            trim = $.trim,
            normalize_html = function (html) {
                return html.replace("&nbsp;", " ");
            },
            wrap_ppi = function (ppi) {
                return '<span class="ppi-marker">' + trim(ppi) + "</span>";
            },
            remove_ppi_markers = function (html) {
                var rs = html
                    .replace(ppi_remove_regex, '$1')
                    .replace(font_tag_remove_regex, '$');
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
                    clean_html = normalize_html(current_html),
                    found_ppi = ppi.find_ppi(clean_html);

                clean_html = remove_ppi_markers(clean_html);

                this.setData(clean_html, function () {

                    var ppi_title, ppi_type,
                        ppi_instance_index, ppi_instance;

                    if (found_ppi) {

                        for (ppi_title in found_ppi) {
                            ppi_type = found_ppi[ppi_title];
                            for (ppi_instance_index in ppi_type) {
                                ppi_instance = ppi_type[ppi_instance_index];
                                clean_html = add_ppi_marker(clean_html, ppi_instance);
                            }
                        }

                        this.setData(clean_html);
                        $container.popover({
                            placement: "top",
                            title: "Warning",
                            content: "You revealed all kinds of private stuff"
                        }).popover('show');

                    } else {

                        $container.popover('hide');
                    }
                });
            });
        });
    });
}(jQuery, window.ia));
