class DemosController extends BeanController {
	constructor() {
		super();
	}

	demos(req, res) {

		res.render({
			__title : 'Demos'
		});
	}

	chatroom(req, res) {

		res.render({
			__title : 'Chatroom Demo'
		});
	}

	whiteboard(req, res) {

		res.render({
			__title : 'Whiteboard Demo'
		});
	}
}