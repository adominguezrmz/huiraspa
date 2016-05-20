var siteApp = angular.module('siteApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

siteApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'templates/home.html',
			controller  : 'homeController'
		})
		.when('/about', {
			templateUrl : 'templates/about.html',
			controller  : 'aboutController'
		})
		.when('/enviroment', {
			templateUrl : 'templates/enviroment.html',
			controller  : 'enviromentController'
		})
		.when('/culture', {
			templateUrl : 'templates/culture.html',
			controller  : 'cultureController'
		})
		.when('/history', {
			templateUrl : 'templates/history.html',
			controller  : 'historyController'
		})
		.otherwise({redirectTo : '/home'});
});

// create the controller and inject Angular's $scope
siteApp.controller('mainController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
		
		$scope.siteInfo = {
					date : new Date(),
					navLinks : []
				};
			
		siteService.getSiteInfo()
					.success(function(data){
						$scope.siteInfo = data;
						$scope.siteInfo.date = new Date();
					});
}]);

siteApp.controller('homeController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
		
		$scope.model = {
					boxes: [],
					getHtml: function(htmlStr){
						return $sce.trustAsHtml(htmlStr);
					}
				};
			
		siteService.getInfo("home")
					.success(function(data){
						$scope.model.boxes = data.boxes;
					});
	
}]);

siteApp.controller('historyController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
	
		$scope.model = {
					boxes: [],
					towns: [],
					getHtml: function(htmlStr){
						return $sce.trustAsHtml(htmlStr);
					}
				};
		siteService.getInfo("history")
					.success(function(data){
						$scope.model.boxes = data.boxes;
					});
					
		siteService.getInfo("historyTowns")
					.success(function(data){
						$scope.model.towns = data;
					});
		
	}]);

siteApp.controller('aboutController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
	
		$scope.model = {
				boxes: [],
				getHtml: function(htmlStr){
					return $sce.trustAsHtml(htmlStr);
				}
			};
			
		siteService.getInfo("about")
					.success(function(data){
						$scope.model.boxes = data.boxes;
					});
}]);

siteApp.controller('enviromentController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
		
		$scope.model = {
				boxes: [],
				getHtml: function(htmlStr){
					return $sce.trustAsHtml(htmlStr);
				}
			};

		siteService.getInfo("enviroment")
					.success(function(data){
						$scope.model.boxes = data.boxes;
					});
}]);

siteApp.controller('cultureController', ['$scope', 'siteService', "$sce",
	function($scope, siteService, $sce) {
	
		$scope.model = {
				boxes: [],
				getHtml: function(htmlStr){
					return $sce.trustAsHtml(htmlStr);
				}
			};
		
		siteService.getInfo("culture")
					.success(function(data){
						$scope.model.boxes = data.boxes;
					});
}]);

siteApp.service('siteService', ['$http', '$templateCache', 
	function($http, $templateCache) {
		
		var _ = {};
		
		function getData(section){
			return $http.get("jsonData/"+section+"Info.json", { cache: $templateCache, })
						.success(function(data) {
						  return data;
						});
		}
		
		_.getSiteInfo = function(){
			return getData("site");
		};
		
		_.getInfo = function(infoFor){
			return getData(infoFor);
		};
		
		return _;
 }]);