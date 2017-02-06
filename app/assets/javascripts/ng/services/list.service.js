djello.factory('listService', [
  'Restangular', 'cardService',
  function(restangular, cardService){

    //extend the list collection to create new lists
    restangular.extendCollection('lists', function(collection) {
      collection.create = function _createList(params){
        collection.post(params);
      }
      return collection;
    });

    restangular.extendModel('lists', function(model) {

      // that will create an associated List
      model.addCard = function(params) {
        return model.cards.post().then(function(response){
          model.cards.push(response)
          return response;
        })
      };

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
