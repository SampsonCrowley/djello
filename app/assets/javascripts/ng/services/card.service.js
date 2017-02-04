djello.factory('cardService',[
  'Restangular',
  function(restangular){

    // PRIVATE
    var _rest = restangular.all('cards'),
        _lists = {};

    var update = function update(card){
      console.log(card.title, card.description)
      return restangular.one('cards', card.id).doPUT({card: card})
    }

    return {
      update: update
    }
  }
])
