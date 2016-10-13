define(['config', 'lib/storage', 'lib/eventHandler'], function(Config, Storage, EventHandler) {

var gra = {

	//players : new Array(),
	klawisze : new Array(),
	//isKeyDown: false,
	//key: 0,
	//skok:20,
	//boardSize: {w: 300, h: 300},
	//playerSize: {w: 20, h: 20},
	//////////////
	playerMoveState: {
		FORWARD: 'FORWARD',
		BACKWARD: 'BACKWARD',
		LEFTWARD: 'LEFTWARD',
		RIGHTWARD: 'RIGHTWARD',
		NONE: 'NONE'
	},
	//gora prawo dol lewo

	/////////////

	init: function(skok){
		'use strict';
		var eventHandler = new EventHandler();
		//eventHandler.add(document, 'click', this.test);
		this.skok=skok;
		eventHandler.add(document, 'keydown', this.keyDown);
		eventHandler.add(document, 'keyup', this.keyUp);

		const { createStore } = Redux;
		const { combineReducers } = Redux;
		const reducers = combineReducers({players: this.playersReducer, walls: this.wallsReducer});
		this.store = createStore(reducers);
		console.log(this.store.getState());
		//this.store.dispatch({type: 'ADD_PLAYER', keys:{f: 38, b: 40, l: 37, r: 39},location:{x: 0, y:0},lastMove: this.playerMoveState.NONE});
		

		this.addplayer({f: 38, b: 40, l: 37, r: 39},{x: 0, y:0});
		this.addplayer({f: 87, b: 83, l: 65, r: 68},{x: 280, y:280});
		console.log(this.store.getState());
		//players.push({keys: {f: 38, b: 40, l: 37, r: 39}, lastMove: this.playerMoveState.NONE, location: {x: 0, y:0}});
		//players.push({keys: {f: 87, b: 83, l: 65, r: 68}, lastMove: this.playerMoveState.NONE, location: {x: 280, y:280}});
		this.spawn();
		setInterval(this.process.bind(this), 50);
	},

	playersReducer : (state = [], action) => {
		switch(action.type){
			case 'ADD_PLAYER':
				return [
					...state,
					{
						keys: action.keys,
						position: Config.get("position"),
						lastMove: action.lastMove,
						location: action.location
					}
				];
			default: 
				return state;
		}	
	},

	wallsReducer: (state = [], action) =>{
		switch(action.type){

			default: 
				return state;
		}	
	},

	process: function(){
		'use strict';
			let players = this.store.getState().players;
			for (var p = 0; p < players.length; ++p) {

				var pozycja=clone(players[p].location);
				//movement
				var element = document.getElementById('player_'+p);
				if(this.keyStatus(players[p].keys.f)){
					if(players[p].lastMove!==this.playerMoveState.FORWARD){
						if(this.kierunek(p,0)){
							players[p].location.x-=this.skok;
						}else{
							this.obrot(p,0);
						}
						players[p].lastMove=this.playerMoveState.FORWARD;
					}
				}else if(this.keyStatus(players[p].keys.b)){
						if(players[p].lastMove!==this.playerMoveState.BACKWARD){
							if(this.kierunek(p,2)){
							players[p].location.x+=this.skok;
						}else{
							this.obrot(p,2);
						}
						players[p].lastMove=this.playerMoveState.BACKWARD;
					}
				}else if(this.keyStatus(players[p].keys.l)){
						if(players[p].lastMove!==this.playerMoveState.LEFTWARD){
						if(this.kierunek(p,3)){
							players[p].location.y-=this.skok;
						}else{
							this.obrot(p,3);
						}
						players[p].lastMove=this.playerMoveState.LEFTWARD;
					}
				}else if(this.keyStatus(players[p].keys.r)){
						if(players[p].lastMove!==this.playerMoveState.RIGHTWARD){
						if(this.kierunek(p,1)){
							players[p].location.y+=this.skok;
						}else{
							this.obrot(p,1);
						}
						players[p].lastMove=this.playerMoveState.RIGHTWARD;
					}
				}else{
					players[p].lastMove=this.playerMoveState.NONE;
				}
				//granica mapy
				if(players[p].location.x<0) players[p].location.x=0;
				if(players[p].location.x>Config.get("boardSize").h-Config.get("playerSize").h) players[p].location.x=Config.get("boardSize").h-Config.get("playerSize").h;

				if(players[p].location.y<0) players[p].location.y=0;
				if(players[p].location.y>Config.get("boardSize").w-Config.get("playerSize").w) players[p].location.y=Config.get("boardSize").w-Config.get("playerSize").w;

				//kolizja
				if(this.kolizja(players,p,Config.get("playerSize"))){players[p].location=pozycja;}
			}

		this.refresh();
	},

	refresh: function(){
		'use strict';
		let players = this.store.getState().players;
		for (var p = 0; p < players.length; ++p) {
			var t = document.getElementById('player_'+p);
			t.style.top=players[p].location.x;
			t.style.left=players[p].location.y;
		}
	},
	spawn: function(){
		'use strict';
	 	var parent = document.getElementById('board');
        parent.style.width = Config.get("boardSize").w;
        parent.style.height = Config.get("boardSize").h;
        let players = this.store.getState().players;
        for (var p = 0; p < players.length; ++p) {
        var element = document.createElement('div'); //tworzymy nowego Diva
        element.className = "wsad";
        element.id = 'player_'+p;
        element.style.width = Config.get("playerSize").w;
        element.style.height = Config.get("playerSize").h;  
        element.style.top = players[p].location.x;
        element.style.left = players[p].location.y;
		parent.appendChild(element); //wstawiamy element do drzewa dokumentu
		}	
	},
	
	keyDown: function(e){
		'use strict';
		e = e || window.event;
		//console.log(e.keyCode);
		gra.klawisze[e.keyCode]=true;
	},

	keyUp: function(e){
		'use strict';
		e = e || window.event;
		gra.klawisze[e.keyCode]=false;
	},

	keyStatus: function(id){
		'use strict';
		if (typeof gra.klawisze[id] != "undefined"){
			return gra.klawisze[id];
		}else {
			return false;
		}
	},



	kolizja: function(players,i,size){
		'use strict';
		for (var s = 0; s < players.length; ++s) {
			if(s==i)continue;
			var rect1=players[s].location;
			var rect2=players[i].location;
			if(rect1.x < rect2.x + size.w &&
   				rect1.x + size.w > rect2.x &&
   				rect1.y < rect2.y + size.h &&
   				size.h + rect1.y > rect2.y) {
				return true;
			}
		}
		return false;
	},


	addplayer: function(keys,location){
		//players.push({keys:keys, position:Config.get("position") ,lastMove: this.playerMoveState.NONE, location:location});
				this.store.dispatch({type: 'ADD_PLAYER', keys,location,lastMove: this.playerMoveState.NONE});
	},

	obrot: function(p,rotate){
		'use strict';
		let players = this.store.getState().players;
		players[p].position=rotate;		
		console.log(this.store.getState());
		var element = document.getElementById('player_'+p);
		element.style.transform = 'rotate('+(90*players[p].position)+'deg)';
	},

	kierunek: function(p,x){
		'use strict';
		let players = this.store.getState().players;
		if(players[p].position==x){
			return true;
		}else{
			return false;
		}
	}
	
	
};

return gra;
});