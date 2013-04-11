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
            .parent()
                .append(debug_html)
                    .find('.debug-area');

    IA.debug = {
        log: function (msg) {
            msg = $("<div class='debug-message'>" + msg + "</div>");
            $debug_area
                .prepend("<hr />")
                .prepend(msg);
            return this;
        },
        serialize: function (item) {

            var key,
                text = "",
                elements = [];

            for (key in item) {
                elements.push("'" + key + "' = '" + item[key] + "'");
            }

            return elements.join(",");
        },
        add_item: function (item) {

            var key,
                value,
                html = "<dl>";

            for (key in item) {

                html += "<dt>" + key + "</dt>";
                if (item[key] instanceof Object) {
                    html += "<dd>" + this.serialize(item[key]) + "</dd>";
                } else {
                    html += "<dd>" + item[key] + "</dd>";
                }
            }

            html += "</dl>";
            this.log(html);
        }
    };

}(jQuery, window.ia));
