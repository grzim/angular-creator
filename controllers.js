/**
 * Created by Grzegorz on 2014-08-10.
 */
mainApp.controller("MainCtrl",function($scope, $location){
    $scope.listeners = {
        historyBack : []
        },
    $scope.section = {
        questUrl: "",
        pageUrl: "",
        quest : true,
        page : false,
        toggle : function() {

            this.quest = !this.quest;
            this.page = !this.page;
        }
    }
})

mainApp.controller("PageCtrl",function($scope, constants, sharedProperties){
    $scope.navigation = {
        back : function(){
            window.history.back();
        }
    };
    $scope.properties = sharedProperties;
    $scope.pageData = sharedProperties.pageData;
    $scope.name = "";
    $scope.$watch(sharedProperties.pageData.value,function(newValue,oldValue){
        if(angular.isDefined(newValue))
            $scope.name = newValue.summary.urlName;
    });
    $scope.hexToBase64 = function(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    };
    $scope.storage = {
        load : function(name){
            console.log(name);
            var obj = localStorage.getItem(name);
            obj = angular.fromJson(obj);
            sharedProperties.loadPageData(obj);
            console.log(obj);
        },
        allNames : sharedProperties.allNames,
        clearAll : function(){
            $scope.properties.allNames = [];
            this.allNames = $scope.properties.allNames;
        localStorage.clear();
    }
    }
    mariusz = sharedProperties;
    renata = $scope.pageData;
    kapusniak = $scope;
});

mainApp.controller("QuestCtrl",function($scope, $location, $rootScope, constants, sharedProperties){
     $scope.hints = {
        mainMenu : false,
        subtabs: false,
        additionalContent: false
    }
    $scope.setQuestUrl = function(url){
        var loc = $location.path();
        $location.path(url+'/create');
        $scope.section.questUrl = $location.path();
        $scope.listeners.historyBack.push ( $rootScope.$on('$locationChangeSuccess', function(object, newLocation, previousLocation) {
            if($location.path() === loc)
                $scope.summary.urlName = "";
            if($location.path() === $scope.section.questUrl) {
                var temp = $location.path().split("/");
                $scope.summary.urlName = temp[temp.length-2];
            }
        }) );
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
        name: "",
        urlName: "",
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
    $scope.addDownload = function(save){
        if(save==true){
            console.error($scope);
            var json = angular.toJson($scope.mainTabs);
            console.error(json);
            var blob = new Blob([json], {type: "application/json"});
            var url  = URL.createObjectURL(blob);
            console.info(document.getElementById("btn-generate-download"));
            document.getElementById("btn-generate-download").href = url;
            //dodać watchera jakby ktos pozniej cos pozmienial w modelu too zeby sie updatowalo
            document.getElementById("btn-generate-download").download = $scope.summary.name;
        }
        else{
            $scope.downloadUrl = "";//detach
        }
    }
    $scope.generate = function() {
        var pageData = {
            tabs: $scope.mainTabs,
            summary: $scope.summary,
            fanpage: $scope.fanpage
        }
        console.log(pageData.tabs);
        sharedProperties.setPageData(pageData);
        localStorage.setItem($scope.summary.urlName, angular.toJson(pageData, true));
        $scope.section.questUrl = $location.path();
        $location.path('/' +"preview");
        $scope.section.quest = 0;
        $scope.section.page = 1;

        $scope.listeners.historyBack.push ( $rootScope.$on('$locationChangeSuccess', function(object, newLocation, previousLocation) {
            if($location.path() === $scope.section.questUrl)
                $scope.section.toggle();
        }) );
        console.log(pageData);

        var json = angular.toJson(pageData, true);
        console.info(json);
        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        document.getElementById("btn-generate").href = url;
        console.log($scope.summary.name);
        document.getElementById("btn-generate").download = $scope.summary.name;
        console.info(document.getElementById("btn-generate").download );

        //document.cookie = 'name ='+ $scope.summary.name+', value = '+obj+'; expires=Thu, 2 Aug 2022 20:20:20 UTC; path=/';
        // window.location = "/pageTopNav.html"

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

