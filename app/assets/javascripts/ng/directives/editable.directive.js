djello.directive('editable', [
  '$document', '$timeout',
  function($document, $timeout){

    var setup = function setup(s, el, a){
      s.input = el[0].querySelector('input[type="text"].form-control.editable-input')

      s.get = function() {
        return s.editModel[s.editVal];
      }

      s.set = function(val) {
        s.editModel[s.editVal] = val
      }

      s.edit = function edit(){
        s.newVal = s.get();
        s.active = true
        s.clicked = true;
        $timeout(function(){
          s.input.focus()
        });
      };

      angular.element(s.input).bind('keydown keypress', function (event) {
        if(event.which === 27) { // 27 = esc key
          s.$apply(function (){
            s.active = false;
            s.clicked = false
          });

          event.preventDefault();
        } else if(event.which === 13) { // 27 = esc key
          s.save(event)

          event.preventDefault();
        }

      });

      $document.on('click', function(event){
        if(!s.clicked){
          s.active = false;
        }
        s.clicked = false
        s.$apply()
      })

      s.save = function save($ev){
        $ev.stopPropagation();
        s.set(s.newVal);
        s.active = false;
        s.editModel.put()
      }
    }
    return {
      scope: {
        editVal: '@',
        editModel: '='
      },
      link: setup,
      transclude: true,
      template:`
      <div ng-click="edit($event)">
        <span ng-show="!active" ng-transclude></span>
        <div class="input-group" ng-show="active">
          <input type="text" class="form-control editable-input" ng-model="newVal">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button" ng-click="save($event)">Save</button>
          </span>
        </div>
      </div>
      `
    }
  }
])
