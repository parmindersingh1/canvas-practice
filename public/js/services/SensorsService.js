angular.module('SensorsService', [])
	.factory('SensorsService', ['$http', function($http) {

	return {

		sensors:  [
			{
				name: "zone 1",
				id: "1",
				pin: "1"
			},
			{
				name: "zone 2",
				id: "2",
				pin: "2"
			},
			{
				name: "zone 3",
				id: "3",
				pin: "3"
			},
			{
				name: "zone 4",
				id: "4",
				pin: "4"
			},
			{
				name: "zone 5",
				id: "5",
				pin: "5"
			}


		],
		getZones : function() {
			return JSON.parse(localStorage.getItem('floorData'));
		},
		saveZones: function(data) {
			localStorage.setItem('floorData',JSON.stringify(data));
		}
	}

}])
.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .then(function(){
	        },function(){
	        });
	    }
     }]);