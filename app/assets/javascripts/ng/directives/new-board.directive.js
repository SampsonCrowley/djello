djello.directive('newBoard', [
  function(){
    return {
      scope:{
        createBoard: '&'
      },
      restrict: 'E',
      templateUrl: "djello/directives/new-board.html"
    }
  }
])
