djello.factory('boardService',[
  '$q', '_', 'Restangular', 'listService',
  function($q, _, restangular, listService){
        //store resource for DRYer calls;
    var _rest = restangular.all('boards'),
        //private wrapper for all boards
        _boards = {};

    // Private method for creating a Board
    var _createBoard = function _createBoard(params) {
      return _rest.post({
        board: params
      })
      .then(function(response) {
        _denormalize(response);
        return response;
      });
    };

    restangular.extendModel('boards', function(model) {

      // that will create an associated List
      model.addList = function(params) {
        return model.lists.post().then(function(response){
          model.lists.push(response)
          return response;
        })
      };

      model.destroyList = function(list) {
        // return 
        list.remove()
          .catch(function(err){
            console.log(err);
          })
          .finally(function(){
            var id = _.findIndex(model.lists, ['id', list.id])
            if(id !== -1) return model.lists.splice(id, 1);
          })
      }

      model.destroy = function(){
        destroy(model)
      }

      listService.all(model);

      return model;
    });

    var _denormalize = function _denormalize(board){
      var id = board.id
      _boards[id] = board;
      return _boards[id]
    }

    var _denormalizeCollection = function _denormalizeCollection(collection){
      for(var i = 0; i < collection.length; i++){
        _denormalize(collection[i]);
      }
      return _boards
    }

    //extend the board collection to create new boards
    _extend = function _extend() {
      _boards.create = _createBoard;
    }

    var index = function index (){
      if(_.isEmpty(_boards)){
        return _rest.getList().then(function(boards){
          angular.copy({}, _boards);

          return _denormalizeCollection(boards);
        }).catch(function(err){
          console.log(err)
        })
      }
      return $q.resolve(_boards);
    }

    // We also make the create method
    // available on the service
    var create = function create (params) {
      return _createBoard(params);
    };

    var show = function show(id){
      return index().then(function(){
        if(!_boards[id]) throw 'Board Not Found';
        return _boards[id]
      })
    }

    var destroy = function destroy(board){
      return board.remove()
        .catch(function(err){
          console.log(err);
        })
        .finally(function(){
          delete _boards[board.id]
        })
    }

    return {
      index: index,
      show: show,
      create: create,
      destroy: destroy,
    }
  }
])
