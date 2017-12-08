# Troubleshooting Guide
This guide includes known bugs and issues.

## Global socket connectivity on '/' path
Currently, sockets on every path will connect to the server socket at the '/', in addition to the server socket they are expected to connect to.

If you need a decoupled socket for your homepage, it is recommended to add the following line to your controller action on '/'
```res.redirect('/home');```
and redirect to a seperate `/home` route.
### Why?
This is a limitation to socket.io.