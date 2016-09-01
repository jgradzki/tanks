/**
 * @todo
 * ***wielu graczy (obsługa wielu klawiszy)
/*  redux - zrobic w oddzienym pliku, ogarnac requireJS //requireJS- done
/* przeniesc callbacki klawiszy do innego pliku
/*  ustalanie własnych klawiszy
/*  ***one key one move
/*  czołgi, strzałki obracaja obiektem //  js/gra.js
/*  strzelanie 
/*  punktacja
/*  custom mapy
/*  ściany(losowo)
/*  funkcja dodawania graczy
/*  edytor mapy/wczytywanie mapy(najpierw sciany)
/*  power upy (invincible, faster shooting)
/*  react
/*  obsluga klient serwer(node.js)
 */

///////
// OGARNAC TA FUNKCJE
//////
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

 }

requirejs.config({
    baseUrl: '.',
    paths: {
    	js: 'js',
    	lib: 'js/libs'
    }
});


requirejs([
  // Load our app module and pass it to our definition function
  'config',
  'js/gra'
], function(Config, App){
    'use strict';
  // The "app" dependency is passed in as "App"
  App.init(Config.skok);
});

//(rect1.x < rect2.x + size.w &&
 //  				rect1.x + size.w > rect2.x &&
 //  				rect1.y < rect2.y + size.h &&
 //  				size.h + rect1.y > rect2.y)
 //(rect1.x==rect2.x && rect1.y==rect2.y)