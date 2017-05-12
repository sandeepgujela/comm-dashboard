angular.module('school-list',['event-list']).config(function($stateProvider){
	$stateProvider.state('school-list',{
		url:'',
		parent:'dashboard',
		templateUrl:'dashboard/school-list/school-list.tpl',
		controller:'SchoolListCtrl'

	});
}).controller('SchoolListCtrl',function($scope,DashboardService,$state){
	$scope.schoolListCtrl={
		from:0,
		offset:10,
		paginatedResponse:0
	};
	console.log("inside School List Ctrl");
	$scope.getSchoolList=function(){
		DashboardService.getSchoolList({fromDate:$scope.schoolListCtrl.fromDate,toDate:$scope.schoolListCtrl.toDate,from:0,offset:$scope.schoolListCtrl.offset}).then(function(response){
			$scope.schoolListCtrl.schoolList=response.data.response;
			$scope.schoolListCtrl.paginatedResponse=response.data.response.length;
			// console.log("response received ",$scope.schoolListCtrl.schoolList);
		})
		
	}

	$scope.loadMore=function(){
		DashboardService.getSchoolList({fromDate:$scope.schoolListCtrl.fromDate,
										toDate:$scope.schoolListCtrl.toDate,
										from:++$scope.schoolListCtrl.from,
										offset:$scope.schoolListCtrl.offset}).then(function(response){
			console.log("paginated response",response.data.response);
			response.data.response.forEach(function(school){
				$scope.schoolListCtrl.schoolList.push(school);
			})
			$scope.schoolListCtrl.paginatedResponse=response.data.response.length;
		})
		
	}

	$scope.getEventList=function(schoolCode){
		$state.go('event-list',{'schoolCode':schoolCode,'fromDate':$scope.schoolListCtrl.fromDate,'toDate':$scope.schoolListCtrl.toDate});
		// $state.go('event-list',{'schoolCode':schoolCode,'fromDate':123564,'toDate':321651});

	}
})