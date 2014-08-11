var mainApp = angular.module("mainApp", []);


mainApp.service("sharedProperties",function(){
    var pageData = {};
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
        getPageData: function(){
            return pageData;
        },
        setPageData: function(obj){
            pageData=obj;
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
    startGallery: 5
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





