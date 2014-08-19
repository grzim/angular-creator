var mainApp = angular.module("mainApp", ['ngAnimate', 'ngRoute']);


mainApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/index.html', {
            templateUrl: "index.html",
            controller: "mainCtrl"
        }).
        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});

mainApp.service("serviceHints",function(constants){
    var that = this;
    this.hints = {};
    this.show = constants.rootTabName;
    this.toggle = function(name, element){
        if(angular.isUndefined(that.hints[name])){
            that.hints[name] = true;
            element.addClass("message-active").removeClass("message-disabled");
        }
        else {
            that.hints[name] = !that.hints[name];
            if(element.hasClass("message-disabled")){
                element.addClass("message-active").removeClass("message-disabled");
            }
            else{
                element.removeClass("message-active").addClass("message-disabled");
            }
        }
    }
})
mainApp.service("sharedProperties",function(){
    var retriveFromLocalStorage = (function(){
        var all = [];
        for(var i = 0;i < localStorage.length; i++){
            all.push(localStorage.key(i));
        }
        return all;
    }());
    console.log(this.allNames);
    var that = this;
    return {
        pageName : "",
        allNames: retriveFromLocalStorage,
        pageData: { value : ""},
        getPageData: function(){
            return this.pageData;
        },
        setPageData: function(obj){
            this.pageData.value=obj;
            this.pageName = obj.summary.urlName;
            this.allNames.push(obj.summary.urlName);
        },
        loadPageData: function(obj){
            this.pageData.value=obj;
            this.pageName = obj.summary.urlName;
        },
        getPageName: function(){
            return this.pageName;
        },
        setPageName: function(name){
            this.pageName = name;
            this.allNames.push(name);
        },
        getAllNames: function(){
            return this.allNames;
        }
    }
   });

mainApp.constant("constants",{
    mainTabsNumber : 7,
    subTabsNumber : 7,
    maxPictures : 3,
    maxGallery : 18,
    startPictures: 1,
    startGallery: 5,
    rootTabName: 'main menu',
    rootTabLevelName: 'tabs'
})

function r(val){
    return val = val || 0;
}

function arrayInterface(obj, arrayName){
    this[arrayName] = [];

    var array = this[arrayName];
    this.push = function(){
        var element = new obj();
        array.push(element);
    };
    this.remove = function(index){
        array.splice(index, 1);
    };
    this.pop = function(){
        array.pop();
    };
    var that = this;
    this.update = function(number){
        var length = r(array.length);
      if(length>number){
            while(length>number){
                this.pop();
                length--;
            }
        }
        if(length<number){
            while(length<number){
                this.push();
                length++;
            }
        }
    }
}





