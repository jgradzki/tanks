define([], function() {
	
	return {
		skok: 20,
		boardSize: {w: 300, h: 300},
		playerSize: {w: 20, h: 20},
		get: function(key){
			return this[key];
		}
	};

});