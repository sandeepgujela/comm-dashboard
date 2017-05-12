angular.module('app').factory('DashboardService',['Constants','$q','BaseService',function(Constants,$q,BaseService){
return{
	getSchoolList:function(data){
		var defer=$q.defer();
		var url="schools";
		// BaseService.post(url,data).success(function(response){
		// 	defer.resolve(response);
		// }).error(function(response){
		// 	defer.resolve(response);
		// })
		BaseService.post(url,data).then(function(response){
			if(response.status==200){
				defer.resolve(response);
			}else{
				defer.reject(response);// or write **defer.resolve(response);**
			}
		});
		return defer.promise;
	},
	getEventList:function(data){
		var defer=$q.defer();
		var url="eventTypes";
		BaseService.post(url,data).then(function(response){
			if(response.status==200){
				defer.resolve(response);
			}else{
				defer.reject(response);// or write **defer.resolve(response);**
			}
		});
		return defer.promise;
	},
	getEventStats:function(data){
	var defer=$q.defer();
		var url="eventItemStats";
		BaseService.post(url,data).then(function(response){
			if(response.status==200){
				defer.resolve(response);
			}else{
				defer.reject(response);// or write **defer.resolve(response);**
			}
		});
		return defer.promise;	
	}

}
}])