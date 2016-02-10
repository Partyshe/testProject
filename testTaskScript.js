var testModule = angular.module("testModule", ['ngAnimate', 'ui.bootstrap']);
testModule.controller("testCtrl", function ($scope) {
    var hasActualTask = function (expcetedTaskName) {
            var hasTask = false;

            for(task in $scope.tasks){
                hasTask = $scope.tasks[task].name === expcetedTaskName;
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

    $scope.newTask = {
        'date': currentDate
    };
    $scope.tasks = [];

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
    };

    $scope.clearAll = function () {
        $scope.newTask = {};

        //Clear user's text
        angular.element(document.querySelector('#taskDateInput')).val('');

        setDueDateValid(true);
    };

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
});