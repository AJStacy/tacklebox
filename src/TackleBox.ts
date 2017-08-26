export default class TackleBox {

  /**
   * Stores the hook callback queue.
   */
  private hooks:any;

  /**
   * Initialize TackleBox properties.
   */
  constructor() {
    this.hooks = {};
  }

  /**
   * `register()` is a public method for hooking into a hook namespace. Pass in
   * the name of the hook and a callback function to execute on the arguments.
   *
   * The hook may allow for replacement data to be returned. If the hook does
   * not allow for replacement data, simply return a String of "void".
   *
   * @param {String}    name        The name of the hook on which to execute the callback.
   * @param {Function}  callback    The callback function to execute at the hook point.
   * @return {Void}
   */
  public register(name:string, callback:Function):void {
    if( 'undefined' === typeof( this.hooks[name] ) ) {
      this.hooks[name] = []
    }
    this.hooks[name].push(callback);
  }

  /**
   * `call()` is a public method for creating a hook point within your code
   * base. The first parameter will be the name of the hook and all following
   * parameters will be arguments that are passed into the user's hook.
   *
   * @param   {String}    name  The name of the hook point.
   * @param   {Any[]}     args  The arguments to pass into the user defined callback.
   * @return  {Any}       Returns callback data if it does is not equal to "void".
   */
  public call(name:string, ...args:any[]):any {
    if( 'undefined' !== typeof( this.hooks[name] ) ) {
      this.hooks[name].forEach(function(hook:Function) {
        var values = hook(args);
        if (values !== 'void') return values;
      });
    }
  }

}
