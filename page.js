var pageApp = angular.module("pageApp", []);
var kapusniak;
function PageCtrl($scope){
    $scope.names = Object.keys(localStorage);
    $scope.load = function(name){
        console.log(name);
        var obj = localStorage.getItem(name);
        $scope.text = obj;
        obj = angular.fromJson(obj);
        $scope.obj = obj;
        console.log(obj.tabs);
    }
    $scope.clearAll = function(){
        $scope.names = [];
        localStorage.clear();
    }
    kapusniak = $scope;
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}