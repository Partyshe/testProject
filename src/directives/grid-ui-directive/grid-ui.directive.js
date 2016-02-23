/**
 * Created by ppok on 2/18/2016.
 */

(function () {
    "use strict";

    angular.module("appTest")
        .directive("gridUi", gridUIDirective);

        function gridUIDirective ($sce) {
            return {
                restrict: "E",
                scope: {
                    'collection': '='
                },
                controller: [
                    '$scope',
                    '$filter',
                    gridUiController],
                templateUrl:  $sce.trustAsResourceUrl('src/directives/grid-ui-directive/gridUITemplate.html')
                //http://localhost:8080/gridUITemplate.html
            };
        };

        function gridUiController ($scope, $filter) {
            // Pagination
            var calcMaxAmountOfPage = function(collection){
                $scope.maxAmountOfPage = collection ? collection.length * 2 : 1;
            },
                doCollectionPagination = function (collection) {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                        end = begin + $scope.numPerPage;

                    $scope.pageItems = collection.slice(begin, end);
                    calcMaxAmountOfPage(collection);
                },
                isFilterEmpty = function(){
                    var isEmpty = true;
                    for (var property in $scope.query) {
                        if ($scope.query.hasOwnProperty(property) &&
                            $scope.query[property].length > 0) {

                            isEmpty = false;
                            break;
                        }
                    }

                    return isEmpty;
                };

            $scope.pageItems = [];
            $scope.query = {
                name: '',
                hours:'',
                date:''
            };
            $scope.filteredCollection = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 5;
            $scope.maxSize = 5;
            calcMaxAmountOfPage();

            $scope.$watch('currentPage + numPerPage', function (newValue, oldValue) {
                if(!!$scope.filteredCollection.length){
                    doCollectionPagination($scope.filteredCollection);
                }
            });

            $scope.$watch('collection', function (newValue, oldValue) {
                if((newValue != oldValue) || !$scope.filteredCollection.length){
                    if(!isFilterEmpty()){
                        $scope.filteredCollection = $scope.$eval('collection | filter:query');
                    } else{
                        $scope.filteredCollection = $scope.collection;
                    }

                    doCollectionPagination($scope.filteredCollection);
                }
            }, true);

            //Table Sort

            $scope.isSearch = false;
            $scope.searchItem = '';
            $scope.predicate = '';
            $scope.reverse = true;
            $scope.customOrder = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
                var orderBy = $filter('orderBy');

                // Sort dates
                if (predicate === 'date') {
                    $scope.pageItems = $scope.pageItems.sort(function (cur, next) {
                        var result;
                        if (!$scope.reverse) {
                            result = Date.compare(Date.parse(cur.date), Date.parse(next.date));
                        } else {
                            result = Date.compare(Date.parse(next.date), Date.parse(cur.date));
                        }

                        return result;
                    });
                }
                // Sort strings and numbers
                else {
                    $scope.pageItems = orderBy($scope.pageItems, predicate, $scope.reverse);
                }
            };
            $scope.searchPreparation = function(item){
                if($scope.searchItem === item){
                    $scope.searchItem = '';
                }else{
                    $scope.searchItem = item;
                }
            };

            $scope.setFilteredCollection = function (filteredCollection) {
                $scope.filteredCollection = filteredCollection;
                doCollectionPagination(filteredCollection);
            };
        };

})();