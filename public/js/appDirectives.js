angular.module('appDirectives', [])
	 .directive('stage', ['$rootScope',
	    function stageDirective ($rootScope) {
	        return {
	            restrict: 'EA',
	            scope: {
	                stageWidth: '=',
	                stageHeight: '='
	            },
	            link: function linkFn (scope, elem, attrs) {
	                var id = attrs["id"];
	                if (!id) {
	                    id = Math.random().toString(36).substring(8);
	                    elem.attr('id', id);
	                }
	                var stageWidth = scope.stageWidth || 600;
	                var stageHeight = scope.stageHeight || 600;

	                var konva= {
	                    stage: new Konva.Stage({
	                        container: id,
	                        width: stageWidth,
	                        height: stageHeight
	                    })
	                };

	                scope.konva= konva;

	                $rootScope.$broadcast('KONVA:READY', konva.stage);
	            }
	        };
	    }])

	 .directive('fileModel', ['$parse', function ($parse) {
             return {
		        restrict: 'A',
		        link: function(scope, element, attrs) {
		            var model = $parse(attrs.fileModel);
		            var modelSetter = model.assign;
		            
		            element.bind('change', function(){
		                scope.$apply(function(){
		                    modelSetter(scope, element[0].files[0]);
		                });
		            });
		        }
		    };
         }])

.directive('styleParent', function(){ 
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {
         elem.on('load', function() {
            var w = $(this).width(),
                h = $(this).height();

            var div = elem.parent();

            //check width and height and apply styling to parent here.
         });
     }
   };
});
      