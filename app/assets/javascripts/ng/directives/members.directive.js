djello.directive("members", [
  'memberService',
  function(memberService){
    var _setup = function _setup(s, el, a){
      memberService.whereIdIn(s.board, s.ids).then(function(res){
        s.members = res
      })
    };

    return {
      scope: {
        board: '=',
        ids: '='
      },
      link: _setup
    }
  }
])
