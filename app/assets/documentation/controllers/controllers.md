## Vanilla controllers
These controllers are the ones that seem familiar to Rails controllers. Each generated action exists as a single function in the controller file. However, as you can see, there are a few differences in espresso controllers.

### req, res objects
Because espresso is built on top of Express, users are given full control of request `req` and response `res` objects. The default method called is an espresso-customized `res.render` (see the views guide for more details), but the objects otherwise support the exact same functionality as Express's objects.

See Express's documentation for `req` <a href="http://expressjs.com/en/api.html#req" target="_blank">here</a> and for `res` <a href="http://expressjs.com/en/api.html#res" target="_blank">here</a>.

### Controller constructors
espresso exposes the controller constructor for more flexibility. Require your favorite npm modules here. Additionally, define or require model functionality here to be used across the controller, or any other persistent variables you might need.

### require convention
Keep in mind that using `require()` in espresso controllers needs a little bit of adjustment. Because espresso evaluates your controllers and runs your server in a different location, defined paths may not work as expected.

**Using `__dirname` and `.` and other variants will not work in controller files!**

It should be noted that only controllers are evaluated this way, so `require()` statements in other places should work as expected.

#### Requiring custom modules
For requiring custom modules, please use resolve your path and substitute that path in place of `.`, like in the following example
```
// The incorrect way:
// this.my_model = require('./app/models/my_model.js');
let path = require('path').resolve();
this.my_model = require(path + '/app/models/my_model.js');
```

#### Requiring npm modules
For requiring npm modules, you can try the `path` technique as outlined above, or take advantage of espresso's `cli` object. For the latter method, requiring is as simple as the following
```
// The incorrect way:
// this.npm_module = require('npm_module');
this.npm_module  = cli.require('npm_module');
```