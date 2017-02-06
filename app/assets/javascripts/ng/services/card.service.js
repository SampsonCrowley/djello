djello.factory('cardService',[
  'Restangular',
  function(restangular){

    var listCards = function listCards(list){
      if(list.cards){
        restangular.restangularizeCollection(list, list.cards, 'cards');
      } else {
        list.cards = list.getList("cards").$object;
      }
    }

    return {
      all: listCards
    }
  }
])
