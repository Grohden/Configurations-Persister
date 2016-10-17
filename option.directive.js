(function () {
    'use strict';
    var DEBUG = true;
    var ALL = false;

    /*global angular, console*/
    var link = function (scope, element, attrs, ctrl) {
        var id = scope.$id;

        (DEBUG || ALL) && console.debug("Object received in scope:",scope.grPersist);

        //If dev does not specify a property the module choose based on element type.
        if (!scope.grPersist){
            scope.grPersist = "auto";
        }

        ctrl.registerOption(element.context,scope.grPersist, id); //register element on elements list.
        
        /* http callback function*/
        ctrl.getData(function (response) {
            var data = response.data;

            if ($.isEmptyObject(data)) {
                console.info('Seems like the file needed to configure views is empty');
                return;
            }
            
            var view = element.context;
            var type = view.type;
            var typeArr = data[type];
            if (!typeArr) {return; }

            var savedAttributes;
            var position;
            /* Search for element in the array by id(wich was/is defined by $scope.$id)*/

            (DEBUG || ALL ) && console.debug("Searching for id",id,"in",typeArr);
            for (position = 0; position < typeArr.length; position++) {
                if (typeArr[position].keyID === id) {
                    savedAttributes = typeArr[position];
                    (DEBUG || ALL) && console.log("found!");
                    break;
                }

            }

            /*
            * FIXME: if you create a new view the old data will be replaced, the module uses scope id to reference the views.
            */
            if (!savedAttributes) {return; }

            //part where the data is aplied on view
            var objKeys = Object.keys(savedAttributes);

            /*
             * For any key() saved it will atribute to the respective element
             * eg: input['value'] = savedAtribute['value'] -> "some value"
             */
            for (position = 0; position < objKeys.length; position++) {
                var key = objKeys[position];
                view[key] = savedAttributes[key];
            }
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
}());