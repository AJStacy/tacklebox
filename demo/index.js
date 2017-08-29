var TackleBox = require('../dist/tacklebox.js').TackleBox;
var Hooks = new TackleBox.Hooks();


var Calculator = function() {

  function Calculator(a, b) {
    this.a = a;
    this.b = b;
  }

  Calculator.prototype.add = function() {

    // This hook will only be called a single time
    var beforeAdd = Hooks.callOnce('beforeAdd', (value) => {
      console.log("beforeAdd = "+value);
      return value || 0;
    }, this.a, this.b);

    var added = beforeAdd + this.a + this.b;
    console.log("a + b + beforeAdd = "+added+" = x");

    // This hook can be called an unlimited number of times
    var afterAdd = Hooks.call('afterAdd', (values) => {

      // Values is an accumulated array of values returned by registered hooks.
      // Here we are iterating over all of the values in the array and adding
      // them to a running total.
      var addAdditional = values.reduce((total, num, index) => {
        console.log("addAdditional"+index+" = "+num);
        return (total + num);
      },0);

      console.log("additionalTotal = "+addAdditional);

      return added + addAdditional;

    }, added);

    return afterAdd;

  }

  return Calculator;
}();

Hooks.register('beforeAdd',(...args) => {
  return 1;
});

Hooks.register('afterAdd',(...args) => {
  return 3;
});

Hooks.register('afterAdd',(...args) => {
  return 5;
});

var a = 2;
var b = 4;

var myCalculator = new Calculator(a,b);
console.log("x + addtionalTotal = "+myCalculator.add());
