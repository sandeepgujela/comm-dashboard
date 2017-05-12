angular.module('dashboard', ['school-list','event-list']).config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        abstract:'true',
        templateUrl: 'dashboard/dashboard.tpl',
        controller: 'SchoolCtrl'
    }
    );
}

) .controller('SchoolCtrl', function($scope, $http, $filter, Constants, $state, $location,$q) {
    
    $scope.show1=true;
    $scope.show2=false;
    $scope.show3=false;
    $scope.data=[];
    $scope.schoolCode='';
    $scope.eventType='';
    $scope.eventId='';
    $scope.key='';
    $scope.dataTarget='';
    $scope.profile= {};
    $scope.email= {};
    $scope.sent= {};
    $scope.values=[];
    $scope.emails=[];
    $scope.sents=[];
    $scope.targetSents=[];
    $scope.messageCodes=[];
    $scope.getEventDate=[];
    var myData= [];
    var data = [];
    var url=Constants.APP_URL;
    $scope.getdate=function() {
        // $scope.fromDate=new Date("2017-05-01T14:07:41.000Z");
        // $scope.endDate=new Date("2017-05-05T14:07:41.000Z");
 var dt = new Date($scope.endDate);
         dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);
        var fromDt = new Date($scope.fromDate);
       fromDt.setHours(fromDt.getHours()+6)





        var schoolCode= {
            "size": 0, "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                                "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    }, 
                    "aggs": {
                        "School_Count": {
                            "terms": {
                                "field": "schoolCode",
                                "size":500
                            }
                        }
                    }
                }
            }
        };
        console.log("date code", $scope.endDate);
        $http.post(url, schoolCode) .then(function(response) {

            $scope.myData=response.data.aggregations.dates_between.School_Count.buckets;
           
            $scope.show1=true;
            $scope.show2=false;


 if ($scope.myData.length != 0) {
        $scope.noSites = false
      } else {
        $scope.noSites = true
      }

  $scope.propertyName = 'key';
  $scope.reverse = true;
  $scope.data = myData;


  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };


console.log("mydata" , $scope.myData.length);

        }, function(error) {
            // alert(JSON.stringify(error));                
        }
        )
    }
    $scope.goStudentCode=function(schoolCode) {
        $scope.schoolCode=schoolCode;
          var dt = new Date($scope.endDate);
         dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
       fromDt.setHours(fromDt.getHours()+6)
        var eventTypes= {
            "size": 0, "query": {
                "bool": {
                    "must": {
                        "match": {
                            "schoolCode": schoolCode
                        }
                    }
                }
            },
             "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                                "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    },
                     "aggs": {
                        "School_Count": {
                            "terms": {
                                "field": "schoolCode"
                            }
                            , "aggs": {
                                "event_type": {
                                    "terms": {
                                        "field": "eventType",
                                        "size":500
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        $http.post(url, eventTypes) .then(function(response) {
           $scope.myData = [];
            $scope.myData=response.data.aggregations.dates_between.School_Count.buckets[0].event_type.buckets;
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            console.log("schoolCode", schoolCode);
        }, function(error) {
            // alert(JSON.stringify(error));                
        }
        ) // }
    };
    $scope.goEventType=function(eventType, eventId) {
        console.log("myData",$scope.myData);
        $scope.eventType=eventType;
        $scope.eventId=eventId;
  var dt = new Date($scope.endDate);
         dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
       fromDt.setHours(fromDt.getHours()+6)



        var allEvents= {
                   "size":0,
                   "query":{
                      "bool":{
                         "must":[
                            {
                               "match":{
                                  "schoolCode":$scope.schoolCode
                               }
                            },
                            {
                               "match":{
                                  "eventType":eventType
                               }
                            }
                         ]
                      }
                   },
                   "aggs":{
                      "dates_between":{
                         "filter":{
                            "range":{
                               "eventTime":{
                                  "gte": fromDt.toISOString(), "lte": dt.toISOString()
                               }
                            }
                         },
                       
                               "aggs":{
                                  "event_type":{
                                     "terms":{
                                        "field":"eventType"
                                     },
                                     "aggs":{
                                        "eventId":{
                                           "terms":{
                                              "field":"eventId"
                                           },
                                           "aggs":{
                                              "messageCode":{
                                                 "terms":{
                                                    "field":"messageCode"
                                                 }
                                              },
                                              "eventTime":{
                                                 "terms":{
                                                    "field":"eventTime"
                                                 }
                                              }
                                           }
                                        }
                                     }
                                  }
                               }
                            }
                         }
                      }
        $http.post(url, allEvents) .then(function(response) {

            console.log("response",response.data.aggregations.dates_between.event_type.buckets[0].eventId.buckets);
            $scope.eventIds=response.data.aggregations.dates_between.event_type.buckets[0].eventId.buckets;
 $scope.propertyName = 'eventId';
  $scope.reverse = true;
  $scope.data = myData;


  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

            
            for ( $scope.k=0; $scope.k < $scope.eventIds.length; $scope.k++) {
                $scope.data.push({});
                $scope.data[$scope.k].eventId=$scope.eventIds[$scope.k].key;
                $scope.data[$scope.k].messageCode=$scope.eventIds[$scope.k].messageCode.buckets[0].key;
                $scope.data[$scope.k].eventTime=$scope.eventIds[$scope.k].eventTime.buckets[0].key_as_string;
            }

            for ( $scope.j=0; $scope.j < $scope.eventIds.length; $scope.j++) {
                getTargetUsers($scope.eventIds[$scope.j].key,angular.copy($scope.j));
                // $scope.data[$scope.j].targetedUser=targetedUser;
            }
            for ( $scope.l=0; $scope.l < $scope.eventIds.length; $scope.l++) {
                getTargetedSent($scope.eventIds[$scope.l].key,angular.copy($scope.l));
                // $scope.data[$scope.j].targetedUser=targetedUser;
            }

            for ( $scope.m=0; $scope.m < $scope.eventIds.length; $scope.m++) {
                getTargetUsersEmailSmsPush($scope.eventIds[$scope.m].key,angular.copy($scope.m));
                
            }

            for ( $scope.n=0; $scope.n < $scope.eventIds.length; $scope.n++) {
                getSentUsersEmailSmsPush($scope.eventIds[$scope.n].key,angular.copy($scope.n));
            }

            
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=true;
            // targetSent();
        }, function(error) {
            // alert(JSON.stringify(error));                
        }
        )
    };
    function getTargetUsers (eventId,j) {
  var dt = new Date($scope.endDate);
         dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
       fromDt.setHours(fromDt.getHours()+6)

        var code4= {
            "size": 0, "query": {
                "bool": {
                    "must": [ {
                        "match": {
                            "schoolCode": $scope.schoolCode
                        }
                    }, {
                        "match": {
                            "eventType": $scope.eventType
                        }
                    }, {
                        "match": {
                            "eventId": eventId
                        }
                    }
                    ]
                }
            },
             "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                                "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    }, "aggs": {
                        "eventId": {
                            "cardinality": {
                                "field": "bProfileCode"
                            }
                        }
                    }
                }
            }
        }
        $http.post(url, code4) .then(function(response) {
            $scope.data[j].targetedUser=response.data.aggregations.dates_between.eventId.value;

        }, function(error) {
            
        }
        )
    };

    function getTargetedSent(eventId,l) {
        $scope.eventId=eventId;
                var dt = new Date($scope.endDate);
        dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
        fromDt.setHours(fromDt.getHours()+6)
        var totalTargetSents= {
            "size": 0, "query": {
                "bool": {
                    "must": [ {
                        "match": {
                            "schoolCode": $scope.schoolCode
                        }
                    }, {
                        "match": {
                            "eventId": eventId
                        }
                    }, {
                        "exists": {
                            "field": "sentResponse"
                        }
                    }, {
                        "exists": {
                            "field": "destination"
                        }
                    }
                    ]
                }
            },
             "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                                "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    }, "aggs": {
                        "eventId": {
                            "cardinality": {
                                "field": "bProfileCode"
                            }
                        }
                    }
                }
            }
        }
        $http.post(url, totalTargetSents) .then(function(response) {
            
            $scope.data[l].targetedSent=response.data.aggregations.dates_between.eventId.value;
            // $scope.targetSents.push(response.data.aggregations.dates_between.eventId.value);
        }, function(error) {
            alert(JSON.stringify(error));
        }
        )
    }


    function getTargetUsersEmailSmsPush(eventId,m) {
        $scope.eventId=eventId;
                var dt = new Date($scope.endDate);
        dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
        fromDt.setHours(fromDt.getHours()+6)
        var totalTargetEmail= {
            "size": 0, "query": {
                "bool": {
                    "must": [ {
                        "match": {
                            "schoolCode": $scope.schoolCode
                        }
                    }, {
                        "match": {
                            "eventType": $scope.eventType
                        }
                    }, {
                        "match": {
                            "eventId": eventId
                        }
                    }
                    ]
                }
            }, "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                               "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    }, "aggs": {
                        "mediumType": {
                            "terms": {
                                "field": "mediumType"
                            }
                        }
                    }
                }
            }
        }
        $http.post(url, totalTargetEmail) .then(function(response) {
          
            console.log("getTargetUsersEmailSmsPush",response.data.aggregations.dates_between.mediumType.buckets)
            $scope.data[m].targetUserEmail=response.data.aggregations.dates_between.mediumType.buckets[0].doc_count || "0";
            $scope.data[m].targetUserSms=response.data.aggregations.dates_between.mediumType.buckets[1].doc_count || "0";
            $scope.data[m].targetUserPush=response.data.aggregations.dates_between.mediumType.buckets[2].doc_count || "0";
            
        }, function(error) {
            alert(JSON.stringify(error));
        }
        )
    }
    ;
    function getSentUsersEmailSmsPush (eventId,n) {
        $scope.eventId=eventId;
                var dt = new Date($scope.endDate);
        dt.setDate(dt.getDate()+1);
        dt.setHours(dt.getHours()+6);


        var fromDt = new Date($scope.fromDate);
        fromDt.setHours(fromDt.getHours()+6)
        var totalSent= {
            "size": 0, "query": {
                "bool": {
                    "must": [ {
                        "match": {
                            "schoolCode": $scope.schoolCode
                        }
                    }, {
                        "match": {
                            "eventType": $scope.eventType
                        }
                    }, {
                        "match": {
                            "eventId": eventId
                        }
                    }, {
                        "exists": {
                            "field": "sentResponse"
                        }
                    }
                    ]
                }
            }, 
            "aggs": {
                "dates_between": {
                    "filter": {
                        "range": {
                            "eventTime": {
                               "gte": fromDt.toISOString(), "lte": dt.toISOString()
                            }
                        }
                    }, "aggs": {
                        "mediumType": {
                            "terms": {
                                "field": "mediumType"
                            }
                        }
                    }
                }
            }
        }
        $http.post(url, totalSent) .then(function(response) {
            console.log("getTargetSentEmailSmsPush",response.data.aggregations.dates_between.mediumType.buckets);
            $scope.data[n].sentUserEmail=response.data.aggregations.dates_between.mediumType.buckets[0].doc_count || "0";
            $scope.data[n].sentUserSms=response.data.aggregations.dates_between.mediumType.buckets[1].doc_count || "0";
            $scope.data[n].sentUserPush=response.data.aggregations.dates_between.mediumType.buckets[2].doc_count || "0";
        }, function(error) {
            // alert(JSON.stringify(error));                
        }
        )
    };
    
    $scope.reload=function(){
        // window.location.reload();
        //window.location.href="http://inteventapi.fliplearn.com:8081/static";
window.location.href="localhost:8080/static/dashboard"
    }

 $scope.goBack=function(){

if($scope.show2===true ){
    $scope.getdate();
$scope.show1= false;
$scope.show2=false;
$scope.show3 = false;
//alert("window1");
}        
else if($scope.show3===true){
 $scope.show2=true;
$scope.show1= false;
$scope.show3 = false;
//alert("window2");
}        


    }



});