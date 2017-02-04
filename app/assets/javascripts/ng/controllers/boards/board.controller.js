djello.controller('BoardCtrl',[
  '$scope', '$state', 'userService',
  function($scope, $state, userService){
    userService.loggedIn().then(function(res){
      if(!res){
        $state.go('user')
      }
    })
    .catch(function(){
      $state.go('user')
    })

    $scope.$on('devise:logout', function(){
      $state.go('user')
    })
  }
])
