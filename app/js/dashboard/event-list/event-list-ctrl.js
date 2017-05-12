angular.module('event-list', []).config(function($stateProvider) {
    $stateProvider.state('event-list', {
        url: '/event-list/:schoolCode/:fromDate/:toDate',
        params: { schoolCode: null, fromDate: null, toDate: null },
        parent: 'dashboard',
        templateUrl: 'dashboard/event-list/event-list.tpl',
        controller: 'EventListCtrl',
        resolve: {
            eventList: function(DashboardService, $stateParams) {
             return DashboardService.getEventList({ fromDate:$stateParams.fromDate, toDate:$stateParams.toDate, schoolCode: $stateParams.schoolCode }).then(function(response) {
                    console.log("response in resolve", response.data.response);
                    return response.data.response;
                })
            }
        }
    })
}).controller('EventListCtrl', function($scope, DashboardService, $stateParams, eventList) {
    $scope.eventListCtrl = {
        stateParams: $stateParams,
        fromDate: $stateParams.fromDate,
        toDate: $stateParams.toDate,
        eventList: eventList

    };
    console.log("inside School List Ctrl", eventList);
    $scope.getSchoolList = function() {
        DashboardService.getEventList({toDate: $scope.eventListCtrl.toDate, fromDate: $scope.eventListCtrl.fromDate, schoolCode:$stateParams.schoolCode }).then(function(response) {
            $scope.eventListCtrl.eventList = response.data.response;
            // console.log("response received ",$scope.eventListCtrl.eventList);
        })

    }
});
