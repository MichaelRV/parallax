;(function($){
	'use strict';
	
	var Parallax = function(element, options){
		this.$element = null;
		this.options = null;
		
		this.init(element, options);
	};
	
	Parallax.DEFAULTS = {
		container: '.parallax-container',
		container_hover_class: 'hover',
		depth: 0.5,
		axis: null,
		parallaxmove: true,
		mousemove: true
	};
	
	Parallax.prototype.init = function(element, options){
		this.$element = $(element);
		this.options = this.getOptions(options);
	};
	
	Parallax.prototype.getDefault = function(){
		return Parallax.DEFAULTS;
	};
	
	Parallax.prototype.getOptions = function(options){
		options = $.extend({}, this.getDefault(), this.$element.data(), options);
		
		if(typeof options.depth === 'string')
			options.depth = parseFloat(options.depth);
		
		if(options.depth <= 0 || options.depth > 1)
			options.depth = Parallax.DEFAULTS.depth;
		
		return options;
	};
	
	Parallax.prototype.getCircle = function(radius, steps, centerX, centerY){
		var circle = [];
		
		for(var i = 0; i < steps; i++)
			circle[i] = {
				x: (centerX + radius * Math.cos(2 * Math.PI * i / steps)),
				y: (centerY + radius * Math.sin(2 * Math.PI * i / steps))
			};
		
		return circle;
	};
	
	Parallax.prototype.getSpeed = function(){
		var trans_dur = parseInt(this.$element.css('transition-duration')) * 1000;
		
		if(trans_dur === 0){
			this.$element.css('transition-duration', '1s');
			
			trans_dur = 1000;
		}
		
		//return Math.floor((Math.random() * 600) + 500)
		return Math.floor((Math.random() * (trans_dur * 0.6)) + (trans_dur * 0.5))
	};
	
	Parallax.prototype.getCoordinates = function(position, axis){
		return ((position - (axis === 'x' ? window.innerWidth : window.innerHeight) / 2) * this.options.depth / 10);
	};
	
	function Plugin(options){
		return this.each(function(){
			var $this = $(this),
				obj = new Parallax(this, options),
				o = obj.options,
				$parent = $this.parents(o.container),
				$mouse_move_target = ($parent.length === 0 ? $(window) : $parent),
				pause = false;
			
			$this.css('transition', 'transform 1s swing');
			
			if(o.parallaxmove === true){
				var circle = obj.getCircle(window.innerWidth / 2 * o.depth / 10, 33, 0, 0),
					iter = 0,
					speed = obj.getSpeed();
				
				setInterval(function(){
					if(!pause){
						$this.css('transform', 'translate(' + circle[iter].x + 'px, ' + circle[iter].y + 'px)');
						
						iter++;
						
						if(iter === circle.length)
							iter = 0;
					}
				}, speed);
			}
			
			if(o.mousemove === true){
				$parent.hover(function(){
					$parent.addClass(o.container_hover_class);
					pause = true;
				}, function(){
					$parent.removeClass(o.container_hover_class);
					pause = false;
				});
				
				$mouse_move_target.on('mousemove', function(e){
					var mouseX = e.pageX,
						mouseY = e.pageY,
						percentX = 0,
						percentY = 0;
					
					switch(o.axis){
						case 'x':
							percentX = obj.getCoordinates(mouseX, 'x');
							break;
						case 'y':
							percentY = obj.getCoordinates(mouseY, 'y');
							break;
						default:
							percentX = obj.getCoordinates(mouseX, 'x');
							percentY = obj.getCoordinates(mouseY, 'y');
					}
					
					$this.css('transform', 'translate(' + percentX + 'px, ' + percentY + 'px)');
				});
			}
			
			/*if(!$this.hasClass('no-parallax-move')){
				var circle = get_circle(window.innerWidth / 2 * depth / 10, 33, 0, 0),
					iter = 0,
					speed = Math.floor((Math.random() * (trans_dur * 0.6)) + (trans_dur * 0.5));
				
				setInterval(function(){
					if(!pause){
						$this.css('transform', 'translate(' + circle[iter].x + 'px, ' + circle[iter].y + 'px)');
						
						iter++;
						
						if(iter === circle.length)
							iter = 0;
					}
				}, speed);
			}
			
			if($this.hasClass('mouse-move')){
				$parent.hover(function(){
					$parent.addClass('hover');
					pause = true;
				}, function(){
					$parent.removeClass('hover');
					pause = false;
				});
				
				$mouse_move_target.on('mousemove', function(e){
					var mouseX = e.pageX,
						mouseY = e.pageY,
						percentX = 0,
						percentY = 0;
					
					if(typeof depth === 'undefined'){
						percentX = (mouseX - window.innerWidth / 2) * depth / 10;
						percentY = (mouseY - window.innerHeight / 2) * depth / 10;
					} else {
						switch(axis){
							case 'x':
								percentX = (mouseX - window.innerWidth / 2) * depth / 10;
								break;
							case 'y':
								percentY = (mouseY - window.innerHeight / 2) * depth / 10;
								break;
							default:
								percentX = (mouseX - window.innerWidth / 2) * depth / 10;
								percentY = (mouseY - window.innerHeight / 2) * depth / 10;
						}
					}
					
					$this.css({
						'transform': 'translate(' + percentX + 'px, ' + percentY + 'px)'
					});
				});
			}*/
		});
	}
	
	$.fn.parallax = Plugin;
	$.fn.parallax.Constructor = Parallax;
	
})(jQuery);