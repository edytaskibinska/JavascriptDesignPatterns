
(function(win, $){

	//builder 

	function Circle(){
		this.item = $('<div class="circle"></div>');
	}
	Circle.prototype.move = function(left, top) {
		this.item.css('left',left);
		this.item.css('top',top)
	}
	Circle.prototype.color = function(clr){
		this.item.css('background',clr);

	}
	Circle.prototype.get = function(){
		return this.item
	}
	function RedCircleBuilder(){
		this.item = new Circle;
		this.init();
	}
	RedCircleBuilder.prototype.init = function(){}
	RedCircleBuilder.prototype.get = function(){
		return this.item.get()
	}
	
	function BlueCircleBuilder(){
		this.item = new Circle;
		this.init();
	}


	BlueCircleBuilder.prototype.init = function(){
		this.item = $('<div class="circle" style="background:blue"></div>');
		return this
	}
	BlueCircleBuilder.prototype.get = function(){
		return this.item.get()
	}

	//reusable factory
	var CircleFactory = function() {
		//storing all the types
		this.types = {

		}
		this.create = function(type){

			return new this.types[type]().create()
		
		}

		//register those circles
		this.register = function(type, cls){
			//if the class has prototype create
			//testing it it's implementng the interface that is mandatory
			if(cls.prototype.init && cls.prototype.get){
				this.types[type] = cls
			}

		}
	}
	//singleton
	var CircleGeneratorSingleton = (function(){
		var instance;
		function init(){
			var _aCircle = [],
				_stage = $('.advert'),
				_cf = new CircleFactory();
				_cf.register('red', RedCircleBuilder)
				_cf.register('blue', BlueCircleBuilder)
				
				function create(left, top, type) {
					var circle = _cf.create(type).get();
					_position(circle, left, top);

					return circle;
				}
				function add(circle){
					_stage.append(circle);
					_aCircle.push(circle)
				}
				function index(){
					return _aCircle.length;
				}
				//reveal pattern
			return {
				index:index,
				create: create,
				add: add
			};
		}
		return {
			getInstance : function() {
				if(!instance) {
					instance = init();
				}
				return instance;
			}
		}
	})();
	$(win.document).ready(function(){
		$('.advert').click(function(e){
			var cg = CircleGeneratorSingleton.getInstance()
			var circle = cg.create(e.pageX-25, e.pageY-25, "red");
			cg.add(circle)
		});
	});
	$(document).keypress(function(e){
		if(e.key == 'a') {
			var cg = CircleGeneratorSingleton.getInstance()
			var circle = cg.create(Math.floor(Math.random()*600), Math.floor(Math.random()*600), "blue");
			cg.add(circle)
		}
	});

})(window, jQuery);



//initial code :
// (function(win, $){
// 	$(win.document).ready(function(){
// 		$('.advert').click(function(e){
// 			var circle = $('<div class="circle"></div>');
// 				circle.css('left',e.pageX-25);
// 				circle.css('top',e.pageY-25)
// 			$('.advert').append(circle);
// 		});

// 	});

// })(window, jQuery);