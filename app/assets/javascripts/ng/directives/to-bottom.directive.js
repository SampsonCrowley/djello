djello.directive('toBottom',[
  '$timeout',
  function($timeout){
    var _getOffset = function _getOffset(el) {
      el = el.getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
      }
    }

    var _setHeight = function _setHeight(s, el, a){
      $timeout(function(){
        el[0].style.height = "calc(100vh - " + _getOffset(el[0]).top +"px)";
      })
    };

    return {
      restrict: 'A',
      link: _setHeight
    }
  }
])
