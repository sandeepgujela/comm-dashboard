


    <style>
        #datetimepicker2 {
            left: 0 !important;
        }
        
        .btn-top {
            margin-top: 39px;
        }
        .error-msg h2 {
                    text-align: center;
                    padding: 28px 0 44px;
         }
    </style>
    <div class="container">
        <!-- <h4 ng-if="show1">All schools</h4> -->
        <h4 ng-if="show2">School code :{{schoolCode}}</h4>
        <h4 ng-if="show3">School code : {{schoolCode}} / Event Type :{{eventType}}</h4>
         <a style="width:200px;"  ng-if="show2" href="#" ng-click="goBack()" class="btn btn-success btn-block">Back</a>
  <a style="width:200px;"  ng-if="show3" href="#" ng-click="goBack()" class="btn btn-success btn-block">Back</a>
        <div ng-if="show3">
            <div>
                <span>From:</span>
                <span>{{fromDate | date}}</span>
            </div>

            <div>
                <span>To:</span>
                <span>{{endDate | date}}</span>
            </div>
            <br/>
            <a style="width:200px;"  href="#" ng-click="reload()" class="btn btn-success btn-block">Search Again</a>




            <br/>

        </div>

        
<!-- 
        <div class="row" ng-hide="show3">
            <div class="col-sm-5">
                <div class="form-group">
                    <h4>From</h4>
                    <div class="input-group date">
                        <input  datetime-picker ng-model="fromDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" >
                        <span class="input-group-addon">
                     <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="form-group">
                    <h4>To</h4>
                    <div class="input-group date">
                        <input datetime-picker ng-model="endDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" />
                        <span class="input-group-addon">
                     <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2 btn-top">
                <a href="#" ng-click="getdate()" ng-if="fromDate && endDate " class="btn btn-success btn-block">Submit</a>
                
            </div>
        </div> -->
        
  <!--       <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th ng-if="show3">  <button ng-click="sortBy('eventId')">Event Id</button>
           <span class="sortorder" ng-show="propertyName === 'eventId'" ng-class="{reverse: reverse}"></span> 
                        </th>
                        <th ng-if="show3">Message Code</th>
                         <th ng-if="show3">Date</th>
                        <th ng-if="show2">Event Type</button>  
                        </th>

                        <th ng-if="show2">No. of Events</th>
                        <th ng-if="show1"> <button ng-click="sortBy('key')">School Code</button>
                            <span class="sortorder" ng-show="propertyName === 'key'" ng-class="{reverse: reverse}"></span>
                        </th>
                        <th>Targeted Users</th>
                        <th>Targeted Sent</th>
                        <th>Targeted Users(Email)</th>
                        <th>Sent Users(Email)</th>
                        <th>Targeted Users(Sms)</th>
                        <th>Sent Users(Sms)</th>
                        <th>Targeted Users(Push)</th>
                        <th>Sent Users(Push)</th>
                    </tr>
                </thead>
                <tbody>

<tr ng-show="noSites"><td colspan="9" class="error-msg"><h2>No Data is avaliable within selected date</h2></td></tr>


                    <tr ng-repeat="data in myData | orderBy:propertyName:reverse" ng-if="show1">
                        <td class="info">
                            <a href="#" ng-if="data.key !== 'na'" ng-click="goStudentCode(data.key)">{{data.key}}</a><a href="#" ng-if="data.key === 'na'" ng-click="goStudentCode(data.key)">Unique Code</a>
                        </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                    <tr ng-repeat="data in myData" ng-if="show2">
                        <td><a href="#" ng-click="goEventType(data.key)">{{data.key}}</a></td>
                        <td>no of events</td>
                        <td>{{data.doc_count}} </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>

                    <tr ng-repeat="obj in data | orderBy:propertyName:reverse"" ng-if="show3">
                        <td>{{obj.eventId }}</td>
                        <td>{{obj.messageCode}}</td>
                         <td>{{obj.eventTime}}</td>
                        <td>{{obj.targetedUser}}</td>
                        <td>{{obj.targetedSent}}</td>
                        <td>{{obj.targetUserEmail}}</td>
                        <td>{{obj.sentUserEmail}}</td>
                        <td>{{obj.targetUserSms}}</td>
                        <td>{{obj.sentUserSms}}</td>
                        <td>{{obj.targetUserPush}}</td>
                        <td>{{obj.sentUserPush}}</td>

                    </tr>

            </table>

        </div>
    </div>
     -->
    
<ui-view>
  
</ui-view>