djello.controller('BoardsShowCtrl',[
  '$scope', '$state', '$stateParams', 'boardService',
  function($scope, $state, $stateParams, boardService){
    $scope.activeCard = {
      value: "ooga booga"
    }
    $scope.moving = null;

    boardService.show($stateParams.id).then(function(board){
      $scope.board = board
    }).catch(function(err){
      console.log(err)
      $state.go('boards.index')
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

    $scope.setActive = function setActive(card){
      $scope.activeCard.value = card.id
    }

    $scope.goToBoard = function goToBoard(id) {
      $state.go('boards.show', { id: id })
    }

    $scope.addCard = function addList(list) {
      list.addCard().then($scope.setActive)
    }

  }
])
