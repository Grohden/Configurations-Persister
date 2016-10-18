(function () {
    'use strict';
    var DEBUG = false;
    var INFO = false;
    var ALL = false;
    var ERROR = true;

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
                (DEBUG || ALL) && console.debug(options);
                var fs;
                try {
                    fs = require('fs'); //NWJS fileSystem is required to save a file.
                } catch (error) {
                    (ERROR || ALL) && console.error('Require is not defined. Run in a NWJS window/app to save configurations');
                    return;
                }

                configurations.configs = {};
                for (var x = 0; x < options.length; x++) {
                    var element = options[x];

                    if (!configurations.configs[element.type]) {
                        configurations.configs[element.type] = [];
                    }

                    //TODO: let dev chose the id for view.
                    var attributes = {keyID: element.keyID};

                    //If dev passed an array.
                    if(element.willSave instanceof Array){
                        for(var y=0; y<element.willSave.length;y++){
                            attributes[element.willSave[y]] = element[element.willSave[y]]; //FIXME: ugly code, split in variables.
                        }
                    } else if(element.willSave == "auto"){
                        //TODO: implement
                    } else {
                        //If dev passed only one option
                        attributes[element.willSave] = element[element.willSave];
                    }

                    configurations.configs[element.type].push(attributes);
                }
                
                $scope.$apply();
                
                /* Proper saving file part*/

                var outputFilename = 'app/configurations/configurations.data.json';
                fs.writeFile(outputFilename, angular.toJson(sharedConfigurations.configs," "), function (error) {
                    if(error){
                        (ERROR || ALL) && console.error("Error saving file:" + error);
                    } else{
                        (INFO || ALL) && console.info("File saved to " + outputFilename);
                    }
                });
            };
        
            this.getData = function getData(fn) {
                $http.get('app/configurations/configurations.data.json').then(fn);
            }; 

        });
}());