djello.directive('editable', [
  '$document',
  function($document){

    var setup = function setup(s,el,a){
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
      };


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
        s.update({model: s.editModel})
      }
    }
    return {
      scope: {
        update: "&",
        editVal: '@',
        editModel: '='
      },
      link: setup,
      transclude: true,
      template:`
      <div ng-click="edit($event)">
        <span ng-show="!active" ng-transclude></span>
        <div class="input-group" ng-show="active">
          <input type="text" class="form-control" ng-model="newVal">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button" ng-click="save($event)">Save</button>
          </span>
        </div>
      </div>
      `
    }
  }
])
