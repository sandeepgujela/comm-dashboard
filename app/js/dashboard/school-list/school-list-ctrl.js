angular.module('school-list',['event-list']).config(function($stateProvider){
	$stateProvider.state('school-list',{
		url:'/school-list',
		parent:'dashboard',
		templateUrl:'dashboard/school-list/school-list.tpl',
		controller:'SchoolListCtrl'

	});
}).controller('SchoolListCtrl',function($scope,DashboardService,$state){
	$scope.schoolListCtrl={};
	console.log("inside School List Ctrl");
	$scope.getSchoolList=function(){
		DashboardService.getSchoolList({fromDate:$scope.schoolListCtrl.fromDate,toDate:$scope.schoolListCtrl.toDate}).then(function(response){
			$scope.schoolListCtrl.schoolList=response.data.response;
			console.log("response received ",$scope.schoolListCtrl.schoolList);
		})
		
	}
	$scope.getEventList=function(schoolCode){
		// $state.go('event-list',{'schoolCode':schoolCode,'fromDate':$scope.schoolListCtrl.fromDate,'toDate':$scope.schoolListCtrl.toDate});
		$state.go('event-list',{'schoolCode':schoolCode,'fromDate':123564,'toDate':321651});

	}
})