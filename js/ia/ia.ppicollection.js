(function ($, IA) {

    IA.PPICollection = (function () {

        var collection = {},
            ppi_record = function (ppi_set) {
                return {
                    time: new Date(),
                    ppi: ppi_set
                };
            };

        return {
            addPPI: function (ppis, label) {

                if (!(label in collection)) {
                    collection[label] = [];
                }
                collection[label].push(ppi_record(ppis));
            },
            ppi: function () {
                return collection;
            }
        };
    }());

}(jQuery, window.ia));
