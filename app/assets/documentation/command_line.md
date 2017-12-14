# espresso's command line
There are a few commands that espresso has implemented to mimic a Rails environment. The commands include
- `espresso new APP_NAME`
- `espresso generate controller CONTROLLER_NAME [ACTION:METHOD]`
- `espresso server`

The rest of the guide will go over the commands in the order they are used to create and run a successful app.

## espresso new
The first thing to do is to create a new application with `espresso new` after installing espresso.

espresso will generate the entire directory structure with this command, as well as a `package.json` file and a `README.md`.

After creating a new app, make sure to run `npm install` to install all the basic dependencies.

## espresso generate
### controllers
To generate a controller, run `espresso generate controller CONTROLLER_NAME [ACTION:METHOD]`. Methods include the following supported HTTP methods

- GET
- POST
- PUT
- DELETE

`espresso generate controller` will create the controller file, a socketed controller file for GET actions, views, and all assets pertaining to views. Additionally, all actions will be added to the route configuration in `/config/routes.js`.

```
$ espresso generate controller Test show index create:post update:put delete:delete
	create	app/controllers/test_controller.js
	create	app/controllers/socketed_controllers/test_socketed_controller.js
	create		./app/views/test
	create		./app/assets/css/test
	create		./app/assets/js/test
	create		./app/assets/css/test/test.css
	create		./app/assets/js/test/test.js
	route	get '/test/show'
	create		./app/views/test/show.ejs
	create		./app/assets/css/test/test_show.css
	create		./app/assets/js/test/test_show.js
		...
	route	delete '/test/delete'
	create		./app/views/test/delete.ejs
	create		./app/assets/css/test/test_delete.css
	create		./app/assets/js/test/test_delete.js
```

### views
Currently, view generation is bundled into the `espresso generate controller` command. A decoupled `espresso generate view` command may be released in the future.

### models
Currently, espresso does not offer any model generation. A `/app/models` directory is generated during app creation, but it's up to the user to create and require their own model files. Fortunately, integrating your own model module is pretty easy in espresso. Check out the Chatbox demo for an example!

## espresso server
This command is where all the magic happens. espresso will read your route configuration and evaluate your action definitions, then integrate them into its own custom-ly configured Express server.

Some other specifications are as follows
- the default port is 50000, which is currently unconfigurable
- espresso uses the morgan package for basic request logging. Better customized logging may be added in the future.