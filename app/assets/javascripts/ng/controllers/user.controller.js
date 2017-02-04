djello.controller('UserCtrl', ['$scope', '$state', 'Auth', '$timeout',
  function($scope, $state, Auth, $timeout) {
    var test = function(){
      Auth.currentUser().then((user) => {

        $state.go('boards.index')

      }).catch(err => console.log(err))
    }
    test()

    $scope.$on('devise:login', function(){
      $state.go('boards.index')
    })

    $scope.$on('devise:new-session', function(){
      $state.go('boards.index')
    })


    $scope.login = function(loginForm, loginData) {
      Auth.login(loginData)
        .then(r => $state.go('boards.index'))
        .catch(e => { alert("Invalid Credentials") })
    }

    $scope.signOut = function signOut(data, form){
      if(data.password !== data.passwordConfirmation){
        form.$setValidity('pwdmatch', false)
      } else {
        form.$setValidity('pwdmatch', true)
      }
      if(form.$valid){
        Auth.register({
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation
        }).then(function(user){

        })
        .catch(function(err){
          alert("Registration Failed: " + err)
        })
      }
    }
  }]);
