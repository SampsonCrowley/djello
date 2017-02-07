djello.factory('listService', [
  '$q', '_', 'Restangular', 'cardService',
  function($q, _, restangular, cardService){

    var _rearrange = function _rearrange(index, card, external, type) {
      var old_i   = _.findIndex(this.cards, ['id', card.id]),
          new_i   = (old_i < index ? index - 1 : index),
          max     = (old_i < index ? index : old_i),
          reorder = [];

      this.cards.splice(new_i, 0, this.cards.splice(old_i, 1)[0])

      for(var i = Math.min(old_i, new_i); i <= max; i++){
        reorder.push({id: this.cards[i].id, order: i})
        this.cards[i].order = i;
        // this.cards[i].put()
      }
      this.doPUT({reorder: reorder})
      console.log(reorder)
      return true
    }


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

      _list.rearrange = _rearrange;

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
