if ('ppi' in window.ia === false) {
    window.ia.ppi = {};
}

(function (ns) {

    var PpiCheck = function (title, test_callback) {
            return {
                title: title,
                check: function (value) {
                    return test_callback(value);
                }
            };
        },
        data_checker_gen = function (data_set) {

            var i, escape_index,
                num_data = data_set.length,
                // Convert the list of strings into a set of regexes, so that
                // we can do case comparison easier
                data_regexes = [],
                escape_chars = ['.', '(', ')'],
                an_escape_char,
                data_escaped;

            for (i = 0; i < num_data; i += 1) {
                data_escaped = data_set[i];

                for (escape_index in escape_chars) {
                    an_escape_char = escape_chars[escape_index];
                    data_escaped = data_escaped.replace(an_escape_char, '\\' + an_escape_char);
                }

                data_regexes.push(new RegExp(data_escaped, 'i'));
            }

            return function (value) {

                var index,
                    regex_match,
                    current_regex,
                    regex_matches = [];

                for (index in data_regexes) {

                    current_regex = data_regexes[index];
                    regex_match = current_regex.exec(value);

                    if (regex_match) {
                        regex_matches.push(regex_match[0]);
                    }
                }

                return regex_matches;
            };
        },
        ppi = ns.ppi,
        data = ns.data;

    ppi.collection = [];

    ppi.collection.push(PpiCheck("Year", (function () {

        var year_regex = /(?:\D|^)(\d{4})(?:\D|$)/g;

        return function (value) {

            var regex_match,
                regex_matches = [],
                year;

            while (regex_match = year_regex.exec(value)) {

                year = regex_match[0];
                if (year.length === 4 && year > 1900 && year < 2020) {
                    regex_matches.push(regex_match[1]);
                }
            }

            return regex_matches;
        };
    }())));

    ppi.collection.push(PpiCheck("Cities", data_checker_gen(data.cities)));
    ppi.collection.push(PpiCheck("States", data_checker_gen(data.states)));
    ppi.collection.push(PpiCheck("Majors and Minors", data_checker_gen(data.majors)));
    ppi.collection.push(PpiCheck("Gender", data_checker_gen(['male', 'female', 'transgendered'])));

    ppi.collection.push(PpiCheck("GPA", (function () {

        var gpa_regex = /(?:\D|^)(\d\.\d{1,2})(?:\D|$)/g;

        return function (value) {

            var regex_match,
                regex_matches = [],
                float_version,
                match;

            while (regex_match = gpa_regex.exec(value)) {

                float_version = +regex_match[1];

                // Only accept year matches that have a non-digit before or
                // after the year.
                if (float_version > 0 && float_version < 5.01 && regex_match[0].length > 3) {
                    regex_matches.push(regex_match[1]);
                }
            }

            return regex_matches;
        };
    }())));

    ppi.collection.push(PpiCheck("Class Number", (function () {

        var class_num_regex = /(?:\s|^)([A-Z]{2,4}\s?\d{3})(?:\s|$)/ig;

        return function (value) {

            var regex_match,
                regex_matches = [],
                match;

            while (regex_match = class_num_regex.exec(value)) {

                if (regex_match[1]) {
                    regex_matches.push(regex_match[1]);
                }
            }

            return regex_matches;
        };
    }())));

    ppi.find_ppi = function (text) {

        var ppi_check,
            index,
            found_ppi,
            matches = {};

        for (index in ppi.collection) {

            ppi_check = ppi.collection[index];
            found_ppi = ppi_check.check(text);

            if (found_ppi.length > 0) {
                matches[ppi_check.title] = found_ppi;
            }
        }

        return matches;
    };

}(window.ia));
