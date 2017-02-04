djello.factory('memberService',[
  'Restangular',
  function(restangular){

    // PRIVATE
    var _rest = restangular.all('users'),
        _users = {};

    var _denormalize = function _denormalize(board){
      var id = board["_id"]["$oid"];
      _boards[id] = {
        id: id,
        title: board["title"],
        created: new Date(board['created_at']),
        members: board["members"]
      }
      show(id);
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
        console.log(board)
      }).catch(function(err){
        console.log(err)
      })
    }

    var create = function create(data){
      return _rest.post({board: {title: data.title}}).then(function(board){
        return _denormalize(board)
      })
    }

    return {
      index: index,
      create: create
    }
  }
])
