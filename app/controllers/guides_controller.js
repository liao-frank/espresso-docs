class GuidesController extends BeanController {
	constructor() {
		super();
		this.marked = cli.require('marked');
		this.markdowns = {
			'getting_started': cli.cat('/app/assets/documentation/getting_started.md'),
			'command_line': cli.cat('/app/assets/documentation/command_line.md'),
			'controllers': {
				'vanilla_controllers': cli.cat('/app/assets/documentation/controllers/controllers.md'),
				'socketed_controllers': cli.cat('/app/assets/documentation/controllers/socketed_controllers.md')
			},
			'views': cli.cat('/app/assets/documentation/views.md')
		};
	}

	controllers(req, res) {
		let markdown_files = this.markdowns['controllers'];

		res.render({
			vanilla_controllers_markdown: this.marked(markdown_files.vanilla_controllers),
			socketed_controllers_markdown: this.marked(markdown_files.socketed_controllers)
		});
	}

	views(req, res) {
		let markdown_file = this.markdowns['views'];

		res.render({
			markdown: this.marked(markdown_file)
		});
	}

	command_line(req, res) {
		let markdown_file = this.markdowns['command_line'];

		res.render({
			markdown : this.marked(markdown_file)
		});
	}

	index(req, res) {

		res.render({});
	}

	getting_started(req, res) {
		let markdown_file = this.markdowns['getting_started'];

		res.render({
			markdown : this.marked(markdown_file)
		});
	}
}