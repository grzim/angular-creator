/**
 * Created by Grzegorz on 2014-08-10.
 */
mainApp.controller("MainCtrl",function($scope, $location){
    $scope.listeners = {
        history : []
        },
    $scope.section = {
        questUrl: "",
        pageUrl: "",
        quest : true,
        page : false,
        setQuestUrl : function(url){
            $location.path(url+'/create');
            this.questUrl = $location.path();
        },
        getPageNameFormQuestUrl: function(url){
            if(angular.isUndefined(url)){
                url = $location.path();
            }
            var arr = url.split("/");
            return arr[arr.length-2];
        },
        toggle : function() {

            this.quest = !this.quest;
            this.page = !this.page;
        },
        goToQuest: function(){
            this.quest=true;
            this.page=false;
        },
        goToPage: function(){
            this.quest=false;
            this.page=true;
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
        $scope.section.setQuestUrl(url);
        $scope.listeners.history.push ( $rootScope.$on('$locationChangeSuccess', function(object, newLocation, previousLocation) {
            if($location.path() === loc)
                $scope.summary.urlName = "";
            if($location.path() === $scope.section.questUrl) {
                $scope.summary.urlName = $scope.section.getPageNameFormQuestUrl();
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
        },
        selectActiveMainTab : function(level,tab){
        console.log(this.activeMainTab);
            if (level === "tabs") this.activeMainTab = tab;
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
    $scope.getActiveMainTab = function(){
        return $scope.mainTabs.activeMainTab;
    }

    $scope.generate = function() {
        var pageData = {
            tabs: $scope.mainTabs,
            summary: $scope.summary,
            fanpage: $scope.fanpage
        }
        console.log(pageData.tabs);
        sharedProperties.setPageData(pageData);
        var localStoreData = pageData;
        //change this to something smarter, ie underscore
        for(var i in localStoreData.tabs.tab){
            console.log(localStoreData.tabs.tab[i]);
            localStoreData.tabs.tab[i].pictures = {};
            localStoreData.tabs.tab[i].gallery = {};
            for(var j in  localStoreData.tabs.tab[i].subtabs) {
                localStoreData.tabs.tab[i].subtab[j].pictures = {};
                localStoreData.tabs.tab[i].subtab[j].gallery = {};
            }
        }

        localStorage.setItem($scope.summary.urlName, angular.toJson(localStoreData, true));
        $scope.section.questUrl = $location.path();
        $location.path('/' +$scope.summary.urlName+'/preview');
        $scope.section.pageUrl = $location.path();
        $scope.section.goToPage();

        $scope.listeners.history.push ( $rootScope.$on('$locationChangeSuccess', function(object, newLocation, previousLocation) {
            if($location.path() === $scope.section.questUrl)
                $scope.section.goToQuest();
            if($location.path() === $scope.section.pageUrl)
                $scope.section.goToPage();
        }) );
        console.log(pageData);

    }

    $scope.file = {
        value: {},
        compute : function(event){
            //how to target event originator?
            var element =  document.getElementById('btn-save-anchor');
            console.error( element);
                var pageData = {
                    tabs: $scope.mainTabs,
                    summary: $scope.summary,
                    fanpage: $scope.fanpage
                }
                var json = angular.toJson(pageData, true);
                console.info(json);
                var blob = new Blob([json], {type: "application/json"});
                var url = URL.createObjectURL(blob);
                element.download    = $scope.summary.name;
                element.href        = url;
        }
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

