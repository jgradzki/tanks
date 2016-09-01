define([], function(){

	function EventHandler(){
		'use strict';
		if(!(this instanceof EventHandler)){
			throw 'dupa';
		}
		this.events = new Array();
	};

	//ulepszyc o przekazywanie argumetow do finalnego callbacka

	EventHandler.prototype.add = function(target, event, callback) {
		'use strict';
		//znalesc wolne id w tablicy this.events
		var i=0;
		if(this.events.length>0){
			for(i=0;this.events.length>i; i++){
				console.log(typeof(this.events[i]))
				if(typeof(this.events[i])==null){
					break; void(console.log('lol'));
				}
			}
		}
		console.log(i);

		// pod znalezionym id dodac do tablicy callback
		//przeslac do this.event znaeziony id
		target.addEventListener(event, this.event.bind(this, 1));
	};

	EventHandler.prototype.event = function(id, e){
		'use strict';
		//jakis tam staff ktory zawsze przy evencie ma byc wykonywany

		//wywolac funkcje znajdujaca sie w this.events pod wskazanym id
	}

	

	return EventHandler;
});
