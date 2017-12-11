class DemosSocketedController extends DemosController {
	constructor() {
		super();
		this.chat_users = [];
		// requiring my Model here...
		let path = require('path').resolve();
		this.messages = require(path + '/app/models/messages.js');
	}

	demos_socket(io, socket) {
		socket.emit("connected", {});
	}

	chatroom_socket(io, socket) {
		socket.emit("connected", {});
		// emit current users
		this.chat_users.forEach((user) => { socket.emit('join', user); });
		// emit stored messages
		this.messages.index(function(messages) {
			messages.forEach(function(message) {
				socket.emit('message', message);
			});
		});
		// receive a message
		socket.on('message', (data) => {
			this.messages.add(data);
			socket.broadcast.emit('message', data);
		});
		socket.on('join', (data) => {
			let not_found = true;
			this.chat_users.forEach(function(user) {
				if ((user.nickname == data.nickname) && (user.nickname_salt == data.nickname_salt)) {
					not_found = false;
				}
			});
			if (not_found) this.chat_users.push(data);
			socket.broadcast.emit('join', data);
		});
		socket.on('leave', (data) => {
			this.chat_users = this.chat_users.filter((user) => {
				return ((user.nickname != data.nickname) || (user.nickname_salt != data.nickname_salt));
			});
			socket.broadcast.emit('leave', data);
		});
	}

	whiteboard_socket(io, socket) {
		socket.emit("connected", {});
		socket.on('drawing', function(data) {
			 socket.broadcast.emit('drawing', data);
		});
	}
}