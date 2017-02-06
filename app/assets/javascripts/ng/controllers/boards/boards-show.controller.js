djello.controller('BoardsShowCtrl',[
  '$scope', '$state', '$stateParams', 'boardService',
  function($scope, $state, $stateParams, boardService){
    $scope.activeCard = {
      value: "ooga booga"
    }

    boardService.show($stateParams.id).then(function(board){
      $scope.board = board
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

    $scope.deleteBoard = function deleteBoard(id) {
      boardService.destroy(id);
    }

    $scope.goToBoard = function goToBoard(id) {
      $state.go('boards.show', { id: id })
    }

    $scope.updateCard = function updateCard(data) {
      boardService.updateCard(data);
    }

    $scope.addList = function addList(data) {
      $scope.board.addList(data);
    }

    $scope.updateList = function updateList(data) {
      boardService.updateList(data);
    }
  }
])
