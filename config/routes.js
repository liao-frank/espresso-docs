class AppRouter extends BeanRouter {
	// METHOD('PATH', 'CONTROLLER#ACTION');
	use() {
		this.get('/demos', 'demos#demos');
		this.get('/demos/chatroom', 'demos#chatroom');
		this.get('/demos/whiteboard', 'demos#whiteboard');


		this.get('/', 'home#redirect');
		this.get('/home', 'home#home');
		// this.get('/about', 'home#about');
		// this.get('/contact', 'home#contact');
	}
}