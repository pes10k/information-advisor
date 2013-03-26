if (!('pes' in window)) {
    window.pes = {};
}

(function (PES) {

    var obj_to_attr = function (params) {

        var k,
            attrs = "";

        if (params) {
            for (k in params) {
                attrs += ' ' + k + '="' + params[k] + '"';
            }
        }

        return attrs;
    };

    PES.html = {
        p: function (str, params) {
            return "<p" + obj_to_attr(params) + ">" + str + "</p>\n";
        },
        div: function (str, params) {
            return "<div" + obj_to_attr(params) + ">" + str + "</div>\n";
        }
    };

}(window.pes));
