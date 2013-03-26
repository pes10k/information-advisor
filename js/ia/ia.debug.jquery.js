(function ($, IA) {

    var debug_html = '<section class="container"> ' +
                        '<div class="row">' +
                            '<div class="span8 offset2">' +
                                '<h3>Debug</h3>' +
                                '<div class="well debug-area">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</section>',
        $debug_area = $("section:last")
            .append(debug_html)
                .find('.debug-area');

    IA.debug = {
        add_ppi: function (ppi_collection) {

            var label,
                item,
                html = '<h4>' + (new Date()) + '</h4><ul>';

            for (label in ppi_collection) {
                html += "<li><h5>" + label + "</h5><ul>";

                for (item in ppi_collection[label]) {
                    html += "<li>" + ppi_collection[label][item] + "</li>\n";
                }

                html += "</ul></li>";
            }

            html += "</ul><hr />";
            $debug_area.prepend(html);
        }
    };

}(jQuery, window.ia));
