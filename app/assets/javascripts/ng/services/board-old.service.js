djello.factory('boardService',[
  'Restangular', 'listService', 'cardService',
  function(restangular, listService, cardService){

    // PRIVATE
    var _rest = restangular.all('boards'),
        _boards = {},
        _current = {};

    var _denormalize = function _denormalize(board){
      var id = board.id
      _boards[id] = {
        id: id,
        title: board["title"],
        created: new Date(board['created_at']),
        members: board["members"]
      }
      return _boards[id]
    }

    var _denormalizeCollection = function _denormalizeCollection(collection){
      for(var i = 0; i < collection.length; i++){
        _denormalize(collection[i]);
      }
      return _boards
    }


    // PUBLIC
    var index = function index(){
      return _rest.getList().then(function(boards){
        angular.copy({}, _boards);

        return _denormalizeCollection(boards);
      }).catch(function(err){
        console.log(err)
      })
    }

    var show = function show(id){
      return restangular.one('boards', id).get().then(function(board){
        return restangular.copy(board, _current)
      }).catch(function(err){
        console.log(err)
      })
    }

    var create = function create(data){
      return _rest.post({board: {title: data.title}}).then(function(board){
        return _denormalize(board)
      })
    }

    var destroy = function destroy(id){
      return restangular.one('boards', id).remove().then(function(resp){
        return delete _boards[id];
      })
      .catch(function(err){
        alert(err)
      })
    }

    createList = function createList(){
      return _current.all('lists').post()
    }

    var updateList = function updateList(list){
      return listService.update(list)
    }

    var updateCard = function updateCard(card){
      return cardService.update(card)
    }

    return {
      index: index,
      show: show,
      create: create,
      destroy: destroy,
      createList: createList,
      updateList: updateList,
      updateCard: updateCard
    }
  }
])
