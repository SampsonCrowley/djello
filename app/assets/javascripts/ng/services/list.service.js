djello.factory('listService', [
  '$q', '_', 'Restangular', 'cardService',
  function($q, _, restangular, cardService){


    restangular.extendModel('lists', function(_list) {

      // that will create an associated List
      _list.addCard = function(params) {
        return _list.cards.post().then(function(response){
          _list.cards.push(response)
          return response;
        })
      };

      _list.destroyCard = function(card) {
        return card.remove()
          .catch(function(err){
            console.log(err);
          })
          .finally(function(){
            var id = _.findIndex(_list.cards, ['id', card.id])
            if(id !== -1) return _list.cards.splice(id, 1);
          })
      }

      _list.rearrange = function(index, card, external, type){
        var old_i = _.findIndex(this.cards, ['id', card.id])
        this.cards.splice((old_i < index ? index - 1 : index), 0, this.cards.splice(old_i, 1)[0])

        for(var i = 0; i < this.cards.length; i++){
          this.cards[i].order = i;
          this.cards[i].put()
        }
        console.log(this.cards)
        return true
      }

      cardService.all(_list);

      return _list;
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
