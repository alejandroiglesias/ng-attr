;(function() {
  'use strict';

  angular
    .module('argshook.ngAttr', [])
    .directive('ngAttr', ['$parse', ngAttrDirective]);


  function ngAttrDirective($parse) {
    return {
      restrict: 'A',
      link: {
        pre: function (scope, element, attrs) {
          var el = element[0];

          attrs.$observe('ngAttr', setAttributes);

          function setAttributes() {
            var attrsAndValueRefs = $parse(attrs.ngAttr)(scope) || {};

            Object
              .keys(attrsAndValueRefs)
              .filter(function(attr) { return attrsAndValueRefs[attr] !== el.getAttribute(attr); })
              .forEach(function(attr) {
                if (attrsAndValueRefs[attr]) {
                  // Set attribute
                  attrs.$set(attrs.$normalize(attr), attrsAndValueRefs[attr]);
                } else if (Boolean(el.getAttribute(attr))) {
                  // Unset attribute
                  attrs.$set(attrs.$normalize(attr), null);
                }
              });
          }
          setAttributes();
        }
      }
    };
  }
})();

