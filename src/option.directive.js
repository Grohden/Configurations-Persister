(function () {
    'use strict';
    var DEBUG = false;
    var ERROR = false;
    var INFO = true;
    var ALL = true;

    /*global angular, console*/
    var link = function (scope, element, attrs, ctrl) {
        var id = scope.$id;

        (DEBUG || ALL) && console.debug("Object received in scope:",scope.grPersist);

        //If dev does not specify a property the module choose based on element type.
        if (!scope.grPersist){
            scope.grPersist = "auto";
        }

        ctrl.registerOption(element[0],scope.grPersist, id); //register element on elements list.
        
        /* http callback function*/
        ctrl.getData(function (response) {
            var data = response.data;

            if (angular.equals({},data)) {
                (INFO || ALL) && console.info('Seems like the file needed to configure views is empty');
                return;
            }
            
            var view = element[0];
            var type = view.type;
            var typeArr = data[type];
            if (!typeArr) {return; }

            var savedAttributes = searchForIdInArray(id,typeArr);

            /*
            * FIXME: if you create a new view the old data will be replaced, the module uses scope id to reference the views.
            */
            if (!savedAttributes) {return; }

            putValuesInTheView(savedAttributes,view);

        });

    };
    
    angular.module('configurations').directive(
        'grPersist',
        function () {
            return {
                require: '^configurations',
                scope: {
                    grPersist:"="
                },
                link: link
            };
        }
    );

    function putValuesInTheView (storedObject,view){
        //part where the data is applied on view
        var objKeys = Object.keys(storedObject);
        var position = 0;
        do{
            var key = objKeys[position];
            view[key] = storedObject[key];
        } while(objKeys.length > ++position);
    }

    /**
     *  Search for element in the array by id(wich was/is defined by $scope.$id)
     */
    function searchForIdInArray(id,array){
        var returnValue;
        var position;

        (DEBUG || ALL ) && console.debug("Searching for id",id,"in",array);
        for (position = 0; position < array.length; position++) {
            if (array[position].keyID === id) {
                returnValue = array[position];
                (DEBUG || ALL) && console.log("found!");
                break;
            }
        }
        return returnValue;
    }

}());