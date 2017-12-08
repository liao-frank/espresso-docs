// demo mode
let toggleMode = (function() {
	let mode = 'whiteboard';
	const MODES = [
		'whiteboard',
		'file'
	];

	function toggleMode() {
		let index = MODES.indexOf(mode);
		index = (index + 1) % MODES.length;

		mode = MODES[index];
		$('.demo-space').removeClass(MODES.map(s => s + '-mode').join(' '));
		$('.demo-space').addClass(mode + '-mode');
	}

	return toggleMode;
})();

$(document).ready(function() {
	$('.switch').on('click', function() {
		$(this).removeClass('unclicked');
		toggleMode();
	});

	// canvas
	(function() {
		let canvas = $('canvas')[0];
		let context = canvas.getContext('2d');

		let current = { };
		$('.whiteboard .color').on('click', function() {
			$('.whiteboard .color').removeClass('active');
			$(this).addClass('active');
			let color = $(this).css('background-color');
			changeColor(color);
		});
		changeColor('#434A54');

		let drawing = false;

		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('touchstart', onTouchDown, false);
		canvas.addEventListener('mouseup', onMouseUp, false);
		canvas.addEventListener('touchend', onTouchUp, false);
		canvas.addEventListener('mouseout', onMouseUp, false);
		canvas.addEventListener('touchleave', onTouchUp, false);
		canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
		canvas.addEventListener('touchmove', throttle(onTouchMove, 10), false);

		socket.on('drawing', onDrawingEvent);

		window.addEventListener('resize', onResize, false);
		onResize();

		function drawLine(x0, y0, x1, y1, color, emit) {
			context.beginPath();
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);
			context.strokeStyle = color;
			context.lineWidth = $(window).width() < 950 ? 1 : 2;
			context.stroke();
			context.closePath();

			if (!emit) { return; }
			var w = canvas.width;
			var h = canvas.height;

			socket.emit('drawing', {
				x0: x0 / w,
				y0: y0 / h,
				x1: x1 / w,
				y1: y1 / h,
				color: color
			});
		}

		function onTouchDown(e) {
			drawing = true;
			let x = e.targetTouches[0].clientX - current.offsetX;
			let y =  e.targetTouches[0].clientY - current.offsetY;
			current.x = x;
			current.y = y;

			e.preventDefault();
		}

		function onTouchUp(e) {
			if (!drawing) { return; }
			drawing = false;
			let x = e.targetTouches[0].clientX - current.offsetX;
			let y =  e.targetTouches[0].clientY - current.offsetY;
			drawLine(current.x, current.y, x, y, current.color, true);

			e.preventDefault();
		}

		function onTouchMove(e) {
			if (!drawing) { return; }
			let x = e.targetTouches[0].clientX - current.offsetX;
			let y =  e.targetTouches[0].clientY - current.offsetY;
			drawLine(current.x, current.y, x, y, current.color, true);
			current.x = x;
			current.y = y;

			e.preventDefault();
		}

		function onMouseDown(e) {
			drawing = true;
			let x = e.clientX - current.offsetX;
			let y = e.clientY - current.offsetY;
			current.x = x;
			current.y = y;
		}

		function onMouseUp(e) {
			if (!drawing) { return; }
			drawing = false;
			let x = e.clientX - current.offsetX;
			let y = e.clientY - current.offsetY;
			drawLine(current.x, current.y, x, y, current.color, true);
		}

		function onMouseMove(e) {
			if (!drawing) { return; }
			let x = e.clientX - current.offsetX;
			let y = e.clientY - current.offsetY;
			drawLine(current.x, current.y, x, y, current.color, true);
			current.x = x;
			current.y = y;
		}

		// limit the number of events per second
		function throttle(callback, delay) {
			let previousCall = new Date().getTime();
			return function() {
				let time = new Date().getTime();

				if ((time - previousCall) >= delay) {
					previousCall = time;
					callback.apply(null, arguments);
				}
			};
		}

		function onDrawingEvent(data) {
			let w = canvas.width;
			let h = canvas.height;
			drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
		}

		function changeColor(color) {
			current.color = color;
		}
		// make the canvas fill its parent
		function onResize() {
			canvas.width = $('.whiteboard').width();
			canvas.height = $('.whiteboard').height();
			let offset = $('.whiteboard').offset();
			current.offsetY = offset.top;
			current.offsetX = offset.left;
		}
	})();
});