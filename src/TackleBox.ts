export class Hooks {

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
    if ( 'undefined' === typeof this.hooks[name] ) {
      this.hooks[name] = [];
    }
    this.hooks[name].push(callback);
  }

  /**
   * `callOnce()` is a public method for creating a hook point within your code
   * base that will only be invoked once. The first parameter will be the name
   * of the hook and all following parameters will be arguments that are passed
   * into the user's hook.
   *
   * @param   {String}    name  The name of the hook point.
   * @param   {Any[]}     args  The arguments to pass into the user defined callback.
   * @return  {Any}       Returns callback data if it does is not equal to "void".
   */
  public callOnce(name:string, processor:Function, ...args:any[]):any {
    return this.caller(processor, [this.hooks[name][0]], args);
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
  public call(name:string, processor:Function, ...args:any[]):any {
    return this.caller(processor, this.hooks[name], args);
  }

  /**
   * `caller()` accepts a processor function and an Array of hook functions. It
   * will iterate over each hook function, pass them the args, and then return
   * their values as an array to the processor function.
   *
   * @param   {Function}    processor   The callback function invoked at the hook creation point.
   * @param   {Function[]}  hooks       An array of hook callbacks to be invoked with args.
   * @param   {Any[]}       args        The arguments to pass into the user defined callback.
   * @return  {Any}         Returns callback data if it does is not equal to "void".
   */
  private caller(processor:Function, hooks:Array<any>, ...args:any[]) {
    if ( 'undefined' !== typeof hooks ) {
      var values = hooks.reduce((acc:any[], hook:Function, index:number) => {
        acc.push(hook(args));
        return acc;
      },[]);
      return processor( (values.length > 1 ? values : values[0]) );
    }
  }

}
