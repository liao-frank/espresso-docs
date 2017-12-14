# Views
## Rendering
Views in espresso are rendered with embedded javascript. The syntax of EJS is very similar to embedded ruby; EJS documentation can be found <a href="http://ejs.co/#docs" target="_blank">here</a>.

### Layouts
espresso uses a layout system just like Ruby. Layouts can be found in `/app/views/layouts`. The default layout rendered is `application.ejs`.

When calling `res.render()`, you are setting the `__yield` partial that will be integrated into your layout, similar to Rails.

### res.render()
Espresso extends the `res.render()` method with default pathing. By default, `res.render()` should be called as follows
```
res.render({
	// define variables here to be passed to views
});
```

The default partial to be loaded is the file located at `/app/views/CONTROLLERNAME/ACTIONNAME.ejs`

If you want to load a custom partial or layout, specify the route in your render call, like so
```
res.render(PATH_TO_CUSTOM_VIEW, {
	// define variables here to be passed to views
});
```

## Assets
### Javascript files
By default, espresso views will try to load the following corresponding javascript files

- a global script, located at `/app/assets/js/scripts.js`
- a controller-wide script, located at `/app/assets/js/CONTROLLERNAME/CONTROLLERNAME.js`
- a page-specific script, located at `/app/assets/js/CONTROLLERNAME/CONTROLLERNAME_ACTIONNAME.js`

#### socket.io
A socket definition is included on every rendered page, through the global script. The socket will connect specifically to the current page route, and will log connection like so
```
Non-secure socket connection established at "localhost/socket.io" on port 50000.
```
Define your socket actions as normal, following socket.io standards.


### Stylesheet files
By default, espresso views will try to load the following corresponding javascript files

- a global script, located at `/app/assets/css/styles.css`
- a controller-wide script, located at `/app/assets/css/CONTROLLERNAME/CONTROLLERNAME.css`
- a page-specific script, located at `/app/assets/css/CONTROLLERNAME/CONTROLLERNAME_ACTIONNAME.css`

### Other assets
In general, the `assets` and `public` folder are loaded as static files. 

Files in those folders can be loaded by appending their relative file paths within `assets` to your domain URL. For example, the default asset references for this page are as follows
```
<link rel="stylesheet" type="text/css" href="/css/styles.css">
<link rel="stylesheet" type="text/css" href="/css/guides/guides.css">
<link rel="stylesheet" type="text/css" href="/css/guides/guides_views.css">

<script type="text/javascript" src="/js/scripts.js"></script>
<script type="text/javascript" src="/js/guides/guides.js"></script>
<script type="text/javascript" src="/js/guides/guides_views.js"></script>
```