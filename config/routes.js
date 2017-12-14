class AppRouter extends BeanRouter {
	// METHOD('PATH', 'CONTROLLER#ACTION');
	use() {
		this.get('/guides/controllers', 'guides#controllers');
		this.get('/guides/views', 'guides#views');
		this.get('/guides/command_line', 'guides#command_line');
		this.get('/guides', 'guides#index');
		this.get('/guides/getting_started', 'guides#getting_started');

		this.get('/demos', 'demos#demos');
		this.get('/demos/chatroom', 'demos#chatroom');
		this.get('/demos/whiteboard', 'demos#whiteboard');

		this.get('/', 'home#redirect');
		this.get('/home', 'home#home');
		this.get('/getting_started', 'guides#getting_started');
		// this.get('/about', 'home#about');
		// this.get('/contact', 'home#contact');
	}
}