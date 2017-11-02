(function () {
  'use strict';

  angular
    .module('users')
    .controller('AdminAuthenticationController', AdminAuthenticationController);

  AdminAuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function AdminAuthenticationController($scope, $state, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.signup = signup;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({ message: $location.search().err });
    }

    // If not admin redirect back
    if (vm.authentication.user == null) {
      $state.go('authentication.signin');
    } else if (vm.authentication.user.type !== 'admin') {
      $state.go('home');
    }

    function signup(isValid) {

      console.log('in signup');

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    // Authentication Callbacks
    function onUserSignupSuccess(response) {
      // If successful we do nothing
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
      // should not redirect either
    }

    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }
  }
}());
