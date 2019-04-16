'use strict';
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

(function () {
	'use strict';
	var pointB = function pointB(x, y) {
		this.x = typeof x === 'number' ? x : 0;
		this.y = typeof y === 'number' ? y : 0;
	};

	var pointC = function (PointA) {
		
		function pointC(x, y, z) {
			var _this = _possibleConstructorReturn(this, PointA.call(this, x, y));
			_this.z = typeof z === 'number' ? z : 0;
			return _this;
		}

		return pointC;
	}(pointB);
	var drawSvgShape = function () {
		function drawSvgShape(center, size) {
			var d = size / 6;
			this.vertices = [new pointC(center.x - d, center.y - d, center.z + d), new pointC(center.x - d, center.y - d, center.z - d), new pointC(center.x + d, center.y - d, center.z - d), new pointC(center.x + d, center.y - d, center.z + d), new pointC(center.x + d, center.y + d, center.z + d), new pointC(center.x + d, center.y + d, center.z - d), new pointC(center.x - d , center.y + d , center.z - d ), new pointC(center.x - d , center.y + d , center.z + d)];
			this.squares = [[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]], [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]], [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]], [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]], [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]], [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]];
		}

		drawSvgShape.prototype.render = function render(container, dx, dy) {
			container.innerHTML = "";

			for (var i = 0, j = this.squares.length; i < j; i++) {
				var square = this.squares[i];
				var point = Project(square[0]);
				var str = '<path d="M' + (point.x + dx) + ' ' + (-point.y + dy);
				for (var o = 1, oo = square.length; o < oo; o++) {
					point = Project(square[o]);
					str += ' L ' + (point.x + dx) + ' ' + (-point.y + dy);
				}
				str += ' Z" fill="rgba(173, 151, 79, .6)" stroke="rgba(217,217,217, .3)">';
				container.innerHTML += str;
			}
		};

		return drawSvgShape;
	}();

	var Project = function Project(vertice) {
		return new pointB(vertice.x, vertice.z);
	};

	var Rotate = function Rotate(vertice, center, theta, phi) {
		var ct = Math.cos(phi),
		    st = Math.sin(phi),
		    cp = Math.cos(theta),
		    sp = Math.sin(theta),
		    x = vertice.x - center.x*1.0015,
		    y = vertice.y - center.y*1.0015,
		    z = vertice.z - center.z*1.0015;
		vertice.x = ct * x - st * cp * y + st * sp * z + center.x;
		vertice.y = st * x + ct * cp * y - ct * sp * z + center.y;
		vertice.z = sp * y + cp * z + center.z;
	};

	var container = document.querySelector('svg');
	var width = container.attributes.width.value;
	var height = container.attributes.height.value;
	var dx = width / 2.25;
	var dy = height / 2.25;
	var center = new pointC(0, dy, 0);
	var cube = new drawSvgShape(center, dy);
	var mouse = {
		down: false,
		x: 0,
		y: 0
	};

	var autoSpin = function autoSpin() {
		for (var i = 0, j = 8; i < j; i++) {
			Rotate(cube.vertices[i], center, Math.PI / 270, Math.PI / 450);
		}
		cube.render(container, dx, dy);
		!mouse.down ? requestAnimationFrame(autoSpin) : null;
	};

	cube.render(container, dx, dy);

	container.addEventListener('mousedown', function (e) {
		mouse.down = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	container.addEventListener('mousemove', function (e) {
		if (mouse.down) {
			var phi = (e.clientX - mouse.x) * Math.PI / 360;
			var theta = (e.clientY - mouse.y) * Math.PI / 180;

			for (var i = 0, j = 8; i < j; i++) {
				Rotate(cube.vertices[i], center, theta, phi);
			}
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			cube.render(container, dx, dy);
		}
	});

	container.addEventListener('mouseup', function (e) {
		setTimeout(function () {
			mouse.down = false;requestAnimationFrame(autoSpin);
		}, 200);
	});

	container.addEventListener('mouseleave', function (e) {
		setTimeout(function () {
			mouse.down = false;requestAnimationFrame(autoSpin);
		}, 200);
	});				

	requestAnimationFrame(autoSpin);
})();