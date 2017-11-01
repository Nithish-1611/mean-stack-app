(function () {
  'use strict';

  angular
    .module('users')
    .controller('CatalogController', CatalogController);

  CatalogController.$inject = ['$scope', '$state', 'UsersService', 'CatalogService', '$http', 'Notification', '$window', 'Authentication'];

  function CatalogController($scope, $state, UsersService, CatalogService, $http, Notification, $window, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    $scope.detailedInfo = null;
    $scope.usersList = [];
    $scope.filteredUsersList = [];
    $scope.searchValue = null;

    fetchStudents();

    function fetchStudents() {
      // $http.get('/api/catalog/students').then(function (response) {
      //   onSponsorGetStudentsSuccess(response);
      // }, function (error) {
      //   onSponsorGetStudentsFailure(error);
      // });
      CatalogService.sponsorGetStudents().then(onSponsorGetStudentsSuccess).catch(onSponsorGetStudentsFailure);
    }

    $scope.showDetails = function (index) {
      $scope.detailedInfo = $scope.usersList[index];
    };

    function onSponsorGetStudentsSuccess(response) {
      $scope.usersList = response;
      $scope.filteredUsersList = Array.from($scope.usersList);
    }

    function onSponsorGetStudentsFailure(response) {
      $scope.usersList = null;
      $scope.filteredUsersList = null;
    }

    // filter the current list
    $scope.filterData = function () {
      var originalList = Array.from($scope.usersList);
      var filteredList = [];
      if ($scope.searchValue == null || $scope.searchValue === '') {
        $scope.filteredUsersList = originalList;
      } else {
        for (var i = 0; i < originalList.length; i++) {
          if (originalList[i].firstName !== null || originalList[i].lastName !== null) {
            var firstName = (originalList[i].firstName !== null) ? originalList[i].firstName : '';
            var lastName = (originalList[i].lastName !== null) ? originalList[i].lastName : '';
            var userName = firstName + ' ' + lastName;
            if (userName.toLowerCase().includes($scope.searchValue.toLowerCase())) {
              filteredList.push(originalList[i]);
            }
          }
        }
        $scope.filteredUsersList = filteredList;
      }
    };
  }
}());
