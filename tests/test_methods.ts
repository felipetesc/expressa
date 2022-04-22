import { Expressa, AppConfigs, GetHandler , Post, Delete, Put, Head, Patch, Options, Connect, Trace, DefaultErrHandler, AppContext } from "../mod.ts";

class Get_HandlerTest extends GetHandler{
    
  handler(request: Request): Response {
      
      return new Response(request.method.toString(), { status: 200 });
  }
}
class Post_HandlerTest extends Post{
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Put_HandlerTest extends Put {
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Head_HandlerTest extends Head{
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Delete_HandlerTest extends Delete {
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Patch_HandlerTest extends Patch{
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Options_HandlerTest extends Options {
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Connect_HandlerTest extends Connect {
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
  class Trace_HandlerTest extends Connect {
    
    handler(request: Request): Response {
        
        let current_method = request.method;
        
        let body = current_method.toString();
        
        return new Response(body, { status: 200 });
      }
  }
let confs = new AppConfigs();
confs.port = 3000;

const appCtx = new AppContext();
appCtx.addRouteHandler("/", new Get_HandlerTest());
appCtx.addRouteHandler("/", new Post_HandlerTest());
appCtx.addRouteHandler("/", new Put_HandlerTest());
appCtx.addRouteHandler("/", new Delete_HandlerTest());
appCtx.addRouteHandler("/", new Head_HandlerTest());
appCtx.addRouteHandler("/", new Patch_HandlerTest());
appCtx.addRouteHandler("/", new Options_HandlerTest());
appCtx.addRouteHandler("/", new Connect_HandlerTest());
appCtx.addRouteHandler("/", new Trace_HandlerTest());
Expressa.run(confs, appCtx);