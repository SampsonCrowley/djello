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

    $scope.deleteBoard = function deleteBoard(board, $event) {
      $event.stopPropagation();
      boardService.destroy(board);
    }

    $scope.goToBoard = function goToBoard(id) {
      $state.go('boards.show', { id: id })
    }
  }
])
