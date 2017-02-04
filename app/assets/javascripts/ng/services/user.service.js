djello.factory('userService', [
  '$q', 'Auth',
  function($q, auth){
    var loggedIn = function loggedIn(){
      if(auth._currentUser){
        return $q.resolve(true)
      }
      return auth.currentUser().then(function(user){
        if(user){
          return true
        }
        return false
      })
      .catch(function(err){
        return false
      })
    }

    return {
      loggedIn: loggedIn
    }
  }
])
