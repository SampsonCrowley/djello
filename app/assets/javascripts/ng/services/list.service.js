djello.factory('listService', [
  '$q', '_', 'Restangular', 'cardService',
  function($q, _, restangular, cardService){


    restangular.extendModel('lists', function(model) {

      // that will create an associated List
      model.addCard = function(params) {
        return model.cards.post().then(function(response){
          model.cards.push(response)
          return response;
        })
      };

      model.destroyCard = function(card) {
        return card.remove()
          .catch(function(err){
            console.log(err);
          })
          .finally(function(){
            var id = _.findIndex(model.cards, ['id', card.id])
            if(id !== -1) return model.cards.splice(id, 1);
          })
      }

      cardService.all(model);

      return model;
    });

    var boardLists = function boardLists(board){
      if(board.lists){
        restangular.restangularizeCollection(board, board.lists, 'lists');
      } else {
        board.lists = board.getList("lists").$object;
      }
    }

    return {
      all: boardLists
    }
  }
])
