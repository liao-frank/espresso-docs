class GuidesSocketedController extends GuidesController {
	constructor() {
		super();
	}

	controllers_socket(io, socket) {
		socket.emit("connected", {});
	}

	views_socket(io, socket) {
		socket.emit("connected", {});
	}

	command_line_socket(io, socket) {
		socket.emit("connected", {});
	}

	index_socket(io, socket) {
		socket.emit("connected", {});
	}
}