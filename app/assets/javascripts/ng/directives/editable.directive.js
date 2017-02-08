djello.directive('editable', [
  '$document', '$timeout',
  function($document, $timeout){

    var inputSelect = function inputSelect(s, el){
      $timeout(function(){
        if(s.textarea){
          s.input = el[0].querySelector('textarea.form-control.editable-input')
        } else {
          s.input = el[0].querySelector('input[type="text"].form-control.editable-input')
        }
        if(!s.input) inputSelect(s, el);
      }, 100)
    }

    var setup = function setup(s, el, a){
      s.textarea = s.textarea || false
      s.input = null
      inputSelect(s, el);

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
        console.log(s)
        s.set(s.newVal);
        s.active = false;
        s.editModel.put()
      }
    }
    return {
      scope: {
        editVal: '@',
        editModel: '=',
        textarea: '@'
      },
      link: setup,
      transclude: true,
      template:`
      <div ng-click="edit($event)">
        <span ng-show="!active" ng-transclude></span>

        <div ng-show="textarea && active">
          <div class=".form-group">
            <textarea class="form-control editable-input" ng-model="newVal"></textarea>
          </div>
          <button class="btn btn-primary" type="button" ng-click="save($event)">Save</button>
        </div>

        <div class="input-group" ng-show="!textarea && active">
          <input type="text" class="form-control editable-input" ng-model="newVal">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button" ng-click="save($event)">Save</button>
          </span>
        </div>
      </div>
      `
    }
  }
])
