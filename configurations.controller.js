(function () {
    'use strict';
    /*global angular, $, console, require*/
    angular.module('configurations').controller('configurationsController',
        function ($scope, $http, sharedConfigurations) {
            var options = [];
            var configurations = sharedConfigurations;
                    
            this.registerOption = function registerOption(option, id) {
                /* 
                 * This function MUST NOT BE CALLED TWICE on directive link()
                 * otherwise it will be pushing again the same option to
                 * options array.
                 */
                option.context.keyID = id; //not use id, id is a HTML attr.
                options.push(option);
            };

            this.saveConfigurations = function saveConfigurations() {
                var fs;
                try {
                    fs = require('fs'); //NWJS fileSystem is required to save a file.
                } catch (error) {
                    console.error('Require is not defined. Run in a NWJS window/app to save configurations');
                    return;
                }
                
                var x = 0;
                configurations.configs = {};
                for (x = 0; x < options.length; x++) {
                    var element = options[x].context;
                    
                    if (configurations.configs[element.type] === undefined) {
                        configurations.configs[element.type] = [];
                    }
                    
                    /* TODO:
                     * there's problems choosing which key is important to save,
                     * for now i'll get only these keys.
                     */
                    var attributes = {
                        keyID: element.keyID,
                        checked: element.checked,
                        value: element.value
                    };

                    configurations.configs[element.type].push(attributes);
                }
                
                $scope.$apply();
                
                /* Proper saving file part*/

                var outputFilename = 'app/configurations/configurations.data.json';
                fs.writeFile(outputFilename, angular.toJson(sharedConfigurations.configs," "), function (err) {
                    console.log(err ? "Error saving file:" + err : "File saved to " + outputFilename);
                });
            };
        
            this.getData = function getData(fn) {
                $http.get('app/configurations/configurations.data.json').then(fn);
            }; 

        });
}());