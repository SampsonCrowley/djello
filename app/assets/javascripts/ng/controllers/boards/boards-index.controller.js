djello.controller('BoardsIndexCtrl',[
  '$scope', '$state', 'boardService',
  function($scope, $state, boardService){

    boardService.index().then(function(boards){
      $scope.boards = boards
    }).catch(function(err){
      console.log(err)
    });

    $scope.createBoard = function createBoard(valid, data, form){
      if(valid){
        boardService.create(data).then(function(res){
          angular.copy({}, data);
          form.$setPristine();
          form.$setUntouched();
        })
      }
    }

    $scope.deleteBoard = function deleteBoard(id, $event) {
      $event.stopPropagation();
      boardService.destroy(id);
    }

    $scope.goToBoard = function goToBoard(id) {
      $state.go('boards.show', { id: id })
    }
  }
])
