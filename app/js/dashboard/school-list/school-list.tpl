<section class="container">
	<div class="row" ng-hide="show3">
            <div class="col-sm-5">
                <div class="form-group">
                    <h4>From</h4>
                    <div class="input-group date">
                        <input datetime-picker ng-model="schoolListCtrl.fromDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" >
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
                        <input datetime-picker ng-model="schoolListCtrl.toDate" class="form-control" date-format="yyyy-MM-dd HH:mm:ss" />
                        <span class="input-group-addon">
                     <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-sm-2 btn-top">
                <a href="#" ng-click="getSchoolList()" ng-if="schoolListCtrl.fromDate && schoolListCtrl.toDate " class="btn btn-success btn-block">Submit</a>
            </div>
        </div>

 <div class="table-responsive" ng-if="schoolListCtrl.schoolList">  
            <div class="col-sm-3 padding0" >
                <input type="text" class="form-control" placeholder="filter by School Name" ng-model="schoolNamefilter" />
            </div>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>School Code</th>
        <th>School Name</th> 
      </tr>
    </thead>
    <tbody>
        <tr ng-repeat="school in schoolListCtrl.schoolList | filter:{'schoolName':schoolNamefilter}">
            <td><a ng-click="getEventList(school.schoolCode)">{{school.schoolCode}}</a></td>
            <td>{{school.schoolName}}</td>
        </tr> 
    </tbody>
  </table>
  </div>
  <div class="error-msg" ng-if=" schoolListCtrl.schoolList && schoolListCtrl.schoolList.length==0">
      No Data Found for the given period.
  </div>
</section>