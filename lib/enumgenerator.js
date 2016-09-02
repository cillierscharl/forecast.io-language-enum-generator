var https = require('https');
var jsdom = require('jsdom');


var EnumGenerator = function() {}

EnumGenerator.prototype = {
    generate: function(module_callback) {
        var options = {
            host: 'developer.forecast.io',
            path: '/docs/v2',
            port: 443,
            method: 'GET'
        };

        callback = function(response) {
            var stringResponse = '';

            response.setEncoding('utf8');

            response.on('data', function(chunk) {
                stringResponse += chunk;
            });

            response.on('end', function(chunk) {
                parseResponse(stringResponse);
            });

            response.on('error', function(err) {
                console.error(err);
            });
        }

        function parseResponse(response) {
            var languages = [];
            jsdom.env(
                response, ['http://code.jquery.com/jquery.js'],
                function(err, window) {
                    // find all the code blocks in the language section of the api docs
                    var $languageNode = window.$("code:contains('lang=[language]')").parent();
                    $languageNode.find('code').each(function(i, element) {
                        if (i < 4) {
                            return;
                        }
                        languages.push(element.textContent);
                    });
                    buildEnum(languages);
                });
        }

        function buildEnum(languages) {
            var response = 'public enum Language' + '\n' + '{';
            languages.forEach(function(lang) {
                // Add more C# reserved keywords if needed
                if (lang == 'is') {
                    lang = '@is'
                };

                if (lang.indexOf('-') > -1) {
                    response += '\t' + '[Description("' + lang + '")]' + '\n';
                    lang = lang.replace(new RegExp('-', 'g'), '');
                }

                response += '\t' + lang + ',' + '\n';
            });
            response = response.substring(0, response.length - 2);
            response += '\n' + '}';
            module_callback(response);
        }
        https.request(options, callback).end();
    }
}

module.exports = new EnumGenerator();
