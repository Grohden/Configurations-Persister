(function () {
    'use strict';
    /*global angular, $, console, require*/
    angular.module('configurations').controller('configurationsController',
        function ($scope, $http, sharedConfigurations) {
            var options = [];
            var configurations = sharedConfigurations;



            /**Register the option for latter save
             * @param {HTMLElement} element - directive context
             * @param {String} optionToSave - key values to save or all
             * @param {String} id - view id*/
            this.registerOption = function registerOption(element,optionToSave, id) {
                /* 
                 * This function MUST NOT BE CALLED TWICE on directive link()
                 * otherwise it will be pushing again the same option to
                 * options array.
                 */
                element.keyID = id; //not use id, id is a HTML attr.
                element.willSave = optionToSave;
                options.push(element);
            };

            this.saveConfigurations = function saveConfigurations() {
                console.log(options);
                var fs;
                try {
                    fs = require('fs'); //NWJS fileSystem is required to save a file.
                } catch (error) {
                    console.error('Require is not defined. Run in a NWJS window/app to save configurations');
                    return;
                }
                
                var x;
                configurations.configs = {};
                for (x = 0; x < options.length; x++) {
                    var element = options[x];
                    
                    if (configurations.configs[element.type] === undefined) {
                        configurations.configs[element.type] = [];
                    }
                    
                    /* TODO:
                     * there's problems choosing which key is important to save,
                     * for now i'll get only these keys.
                     */
                    var attributes = {keyID: element.keyID};
                    attributes[element.willSave] = element[element.willSave];

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