# TackleBox

TackleBox is a small JavaScript library for registering and calling hooks. You
can use these hooks to create an API for your library or app.

## Setup

1. Import TackleBox into your project:
  * `<script src="node_modules/tacklebox/dist/tacklebox.js"></script>`
2. Then Initialize the TackleBox Hooks object:
  * `<script>Hooks = new TackleBox.Hooks();</script>`

## Usage

With TackleBox Hooks there are two main methods:

1. Hook.register(name:string, callback:Function, ...args:Array<any>);
  * name - The name of the hook you would like to hook into.
  * callback - The callback function for operating on hook data.
  * ...args - All of the arguments exposed by the hook.
2. Hook.call(name:string, processor:Function, ...args:Array<any>);
  * name - The name you would like to give this hook.
  * processor - A callback function for processing the data returned from registered callbacks.
  * ...args - An Array of data values from the registered callbacks.

#### Hooks.call() && Hooks.callOnce()

Use this method to create a hook. When you create a hook you are exposing a
place within your codebase to enable other scripts to either read data from the
hook or modify data within your codebase.

Here's an example of what this might look like in your project:

    var Calculator = function() {

    	function Calculator(a, b) {
    		this.a = a;
    		this.b = b;
    	}

    	this.prototype.add = function() {

    		// This hook will only be called a single time
    		var beforeAdd = Hooks.callOnce('beforeAdd', (value) => {
    			return value || 0;
    		}, this.a, this.b);

    		var added = beforeAdd + this.a + this.b;
    		console.log("Added a and b with the hook!",added);

    		// This hook can be called an unlimited number of times
    		var afterAdd = Hooks.call('afterAdd', (...values) => {

    			// Values is an accumulated array of values returned by registered hooks.
    			// Here we are iterating over all of the values in the array and adding
    			// them to a running total.
    			var addAdditional = values.reduce((total, num) {
    				return total + num;
    			});
    		}, added);

    		return afterAdded;

    	}
    }

#### Hook.register()

Use this method for hooking into exposed hooks. Whatever your hook returns will
be passed to the call method's processing callback function.

    var a = 2;
    var b = 4;

    Hooks.register('beforeAdd',function(...args) {
    	return 1;
    });

    Hooks.register('afterAdd',function(...args) {
    	return 3;
    });

    Hooks.register('afterAdd',function(...args) {
    	return 5;
    });

    var myCalculator = new Calculator(a,b);
    console.log(myCalculator.add());

After calling these hooks we should expect the output of myCalculator.add() to be
equal to 15.
