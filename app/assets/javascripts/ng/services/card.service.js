djello.factory('cardService',[
  'Restangular',
  function(restangular){

    var listCards = function listCards(parent){

      if(parent.cards){
        restangular.restangularizeCollection(parent, parent.cards, 'cards');
      } else {
        if(parent.id){
          parent.cards = parent.getList("cards").$object;
        }
      }
    }

    return {
      all: listCards
    }
  }
])
