define(['config', 'lib/storage', 'lib/eventHandler'], function(Config, Storage, EventHandler) {

var gra = {

	players : new Array(),
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
	/////////////

	init: function(skok){
		'use strict';
		var eventHandler = new EventHandler();
		eventHandler.add(document, 'click', this.test);
		this.skok=skok;
		document.onkeydown = this.keyDown;
		document.onkeyup = this.keyUp;
		this.players.push({keys: {f: 38, b: 40, l: 37, r: 39}, lastMove: this.playerMoveState.NONE, location: {x: 0, y:0}});
		this.players.push({keys: {f: 87, b: 83, l: 65, r: 68}, lastMove: this.playerMoveState.NONE, location: {x: 280, y:280}});
		this.spawn();
		setInterval(this.process.bind(this), 50);
	},

	test: function(){
		alert('wowo');
	},

	process: function(){
		'use strict';
			
			for (var p = 0; p < this.players.length; ++p) {

				var pozycja=clone(this.players[p].location);

				if(this.keyStatus(this.players[p].keys.f)){
					if(this.players[p].lastMove!==this.playerMoveState.FORWARD){
						this.players[p].location.x-=this.skok;
						this.players[p].lastMove=this.playerMoveState.FORWARD;
					}
				}else if(this.keyStatus(this.players[p].keys.b)){
						if(this.players[p].lastMove!==this.playerMoveState.BACKWARD){
						this.players[p].location.x+=this.skok;
						this.players[p].lastMove=this.playerMoveState.BACKWARD;
					}
				}else if(this.keyStatus(this.players[p].keys.l)){
						if(this.players[p].lastMove!==this.playerMoveState.LEFTWARD){
						this.players[p].location.y-=this.skok;
						this.players[p].lastMove=this.playerMoveState.LEFTWARD;
					}
				}else if(this.keyStatus(this.players[p].keys.r)){
						if(this.players[p].lastMove!==this.playerMoveState.RIGHTWARD){
						this.players[p].location.y+=this.skok;
						this.players[p].lastMove=this.playerMoveState.RIGHTWARD;
					}
				}else{
					this.players[p].lastMove=this.playerMoveState.NONE;
				}
			
				if(this.players[p].location.x<0) this.players[p].location.x=0;
				if(this.players[p].location.x>Config.get("boardSize").h-Config.get("playerSize").h) this.players[p].location.x=Config.get("boardSize").h-Config.get("playerSize").h;

				if(this.players[p].location.y<0) this.players[p].location.y=0;
				if(this.players[p].location.y>Config.get("boardSize").w-Config.get("playerSize").w) this.players[p].location.y=Config.get("boardSize").w-Config.get("playerSize").w;

				//console.log(this.kolizja(this.players,p,this.playerSize));
				if(this.kolizja(this.players,p,Config.get("playerSize"))){this.players[p].location=pozycja;}
			}

		this.refresh();
	},

	refresh: function(){
		'use strict';
		for (var p = 0; p < this.players.length; ++p) {
			var t = document.getElementById('player_'+p);
			t.style.top=this.players[p].location.x;
			t.style.left=this.players[p].location.y;
		}
	},
	spawn: function(){
		'use strict';
	 	var parent = document.getElementById('board');
        parent.style.width = Config.get("boardSize").w;
        parent.style.height = Config.get("boardSize").h;
        for (var p = 0; p < this.players.length; ++p) {
        var element = document.createElement('div'); //tworzymy nowego Diva
        element.className = "wsad";
        element.id = 'player_'+p;
        element.style.width = Config.get("playerSize").w;
        element.style.height = Config.get("playerSize").h;  
        element.style.top = this.players[p].location.x;
        element.style.left = this.players[p].location.y;
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
	}
	
};

return gra;
});