mainApp.directive('tab',function(){

    return{
        restrict: 'EA',
        scope: {
            scope: "=scope",
            name: "=name",
            level: "=level",
            tabNumber: "=number" || "",
            init: function(){
                var that = this;console.log(this);
                this.pointer = {
                    scope: that.scope,
                    name: that.name,
                    level: that.level,
                    tabNumber: that.tabNumber
                }
                this.pointer.scope.init();
                console.log(this);
            }
        },
        templateUrl: 'tab.html'
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