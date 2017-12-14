## Socketed controllers
These controllers are unique to espresso. Socketed controllers help implement socket.io into your application. Socketed controller actions are automatically generated for every GET action on the respective vanilla controller.

Essentially, socketed controllers are just extensions of its respective vanilla controller, therefore they will inherit the constructors of their vanilla counterparts. However, they must also follow the same conventions wherever necessary. 

### socket, io objects
espresso uses WebSocket functionality implemented by socket.io. Documentation for these specific objects can be found <a href="https://socket.io/docs/server-api/#socket" target="_blank">here</a> for `socket` and <a href="https://socket.io/docs/rooms-and-namespaces/" target="_blank">here</a> for `io`.

### Action matching
When you run your server, each socket method is matched up to its vanilla action.

For example, the `index` action of `TestController` will automatically be matched to the `index_socket` action on `TestSocketedController`. All socket actions defined in `index_socket` will automatically be available to `index`'s corresponding route.

This design is mainly for code clarity and file separation.

## Routing
### Coming soon
More detailed routing documentation to come soon. However, routing is automatically generated with espresso commands, and it follows closely to Rails routing. Look inside `/config/routes.js` after generating some basic routes, in order to see the correct format.