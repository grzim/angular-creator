/**
 * Created by Grzegorz on 2014-08-10.
 */
mainApp.controller("MainCtrl",function($scope){
    $scope.section = {
        quest : true,
        page : false,
        toggle : function() {
            this.quest = !this.quest;
            this.page = !this.page;
        }
    }
})

mainApp.controller("PageCtrl",function($scope, constants, sharedProperties){
    $scope.pageData = sharedProperties;

    console.log($scope.startName);
    $scope.load = function(name){
        console.log(name);
        var obj = localStorage.getItem(name);
        $scope.text = obj;
        obj = angular.fromJson(sharedProperties.getPageData());
        $scope.obj = obj;
        console.log(obj.tabs);
    }
    $scope.clearAll = function(){
        $scope.names = [];
        localStorage.clear();
    }
    kapusniak = $scope;
});

mainApp.controller("QuestCtrl",function($scope, constants, sharedProperties){
     $scope.hints = {
        mainMenu : false,
        subtabs: false,
        additionalContent: false
    }
    $scope.mainTabs = {
        maxNumberOfTabs: constants.mainTabsNumber,
        activeMainTab: "",
        level: 'tabs',
        numberOfTabs: 0,
        name: constants.rootTabName,
        init : function(){
            arrayInterface.call(this, Tab, "tab");
            this.update(1);
            this.numberOfTabs=1;
        }
    }
    $scope.summary ={
        logo: "",
        motto: "",
        colors: new Array(3)

    }
    $scope.fanpage = {
        followers : "",
        likeButton : false,
        url : ""
    }
    $scope.getNumber = function(num){
        var array = new Array(num);
        return array;
    }
    $scope.selectActiveMainTab = function(level,tab){
        if(level==="tabs") $scope.activeMainTab=tab;
    }
    $scope.getActiveMainTab = function(){
        return $scope.mainTabs.activeMainTab;
    }
    $scope.generate = function(){
        var pageData = {
            tabs : $scope.mainTabs,
            summary : $scope.summary,
            fanpage : $scope.fanpage
        }
        pageData = angular.toJson(pageData, true);
        sharedProperties.setPageData(pageData);
        sharedProperties.setPageName($scope.summary.name);
        localStorage.setItem($scope.summary.name, pageData);
        $scope.section.toggle();

        //document.cookie = 'name ='+ $scope.summary.name+', value = '+obj+'; expires=Thu, 2 Aug 2022 20:20:20 UTC; path=/';
        // window.location = "/page.html"

    }
    $scope.toggleHint = function(elem){
        $scope.hints[elem] =  !$scope.hints[elem];
    },
    $scope.showHint = function(elem){
        $scope.hints[elem] =  true;
    }

    $scope.hideHint = function(elem){
        $scope.hints[elem] =  false;
    }

    function Tab(){
        SubTab.call(this);
        this.level = "subtabs";
        arrayInterface.call(this, SubTab,  "tab");
        this.maxNumberOfTabs = constants.subTabsNumber;
        this.numberOfTabs = 0;
        this.init = function(){
            console.log("init");
        }
    }


    function SubTab(){
        this.level = "subtab";
        this.name;
        this.mainText;
        this.pictures= {
            init : function(){
                arrayInterface.call(this, Picture,  "list");
                this.update(constants.startPictures);
                return constants.startPictures;
            }
        };
        this.video = new Video();
        this.gallery = {
            init : function(){
                arrayInterface.call(this, Picture,  "list");
                this.update(constants.startGallery);
                return constants.startGallery;
            }
        };
        this.text;
        this.contactForm = new Contact();
    }

    function Media(){
        this.title;
        this.description;
        this.file;
    }


    function Picture(){
        Media.call(this);
    }

    function Video(){
        Media.call(this);
    }

    function Contact() {
        this.general;
        this.phone;
        this.email;
        this.twitter;
        this.youtube;
        this.facebook;
        this.xpos;
        this.ypos;
    }

});


mainApp.controller("tabCtrl", function($scope, constants){

    $scope.constants = constants;
    $scope.pointer = {
        name : "main menu",
        level: "tabs",
        scope : $scope,
        tabNumber: ""
    };
    $scope.log = function(){
        console.log($scope);
    }
    $scope.tabInit = function(name, level, scope, number){
        $scope.pointer.name = name || "";
        $scope.pointer.level = level || "tabs";
        $scope.pointer.scope = scope ||  $scope.mainTabs;
        $scope.pointer.tabNumber = number || "";
        $scope.pointer.scope.init();
        if(level=="subtabs")console.log(name);
    };
});

