djello.factory('listService',[
  'Restangular',
  function(restangular){

    // PRIVATE
    var _rest = restangular.all('lists'),
        _lists = {};

        var update = function update(list){
          return restangular.one('lists', list.id).doPUT({list: list})
        }

    return {
      update: update
    }
  }
])
