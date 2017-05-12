angular.module('app').factory('BaseService',['Constants','$http',function(Constants,$http){
	return {
		post:function(url,data){
			console.log("datat in base BaseService",data);
			return $http.post(Constants.APP_URL+url,data);
		}
	}
}])