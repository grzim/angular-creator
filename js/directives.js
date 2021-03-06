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
        template: '<div ng-show="status[name]" class="hint alert alert-info hint-box" ng-transclude role="alert"></div>'
    }
});

mainApp.directive('hintButton',function(serviceHints){
    return {
        restrict: 'EA',
        scope: {
            name: "="
        },
        link: function(scope, element, attr){
            element.css({'cursor':'pointer'});
            element.on('mouseover',function(){
                scope.$apply(serviceHints.toggle(scope.name, element));
            })
        },
        replace: true,
        template: '<span class="glyphicon glyphicon-info-sign message-disabled hint-button" ng-class="class"></span>'

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

mainApp.directive('listChange',function(){
    return{
        restrict: 'EA',
        scope: {
            list: "=",
            index: "=",
            up: "=",
            down: "=",
            max: "="
        },
        link: function(scope, element){
            element.on("click",function(){
                var temp;
                if(scope.index==0 && scope.up==true)
                    return;
                if(scope.index==scope.max && scope.down==true)
                    return;
                if(scope.down==true){
                    temp = scope.list[scope.index-1];
                    scope.list[scope.index-1] = scope.list[scope.index];
                    scope.list[scope.index] = temp;
                }
                if(scope.up==true){
                    temp = scope.list[scope.index+1];
                    scope.list[scope.index+1] = scope.list[scope.index];
                    scope.list[scope.index] = temp;
                }
            })
        },
        template:'<span class="glyphicon" ng-class="{\'glyphicon-arrow-up\':up, \'glyphicon-arrow-down\':down, \'up\':up, \'down\':down}"></span>'
    }
})

mainApp.directive("addPictures",function(){
    return{
        restrict: 'EA',
        scope:{
            gallery:"=",
            model: "=",
            maxPictures: "="
        },
        templateUrl: "addPictures.html"
    }
})
/*
mainApp.directive("tabToSubtabPointer",function(){
    return{
        controller : function(scope,element, attr){

        }
    }
})*/

//////////////////cube
mainApp.directive("navigationInside",function(){

    return{
        scope: {
            endDiv : "=scrollTo"
        },
        link: function(scope,element, attributes){
            var end = document.getElementsByClassName(scope.endDiv);
            window.onscroll = checkAndStop();
            function checkAndStop(){
                var elemY = element.offsetTop;
                var endDivY = end.offsetTop + end.css("height");
                if(elemY>endDivY){
                    end.css("position","relative")
                }
                }
        }
    }
})