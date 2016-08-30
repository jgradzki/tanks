define(['config', 'lib/storage'], function(Config, Storage) {

var gra = {

	players : new Array(),
	klawisze : new Array(),
	//isKeyDown: false,
	skok: 20,
	//key: 0,
	boardSize: {w: 300, h: 300},
	playerSize: {w: 20, h: 20},
	init: function(skok){
		Storage();
		this.skok=skok;
		document.onkeydown = this.keyDown;
		document.onkeyup = this.keyUp;
		this.players.push({keys: {f: 38, b: 40, l: 37, r: 39}, keysCounter: {f: 0, b: 0, l: 0, r: 0}, location: {x: 0, y:0}});
		this.players.push({keys: {f: 87, b: 83, l: 65, r: 68}, keysCounter: {f: 0, b: 0, l: 0, r: 0}, location: {x: 280, y:280}});
		this.spawn();
		setInterval(this.process, 50);
	},

	process: function(){
		
			
			for (p = 0; p < gra.players.length; ++p) {

				var pozycja=clone(gra.players[p].location);
			



				if(gra.keyStatus(gra.players[p].keys.f)){
					if(gra.players[p].keysCounter.f==0){
						gra.players[p].location.x-=gra.skok;
						gra.players[p].keysCounter.f++;
					}
				}else if(gra.keyStatus(gra.players[p].keys.b)){
					if(gra.players[p].keysCounter.b==0){
						gra.players[p].location.x+=gra.skok;
						gra.players[p].keysCounter.b++;
					}
				}else if(gra.keyStatus(gra.players[p].keys.l)){
					if(gra.players[p].keysCounter.l==0){
						gra.players[p].location.y-=gra.skok;
						gra.players[p].keysCounter.l++;
					}
				}else if(gra.keyStatus(gra.players[p].keys.r)){
					if(gra.players[p].keysCounter.r==0){
						gra.players[p].location.y+=gra.skok;
						gra.players[p].keysCounter.r++;
					}
				}
			
				if(gra.players[p].location.x<0) gra.players[p].location.x=0;
				if(gra.players[p].location.x>gra.boardSize.h-gra.playerSize.h) gra.players[p].location.x=gra.boardSize.h-gra.playerSize.h;

				if(gra.players[p].location.y<0) gra.players[p].location.y=0;
				if(gra.players[p].location.y>gra.boardSize.w-gra.playerSize.w) gra.players[p].location.y=gra.boardSize.w-gra.playerSize.w;

				//console.log(gra.kolizja(gra.players,p,gra.playerSize));
				if(gra.kolizja(gra.players,p,gra.playerSize)){gra.players[p].location=pozycja;}
			}

		gra.refresh();
	},

	refresh: function(){
		for (p = 0; p < this.players.length; ++p) {
			var t = document.getElementById('player_'+p);
			t.style.top=gra.players[p].location.x;
			t.style.left=gra.players[p].location.y;
		}
	},
	spawn: function(){
	 	var parent = document.getElementById('board');
        parent.style.width = this.boardSize.w;
        parent.style.height = this.boardSize.h;
        for (p = 0; p < this.players.length; ++p) {
        var element = document.createElement('div'); //tworzymy nowego Diva
        element.className = "wsad";
        element.id = 'player_'+p;
        element.style.width = this.playerSize.w;
        element.style.height = this.playerSize.h;  
        element.style.top = this.players[p].location.x;
        element.style.left = this.players[p].location.y;
		parent.appendChild(element); //wstawiamy element do drzewa dokumentu
		}	
	},
	
	keyDown: function(e){
		e = e || window.event;
		console.log(e.keyCode);
			gra.klawisze[e.keyCode]=true;
	},

	keyUp: function(e){
		e = e || window.event;
			gra.klawisze[e.keyCode]=false;
			for(p=0; p<gra.players.length; p++)
			{
				if(e.keyCode==gra.players[p].keys.f){
					gra.players[p].keysCounter.f=0;
				}else if(e.keyCode==gra.players[p].keys.b){
					gra.players[p].keysCounter.b=0;
				}else if(e.keyCode==gra.players[p].keys.l){
					gra.players[p].keysCounter.l=0;
				}else if(e.keyCode==gra.players[p].keys.r){
					gra.players[p].keysCounter.r=0;
				}
			}
	},

	keyStatus: function(id){
		if (typeof gra.klawisze[id] != "undefined"){
			return gra.klawisze[id];
		}else {
			return false;
		}
	},



	kolizja: function(players,i,size){
		for (s = 0; s < players.length; ++s) {
			if(s==i)continue;
			rect1=players[s].location;
			rect2=players[i].location;
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