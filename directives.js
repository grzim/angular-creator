mainApp.directive('tab',function(constants){

    return{
        restrict: 'EA',
        scope: {
            obj: "=name",
            index: "="
        },
        link: function(scope) {
            scope.constants = constants;
            scope.pointer = {};
            scope.pointer.name = scope.obj.name;
            scope.pointer.level = scope.obj.level;
            scope.pointer.scope = scope.obj;
            scope.pointer.tabNumber = scope.index || "";
            scope.pointer.scope.init();
            console.log(scope.pointer.scope);
        },
        templateUrl: 'tab.html'
    }
});
mainApp.directive('hintBox', function(serviceHints){
    return{
        restrict: 'EA',
        scope:{
            name: "="
        },
        controller: function($scope){
            $scope.status = serviceHints.hints
        },
        transclude: true,
        template: '<div ng-show="status[name]" class="hint alert alert-info" ng-transclude role="alert"></div>'
    }
});

mainApp.directive('hintButton',function(serviceHints){
    return {
        restrict: 'EA',
        scope: {
            name: "="
        },
        link: function(scope, element, attr){
       //     element.addClass("message-disabled");
            element.css({'cursor':'pointer'});
            element.on("click",function(){
                serviceHints.toggle(scope.name, element);
                console.log(serviceHints.hints[scope.name]);
            })
        },
        replace: true,
        template: '<span class="glyphicon glyphicon-info-sign message-disabled"></span>'

    }
});
mainApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }

}]);