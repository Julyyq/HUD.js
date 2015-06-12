;(function() {
	var defaultConfig = {
		"tplMask": "<div id='HUD-mask' style='visibility:hidden; position: fixed; width: 100%; height: 100%; left: 0; top: 0; background-color: black; opacity: 0.6; z-index: 999999999;'></div>",
		"tplHUD": "<div id='HUD' style='visibility:hidden; position: absolute; left: 50%; top: 50%; background-color: #FF5656; color: white; padding: 5px 10px; font-size: 14px; -webkit-font-smoothing: antialiased; border-radius: 5px; text-align: center; z-index: 999999999;'><canvas id='HUD-canvas' width='100' height='100'></canvas><p><%= HUD.text %></p></div>",
		"imageColor": "#FFFFFF",
		"text": "正在加载..."
	}
	var css = {
		"canvas": "HUD-canvas"
	}
	var HUD = function(params) {
		this.text = params.text || defaultConfig.text;
		this.imageColor = params.imageColor || defaultConfig.imageColor;
		
		this.init();
	}
	HUD.prototype = {
		init: function() {
			var mask = this.DOMParse(defaultConfig.tplMask);
			var hud = this.DOMParse(_.template(defaultConfig.tplHUD, {variable: "HUD"})({text:this.text}));
			var body = document.getElementsByTagName("body")[0];
			
			this.body = body;
			this.mask = mask;
			this.hud = hud;
		},
		DOMParse: function(string) {
			var div = document.createElement("div");
			div.innerHTML = string;
			return div.firstChild;
		},
		drawCircle: function() {
			var canvas = document.getElementById(css.canvas);
			var context = canvas.getContext('2d');
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var r = 30;
			var percent = 90/100;
			var circ = Math.PI * 2;
			var quart = Math.PI / 2;
			var angle = 0;
			
			context.lineWidth = 2;
			context.strokeStyle = this.imageColor;
			
			context.clearRect(0, 0, canvas.width, canvas.height);
		    context.beginPath();
		    context.arc(x, y, r, -(quart), ((circ) * percent) - quart, false);
		    context.stroke();
			
			// 运动
			var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  			
			function animate(angle) {
				context.clearRect(0, 0, canvas.width, canvas.height);
			    context.beginPath();
			    context.arc(x, y, r, -(quart) + circ*(angle/100), ((circ) * percent) - quart + circ*(angle/100), false);
			    context.stroke()
				
				angle++;
				
				if(angle>100) angle=0;
				
				requestAnimationFrame(function() {
					animate(angle);
				});
			}
			
			animate(angle);
		},
		show: function() {
			// 插入到DOM中
			this.body.appendChild(this.mask);
			this.body.appendChild(this.hud);
			
			// 绘制loading circle
			this.drawCircle();
			
			// 动态居中
			var hudWidth = this.hud.offsetWidth;
			var hudHeight = this.hud.offsetHeight;
			
			this.hud.style.marginLeft = -hudWidth/2 + "px";
			this.hud.style.marginTop = -hudHeight/2 + "px";
			
			// 显示
			this.mask.style.visibility = "visible";
			this.hud.style.visibility = "visible";
		},
		dismiss: function() {
			this.mask.remove();
			this.hud.remove();
		}
	}
	
	HUD.defaultHUD = null;
	
	HUD.instance = function(config) {
		HUD.defaultHUD = new HUD(config);
	}
	
	HUD.show = function(config) {
		config = config || {};
		!HUD.defaultHUD && HUD.instance(config);
		
		HUD.defaultHUD.show();
	}
	HUD.dismiss = function() {
		HUD.defaultHUD.dismiss();
	}
	
	window.HUD = HUD;
})()