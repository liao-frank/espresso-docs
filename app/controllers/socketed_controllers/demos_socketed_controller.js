class DemosSocketedController extends DemosController {
	constructor() {
		super();
	}

	demos_socket(io, socket) {
		socket.emit("connected", {});
	}

	chatroom_socket(io, socket) {
		socket.emit("connected", {});
	}

	whiteboard_socket(io, socket) {
		socket.emit("connected", {});
		socket.on('drawing', function(data) {
			 socket.broadcast.emit('drawing', data);
		});
	}
}