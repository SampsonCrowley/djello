djello.controller('NavCtrl', ['$scope', '$state', 'Auth',
  function($scope, $state, Auth) {
    $scope.signedInUser = function() {
      return !!Auth._currentUser;
    }

    $scope.signOut = function() {
      Auth.logout()
    }

    $scope.goToIndex = function goToIndex(){
      $state.go('boards.index')
    }
  }]);
