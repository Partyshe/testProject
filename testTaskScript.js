var testModule = angular.module("testModule", ['ngAnimate', 'ui.bootstrap']);
testModule.controller("testCtrl", ['$scope', '$filter', function ($scope, $filter) {
    var hasActualTask = function (expcetedTaskName) {
            var hasTask = false;

            for(task in $scope.tasks){
                if($scope.tasks[task].name === expcetedTaskName){
                    hasTask = true;
                    break;
                }
            }

            return hasTask;
        },
        currentDate = Date.today(),
        changeDateMsg = 'Please enter date more or equal current date.'

    var setDueDateValid = function (isValid){
        $scope.isDueDateValid = isValid;
    };

    var setDatePickerErrorMsg = function (message){
        $scope.datePickerErrorMsg = message;
    };

    var setDefaultTask = function () {
        $scope.newTask = {
            'date': currentDate
        };
    };
    setDefaultTask();

    $scope.tasks = [];

    $scope.testTasks = [
        {
            name: 'Abcd', hours: 1, date: Date.today().add(1).days().add(1).years().toString("MM/dd/yyyy")
        },
        {
            name: 'Hij', hours: 3, date: Date.today().add(3).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Efg', hours: 5, date: Date.today().add(2).days().toString("MM/dd/yyyy")
        },

        {
            name: 'Abdc', hours: 4, date: Date.today().add(5).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Hab', hours: 2, date: Date.today().add(4).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 6', hours: 1, date: Date.today().add(6).days().toString("MM/dd/yyyy")
        },

        {
            name: 'Test 7', hours: 1, date: Date.today().add(7).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 8', hours: 1, date: Date.today().add(8).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 9', hours: 1, date: Date.today().add(9).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 10', hours: 1, date: Date.today().add(10).days().toString("MM/dd/yyyy")
        },

        {
            name: 'Test 11', hours: 1, date: Date.today().add(11).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 12', hours: 1, date: Date.today().add(12).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 13', hours: 1, date: Date.today().add(13).days().toString("MM/dd/yyyy")
        },
        {
            name: 'Test 14', hours: 1, date: Date.today().add(14).days().toString("MM/dd/yyyy")
        }
    ];

    $scope.isTaskNameDuplicate = function(taskNameInput){
        if(taskNameInput.$pristine || !taskNameInput.$modelValue){
            return false;
        }

        return hasActualTask(taskNameInput.$modelValue);
    };

    $scope.addTask = function (newTask) {
        $scope.tasks.push({
            name: newTask.name, hours: newTask.hours, date: newTask.date.toString("MM/dd/yyyy")
        });

        setDefaultTask();
    };

    $scope.clearAll = function () {
        $scope.newTask = {};

        //Clear user's text
        angular.element(document.querySelector('#taskDateInput')).val('');

        setDueDateValid(true);
    };

    //DatePicker

    $scope.clear = function () {
        $scope.date = null;
    };

    setDueDateValid(true);

    $scope.open = function () {
        $scope.popup.opened = true;
        setDueDateValid(true);
    };

    $scope.setDate = function (year, month, day) {
        $scope.newTask.date = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.popup = {
        opened: false
    };

    $scope.validateDtPicker = function(){
        if(!!$scope.newTask.date && $scope.newTask.date.compareTo(currentDate) >= 0){
            setDueDateValid(true);
            return;
        }

        setDatePickerErrorMsg(changeDateMsg);
        $scope.newTask.date = currentDate;
        setDueDateValid(false);
    };

    // Pagination

    $scope.filteredTasks = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxAmountOfPage = $scope.testTasks.length * 2;

    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredTasks = $scope.testTasks.slice(begin, end);
    });

    //Table Sort

    $scope.predicate = '';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        var orderBy = $filter('orderBy');

        // Sort dates
        if(predicate === 'date'){
            $scope.filteredTasks = $scope.filteredTasks.sort(function(cur, next){
                var result;
                if(!$scope.reverse){
                    result = Date.compare(Date.parse(cur.date), Date.parse(next.date));
                } else{
                    result = Date.compare(Date.parse(next.date), Date.parse(cur.date));
                }

                return result;
            });
        }
        // Sort strings and numbers
        else {
            $scope.filteredTasks = orderBy($scope.filteredTasks, predicate, $scope.reverse);
        }
    };

}]);