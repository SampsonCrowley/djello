djello.directive('horizontalScroll', [
  '$timeout',
  function ($timeout) {
    /**
    Smoothly scroll element to the given target (element.scrollLeft)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted
    */
    var smooth_scroll_to = function(element, target, duration) {
      target = Math.round(target);
      duration = Math.round(duration);
      if (duration < 0) {
        return Promise.reject("bad duration");
      }
      if (duration === 0) {
        element.scrollLeft = target;
        return Promise.resolve();
      }

      var start_time = Date.now();
      var end_time = start_time + duration;

      var start_left = element.scrollLeft;
      var distance = target - start_left;

      // based on http://en.wikipedia.org/wiki/Smoothstep
      var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
      }

      return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollLeft is
        // supposed to be, based on what we're doing
        var previous_left = element.scrollLeft;

        // This is like a think function from a game loop
        var scroll_frame = function() {
          if(element.scrollLeft != previous_left) {
            // reject("interrupted");
            return;
          }

          // set the scrollLeft for this frame
          var now = Date.now();
          var point = smooth_step(start_time, end_time, now);
          var frameLeft = Math.round(start_left + (distance * point));
          element.scrollLeft = frameLeft;

          // check if we're done!
          if(now >= end_time) {
            resolve();
            return;
          }

          // If we were supposed to scroll but didn't, then we
          // probably hit the limit, so consider it done; not
          // interrupted.
          if(element.scrollLeft === previous_left
            && element.scrollLeft !== frameLeft) {
              resolve();
              return;
            }
            previous_left = element.scrollLeft;

            // schedule next frame for execution
            $timeout(scroll_frame);
          }

          // boostrap the animation process
          $timeout(scroll_frame);
        });
      }
      return {

        link:function (scope, element, attrs) {
          var width, widthEl, scrollSection = element;

          if(attrs.scroll){
            scrollSection = document.querySelector(attrs.scroll);
          }

          element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

            // cross-browser wheel delta
            var event = window.event || event; // old IE support
            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

            if(attrs.width){
              width = attrs.width;
            } else if(attrs.widthEl && !widthEl){
              widthEl = angular.element(attrs.widthEl)
              if(widthEl[0]) width = widthEl[0].getBoundingClientRect().width;
            }

            width = width || 300;

            scope.$apply(function(){
              smooth_scroll_to(scrollSection, scrollSection.scrollLeft - width*delta, 500)
            });

            // for IE
            event.returnValue = false;
            // for Chrome and Firefox
            if(event.preventDefault) {
              event.preventDefault();
            }
          });
        }
      };
    }
  ]);
