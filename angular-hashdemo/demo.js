function MainCtrl($route, $anchorScroll) {
    var self = this;

    $route.when('/list',
              {template: '/gh/get/response.html/msgilligan/fiddles/tree/master/angular-hashdemo/', controller: ListCtrl});
    $route.when('/:id/detail',
              {template: '/gh/get/response.html/msgilligan/fiddles/tree/master/angular-hashdemo-response2/', controller: DetailCtrl});
    $route.otherwise({redirectTo: '/list'});

    this.$on('$afterRouteChange', function(event) {
        self.params = $route.current.params;
        $anchorScroll();
    });

  $route.parent(this);
}

function ListCtrl(BigList) {
	this.entries = BigList.list();
}

function DetailCtrl($routeParams, BigList) {
	this.entry = BigList.detail($routeParams.id);
}

var hsh = angular.module('hsh', []);

hsh.config(function($locationProvider) {
  $locationProvider.hashPrefix('!');
});

hsh.factory('BigList', function() {
    function biglist() {
    }
    var self = biglist;
    biglist.items = [];
    for (var i=0 ; i < 100 ; i++) {
        biglist.items[i] = {id: i, data: "String of " + i};
    }
    
    biglist.list = function() {
        return self.items;
    }
    
    biglist.detail = function(id) {
        return self.items[id];
    }
    return biglist;
}, {});

