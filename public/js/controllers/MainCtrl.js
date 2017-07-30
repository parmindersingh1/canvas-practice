angular.module('MainCtrl', []).controller('MainController', function($scope, SensorsService, fileUpload) {

	$scope.sensors = SensorsService.sensors;	
	console.log($scope.sensors);
	
	var $stageContainer = $("#container");
	var $sensorsList = $("#sensors_list");
	var stageOffset = $stageContainer.offset();
	var offsetX = stageOffset.left;
	var offsetY = stageOffset.top;

	var width = 32;
	var height = 32;

	$scope.floorData = {
		url: '../img/layout.jpg'
	};
	$scope.responseData = [];

	var img = new Image();
	img.onload = function() {
	  alert(this.width + 'x' + this.height);
	  $('#container').
	}
	img.src = $scope.floorData.url;
	


	$scope.onDragComplete=function(data,evt){
       // console.log("drag success, data:", data, evt);
       
    }
    $scope.onDropComplete=function(data,evt){
        console.log("drop success, data:", data, evt);        
        _.remove($scope.sensors, data);

        var element = evt.element;
	    var imgSrc = element.attr("src");
	    var name = element.data("name");
	    var centerX = element.centerX;
	    var centerY = element.centerY;

	    var width = element.width();
	    var height = element.width();

        var x = parseInt(evt.x - offsetX , 10);
    	var y = parseInt(evt.y - offsetY , 10);
    	data.pos = {
    		x: x,
    		y: y
    	};	
    	$scope.responseData.push(data);
    	  // get the drop payload (here the payload is the image)
		   
		   
		   

		    // element.hide();
		   

    		var imageObj = new Image();
		    imageObj.onload = function() {
			    var image = new Konva.Image({
			         id: data.id,
			         x: x,
			         y: y,
			         image: imageObj,
			         data: data,
			         draggable: true,
			         offset: {x: width/2, y:height/2},
			         dragBoundFunc: function(pos){
			         	var width = this.width(),
			         	    height = this.height(),
			         	    x = 0,
			         		y = 0;
			         	if(pos.x < 0) {
			         		x = 0;
			         	} else if(pos.x > 600 - width) {
			         		x = 600 - width;
			         	} else  {
			         		x = pos.x;
			         	}

			         	if(pos.y < 0) {
			         		y = 0;
			         	} else if(pos.y > 600 - height) {
			         		y = 600 - height;
			         	} else  {
			         		y = pos.y;
			         	}

			         	return {
			                x: x,
			                y: y
			            };
			         }
			      });

			    image.on('dblclick', function() {
			        this.destroy();
			        $scope.layer.draw();			        
			        _.remove($scope.responseData, this.attrs.data);
			        // this.attrs.element.show();
			        var dataObj = this.attrs.data;
			        delete dataObj.pos;
			        $scope.sensors.splice(_.sortedIndexBy($scope.sensors, dataObj, 'id'), 0, dataObj);
			        $scope.$apply($scope.sensors);
			        console.log($scope.responseData);
			    });

			    image.on('dragstart', function(e) {
			    	// console.log(e);
			        
			    });

			    image.on('dragend', function(e) {
			    	console.log(this.getAbsolutePosition());
			        this.attrs.data.pos = this.getAbsolutePosition();
			        console.log($scope.responseData);
			    });

			    image.on('mousemove', function(evt) {
			    	var pos = _.clone(this.attrs.data.pos);
			    	pos.x = pos.x + this.width()/2;
				    updateTooltip(pos, this.attrs.data.name); 

			    });

			    image.on("mouseout", function(){
			        $scope.tooltip.hide();
			        $scope.tooltipLayer.draw();
			    });


			    $scope.layer.add(image);
	    		$scope.stage.add($scope.layer);
		    }

		    
		    imageObj.src = imgSrc;

    }

    $scope.$on('KONVA:READY', function kineticReady (event, stage) {
    	console.log(event);
		$scope.stage = stage;
		$scope.layer = new Konva.Layer();
		$scope.tooltipLayer = new Konva.Layer();

		$scope.layer.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});

		$scope.layer.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});

		$scope.tooltip = new Konva.Label({
	        opacity: 0.75,
	        visible: false,
	        listening: false
	    });

	    $scope.tooltip.add(new Konva.Tag({
	        fill: 'black',
	        pointerDirection: 'down',
	        pointerWidth: 10,
	        pointerHeight: 10,
	        lineJoin: 'round',
	        shadowColor: 'black',
	        shadowBlur: 10,
	        shadowOffset: 10,
	        shadowOpacity: 0.5
	    }));

		$scope.tooltip.add(new Konva.Text({
	        text: '',
	        fontFamily: 'Calibri',
	        fontSize: 18,
	        padding: 5,
	        fill: 'white'
	    }));

        $scope.tooltipLayer.add($scope.tooltip);


		$scope.stage.add($scope.layer);
		$scope.stage.add($scope.tooltipLayer);


	});

	function updateTooltip(pos, text) {
        $scope.tooltip.getText().setText(text);
        $scope.tooltip.setPosition({
            x : pos.x - width/2,
            y : pos.y - height/2
        });
        $scope.tooltip.show();
        $scope.tooltipLayer.batchDraw();
    }




    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

    $scope.save = function() {
    	$scope.floorData.zones = $scope.responseData;
    	SensorsService.saveZones($scope.floorData);
    }
});