(function () {
    'use strict';
    /*global angular, console*/
    var link = function (scope, element, attrs, ctrl) {
        var id = scope.$id;
        ctrl.registerOption(element, id); //register element on elements list.
        
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
            if (typeArr === undefined) {return; }
            var savedAtributes;
            var x = 0;
            /* Search for element in the array by id(wich was/is defined by $scope.$id)*/

            console.log("Searching for id",id,"in",typeArr);
            for (x = 0; x < typeArr.length; x++) {
                if (typeArr[x].keyID === id) {
                    savedAtributes = typeArr[x];
                    console.log("found!");
                    break;
                }

            }

            /*
            * Problems if the user create a new view and then refresh and dont save.
            * Due to the use of $id of the scope for view save/restore the creation
            * of a new scope with the id of the old scope the views cant 'see' themselves
            * anymore.
            *  Solution could be detect this problem, then save and refresh.. but the data will be lost.
            */
            if (savedAtributes === undefined || savedAtributes === null) {return; }

            //part where the data is aplied on view
            var objKeys = Object.keys(savedAtributes);

            /*
             * For any key() saved it will atribute to the respective element
             * eg: input['value'] = savedAtribute['value'] -> "some value"
             */
            for (x = 0; x < objKeys.length; x++) {
                var key = objKeys[x];
                view[key] = savedAtributes[key];
            }
        });
        
        

    };
    
    angular.module('configurations').directive(
        'persistValue',
        function () {
            return {
                require: '^configurations',
                scope: {},
                link: link
            };
        }
    );
}());