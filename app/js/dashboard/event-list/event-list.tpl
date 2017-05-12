<section class="container">
    <h4>School Code: {{eventListCtrl.stateParams.schoolCode}}</h4>
	<div class="row" ng-hide="show3">
            <div class="col-sm-5">
                <div class="form-group">
                    <h4>From</h4>
                    <div class="input-group date">
                        <input datetime-picker ng-model="eventListCtrl.fromDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" >
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
                        <input datetime-picker ng-model="eventListCtrl.toDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" />
                        <span class="input-group-addon">
                     <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2 btn-top">
                <a href="#" ng-click="getSchoolList()" ng-if="eventListCtrl.fromDate && eventListCtrl.toDate " class="btn btn-success btn-block">Submit</a>
            </div>
        </div>

 <div class="table-responsive" ng-if="eventListCtrl.eventList">  
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Event Type</th>
        <th>No of Events</th> 
        <th>Targeted Users</th> 

      </tr>
    </thead>
    <tbody>
        <tr ng-repeat="event in eventListCtrl.eventList">
            <td>{{event.eventType}}</td>
            <td>{{event.noOfEvents}}</td>
            <td>{{event.targetedUsers}}</td>

        </tr> 
    </tbody>
  </table>
  </div>
  <div class="error-msg" ng-if=" eventListCtrl.eventList && schoolListCtrl.schoolList.length==0">
      No Data Found for the given period.
  </div>
</section>