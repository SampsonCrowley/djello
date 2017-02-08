djello.factory('memberService', [
  '$q', '_', 'Restangular', 'cardService',
  function($q, _, restangular, cardService){

    var index = function index(){

    }

    var _denormalizeMembers = function _denormalizeMembers(board){
      board.memberIdMap = {}
      for(var i = 0; i < board.members.length; i++){
        var member = board.members[i]
        board.memberIdMap[member.id] = i;
      }
    }

    var boardMembers = function boardMembers(board){
      if(board.members){
        restangular.restangularizeCollection(board, board.members, 'members');
        _denormalizeMembers(board);
      } else {
        board.getList("members").then(function(members){
          board.members = members;
          _denormalizeMembers(board);
        })
      }
    }

    var whereIdIn = function whereIdIn(board, arr){
      var members = [], map = board.memberIdMap;
      for(var i = 0; i < arr.length; i++){
        // var member = board.members[map[arr[i]]]
        board.getMember(arr[i]).then(function(member){
          if(member) members.push(member);
        })
      }
      return $q.resolve(members);
    }

    return {
      all: boardMembers,
      whereIdIn: whereIdIn
    }
  }
])
