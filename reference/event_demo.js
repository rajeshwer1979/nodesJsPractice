const EventEmitter = require('events');

//create Class
class MyEmitter extends EventEmitter{ }

//Init Object
const myEmitter = new MyEmitter();
//Event listener
myEmitter.on('event', () => console.log('Event Fired!'));

//Init event
myEmitter.emit('event');
