import { AppConfigs } from "../utils/configs.ts";
import {log} from "../deps/deps.ts";
enum RouteType{
  URL, REGEX, 
}

// handlers must to implement IHandler
interface IRoute{
  path(value : string): [string, RouteType];
}
// routes can define how to deal with url requests
// a route is an abstract class 
class Route implements IRoute{
  path(value: string): [string, RouteType] {
    throw new Error("Method not implemented.");
  }
}

// handlers must to implement IHandler
interface IHandler{
  method: string;
  getMethod() : string;
  handler(request: Request): Response;
}
// We can have several routes and call an undefined number of handlers for each url
class Handler implements IHandler{
  
  method: string = "GEN".toUpperCase();
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

// an special handler to servve a get method exclusivelly
class GetHandler implements IHandler{
  
  method: string = "GET";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
  
}

class Post implements IHandler{
  
  method: string = "POST";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Delete implements IHandler{
  
  method: string = "DELETE";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Put implements IHandler{
  
  method: string = "PUT";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Head implements IHandler{
  
  method: string = "HEAD";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
  
}
class Patch implements IHandler{
  
  method: string = "PATCH";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}
class Options implements IHandler{
  
  method: string = "OPTIONS";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}
class Connect implements IHandler{
  
  method: string = "CONNECT";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class Trace implements IHandler{
  
  method: string = "TRACE";
  
  getMethod() : string{return this.method;}
  
  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class DefaultErrHandler implements IHandler{
  
  method: string = "ERR";
  
  getMethod() : string{return this.method;}

  handler(request: Request): Response {
    
    let body = "Error: 403 Forbidden\n Your identity is known";
    log.critical(body);
    return new Response(body, { status: 403 });
    
  }
  
}



class AppContext{
  
  #sharedObjects : Map<string, Object>;
  
  #getRoutesHandlers : Map<string, GetHandler>;
  
  #postRoutesHandlers : Map<string, Post>;
  
  #deleteRoutesHandlers : Map<string, Delete>;
  
  #putRoutesHandlers : Map<string, Put>;
  
  #headRoutesHandlers : Map<string, Head>;
  
  #patchRoutesHandlers : Map<string, Patch>;
  
  #optionsRoutesHandlers : Map<string, Options>;

  #connectRoutesHandlers : Map<string, Connect>;
  
  #traceRoutesHandlers : Map<string, Trace>;
  
  #genRoutesHandlers : Map<string, Handler>;
  
  #configs : AppConfigs | undefined;
  
  constructor(configs? : AppConfigs | undefined )
  { 
    this.#configs = configs ? configs : undefined;
    this.#getRoutesHandlers = new Map<string, GetHandler>();
    this.#postRoutesHandlers = new Map<string, Post>();
    this.#deleteRoutesHandlers = new Map<string, Delete>();
    this.#putRoutesHandlers = new Map<string, Put>();
    this.#headRoutesHandlers = new Map<string, Head>();
    this.#patchRoutesHandlers = new Map<string, Patch>();
    this.#optionsRoutesHandlers = new Map<string, Options>();
    this.#connectRoutesHandlers = new Map<string, Connect>();
    this.#traceRoutesHandlers = new Map<string, Trace>();
    this.#genRoutesHandlers = new Map<string, Handler>();
    this.#sharedObjects = new Map<string, Object>();
  }
  
  toString() : string {
    let res : string = "";
    return res;
  }
  
  hasMiddleware(objecKey : string) : boolean {
    
    return this.#sharedObjects.has(objecKey);
    
  }
  
  registerMiddleware(objecKey : string, obj : Object){
    
    if(this.hasMiddleware(objecKey)){
      
      let id = this.#sharedObjects.get(objecKey)!;
      new Error(`Object with the same name already exists. Object id is ${ id.toString() }`);
      
    }else{
      
      this.#sharedObjects.set(objecKey, obj)
      
    }
  }
  
  getMiddleware(objecKey : string) : Object | undefined{
    if(this.hasMiddleware(objecKey)){
      return this.#sharedObjects.get(objecKey);
    }
    return undefined;
  }
  
  getAllHandlersByMethod(method : string) : Map<string, IHandler> | undefined{
    
    switch(method){
      case "GET":
        return this.#getRoutesHandlers;
     
      case "POST":
        return this.#postRoutesHandlers;

      case "DELETE":
        return this.#deleteRoutesHandlers;

      case "PUT":
        return this.#putRoutesHandlers;

      case "HEAD":
        return this.#headRoutesHandlers;

      case "PATCH":
        return this.#patchRoutesHandlers;

      case "OPTIONS":
        return  this.#optionsRoutesHandlers;
      
      case "CONNECT":
        return  this.#connectRoutesHandlers;
      
      case "TRACE":
        return  this.#traceRoutesHandlers;
    
      case "GEN":
        return this.#genRoutesHandlers;
      default:
        return undefined;

    }
  }
  
  
  hasHandlerToMethodAndURL( method : string, url : string ): boolean{
    
    switch(method){
      case "GET":
        return this.#getRoutesHandlers.has(url);
      case "POST":
        return this.#postRoutesHandlers.has(url);
      case "DELETE":
        return this.#deleteRoutesHandlers.has(url);
      case "PUT":
        return this.#putRoutesHandlers.has(url);
      case "HEAD":
        return this.#headRoutesHandlers.has(url);
      case "PATCH":
        return this.#patchRoutesHandlers.has(url);
      case "OPTIONS":
        return this.#optionsRoutesHandlers.has(url);
      case "CONNECT":
        return this.#connectRoutesHandlers.has(url);
      case "TRACE":
        return this.#traceRoutesHandlers.has(url);
      default:
        return this.#genRoutesHandlers.has(url);
    }

  }
  getResponseByMethodAndURL(method : string , url : string, req : Request): Response{

    switch(method){
      case "GET":
        return  this.#getRoutesHandlers.get(url)?.handler(req)!;
      case "POST":
        return this.#postRoutesHandlers.get(url)?.handler(req)!;
      case "DELETE":
        return  this.#deleteRoutesHandlers.get(url)?.handler(req)!;
      case "PUT":
        return this.#putRoutesHandlers.get(url)?.handler(req)!;
      case "HEAD":
        return  this.#headRoutesHandlers.get(url)?.handler(req)!;
      case "PATCH":
        return  this.#patchRoutesHandlers.get(url)?.handler(req)!;
      case "OPTIONS":
        return this.#optionsRoutesHandlers.get(url)?.handler(req)!;
      case "CONNECT":
        return this.#connectRoutesHandlers.get(url)?.handler(req)!;
      case "TRACE":
        return this.#traceRoutesHandlers.get(url)?.handler(req)!;
      case "GEN":
        return this.#genRoutesHandlers.get(url)?.handler(req)!
      default:
        return this.#genRoutesHandlers.get(url)?.handler(req)!

    }
  }

  getResponseByURL(url : string, req : Request): Response{
    
    log.info(`Message from getResponseByURL`);

    let method = req.method;
    
    switch(method){
      case "GET":
        return this.#getRoutesHandlers.get(url)?.handler(req)!; 
      case "POST":
        return this.#postRoutesHandlers.get(url)?.handler(req)!;
      case "DELETE":
        return this.#deleteRoutesHandlers.get(url)?.handler(req)!;
      case "PUT":
        return this.#putRoutesHandlers.get(url)?.handler(req)!;
      case "HEAD":
        return this.#headRoutesHandlers.get(url)?.handler(req)!;
      case "PATCH":
        return this.#patchRoutesHandlers.get(url)?.handler(req)!;
      case "OPTIONS":
        return this.#optionsRoutesHandlers.get(url)?.handler(req)!;
      case "CONNECT":
        return this.#connectRoutesHandlers.get(url)?.handler(req)!;
      case "TRACE":
        return this.#traceRoutesHandlers.get(url)?.handler(req)!;
      case "GEN":
        return this.#genRoutesHandlers.get(url)?.handler(req)!
      default:
        return this.#genRoutesHandlers.get(url)?.handler(req)!
    }
  }
  
  
  
  addRouteHandlerMap(handlers : Map<string, IHandler>){
    
    handlers.forEach((handler,url)=>{
      
      let method = handler.getMethod();
      
      if(this.hasHandlerToMethodAndURL( method, url)){
        throw new Error(`Message from addRouteHandlerMap - URL ${url} already contains handler`);
      }else{
        switch(method){
          case "GET":
            this.#getRoutesHandlers.set(url, handler as GetHandler);
          break;
          case "POST":
            this.#postRoutesHandlers.set(url, handler as Post);
          break;
          case "DELETE":
            this.#deleteRoutesHandlers.set(url, handler as Delete);
          break;
          case "put":
            this.#putRoutesHandlers.set(url, handler as Put);
          break;
          case "HEAD":
            this.#headRoutesHandlers.set(url, handler as Head);
          break;
          case "PATCH":
            this.#patchRoutesHandlers.set(url, handler as Patch);
          break;
          case "OPTIONS":
            this.#optionsRoutesHandlers.set(url, handler as Options);
          break;
          case "CONNECT":
            this.#connectRoutesHandlers.set(url, handler as Connect);
          break;
          case "TRACE":
            this.#traceRoutesHandlers.set(url, handler as Trace);
          break;
          case "GEN":
            this.#genRoutesHandlers.set(url, handler as Handler);
          break;
          default:
          return false;
          
        }
      } 
      
    });
  }
  
  appendRouteHandler(url : string , handler : IHandler){
    
    let method = handler.getMethod();
    if(this.hasHandlerToMethodAndURL(method, url)){
      log.error(`Message from appendRouteHandler - URL ${url} already contains handler`);
    }
    else{
      this.addRouteHandler(url, handler);
    }
    return this;
  }
  
  addRouteHandler(url : string , handler : IHandler ) : void{
    console.log(`Inside addRouteHandler`);
    
    let method = handler.getMethod();
    
    console.log(`THE METHOPD IS ${method} and the url is ${url}`);

    if(this.hasHandlerToMethodAndURL(method, url)){
      throw new Error(`Message from addRouteHandler - URL ${url} already contains handler`);
    }else{
      
      switch(method){
        case "GET":
          this.#getRoutesHandlers.set(url, handler as GetHandler);
        break;
        case "POST":
          this.#postRoutesHandlers.set(url, handler as Post);
        break;
        case "DELETE":
          this.#deleteRoutesHandlers.set(url, handler as Delete);
        break;
        case "PUT":
          this.#putRoutesHandlers.set(url, handler as Put);
        break;
        case "HEAD":
          this.#headRoutesHandlers.set(url, handler as Head);
        break;
        case "PATCH":
          this.#patchRoutesHandlers.set(url, handler as Patch);
        break;
        case "OPTIONS":
          this.#optionsRoutesHandlers.set(url, handler as Options);
        case "CONNECT":
          this.#connectRoutesHandlers.set(url, handler as Connect);
        break;
        case "TRACE":
          this.#traceRoutesHandlers.set(url, handler as Trace);
        break;
        case "GEN":
          this.#genRoutesHandlers.set(url, handler);
        break;
        
        
      }
      
    } 
  }
}
export type {IHandler,IRoute};
export {Handler, GetHandler, Post, Delete, Put, Head, Patch, Options, Connect, Trace, DefaultErrHandler, AppContext};