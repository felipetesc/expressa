enum RouteType{
  URL, REGEX, 
}

// handlers must to implement IHandler
interface IRoute{
  path(value : string): [string, RouteType];
}
// routes can define how to deal with url requests
// a route can be defined as 
class Route implements IRoute{
  path(value: string): [string, RouteType] {
    throw new Error("Method not implemented.");
  }
}

// handlers must to implement IHandler
interface IHandler{
  handler(request: Request): Response;
}
// We can have several routes and call an undefined number of handlers for each url
class Handler implements IHandler{
  
  #method = "generic";

  getMethod() : string{return this.#method;}
  

  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Get extends Handler{
  
  #method = "get";
  getMethod() : string{return this.#method;}
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Post extends Handler{
  
  #method = "generic";

  getMethod() : string{return this.#method;}
  


  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class DefaultErrHandler extends Handler{
  handler(request: Request): Response {
    let body = "Error: 403 Forbidden\n Your identity is known";
    return new Response(body, { status: 403 });
  }
}

class AppContext{
  //#getHandlers : Map<string, IHandler>;
  //#postHandlers : Map<string, IHandler>;
  #routesHandlers : Map<string, Handler>;
  #configs : object | undefined;
  
  constructor(configs? : object | undefined )
  { 
    this.#configs = configs ? configs : undefined;
    //this.#getHandlers = new Map<string, Get>();
    //this.#postHandlers = new Map<string, Post>();
    this.#routesHandlers = new Map<string, Handler>();
  }
  
  toString() : string {
    let res : string = ""; 
    return res;
  }
  
  getAllHandlers() : Map<string, Handler>{
    return this.#routesHandlers;
  }
  
  urlExists(url : string): boolean{
    return this.#routesHandlers.has(url);
  }
  
  getResponseByURL(url : string, req : Request): Response{
    return this.#routesHandlers.get(url)?.handler(req)!; 
  }
  getByURLAndMethod(url : string, method :  string, req : Request): Response{
    return this.#routesHandlers.get(url)?.handler(req)!; 
  }
  
  addRouteHandlerMap(handlers : Map<string, Handler>){
    handlers.forEach((v,k)=>{
      if(this.urlExists(k))throw new Error(`URL ${k} already contains handler`);
      else{
        this.#routesHandlers.set(k, v);
      } 
    });
  }

  appendRouteHandler(url : string , route : Handler){
    if(this.urlExists(url))throw new Error(`URL ${url} already contains handler`);
    else{
      this.#routesHandlers.set(url, route);
    }
    return this;
  }
  


  addRouteHandler(url : string , route : Handler) : void{
    if(this.urlExists(url))throw new Error(`URL ${url} already contains handler`);
    else{
      this.#routesHandlers.set(url, route);
    } 
  }
}
export type {IHandler,IRoute};
export {Get, Post, Handler, DefaultErrHandler, AppContext};