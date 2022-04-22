import { serve, parse, format } from "../deps/deps.ts";
import { AppConfigs } from "../utils/configs.ts";
import { AppContext , DefaultErrHandler } from "../handlers/handlers.ts";

function ServerBuilder(configs : AppConfigs) : Deno.Listener{
  configs.port = configs.port !== undefined ? configs.port : 3000; 
  const server = Deno.listen({ port: configs.port });
  let getUTCDate = new Date();
  let NOW = format(getUTCDate, "dd-MM-yyyy"); 
  console.log(`Starting server at port: ${configs.port} at ${NOW}`);
  return server;
}

async function RunForever(configs: AppConfigs, ctx : AppContext, safeExit : boolean = true ){
  
  const errHandler = new DefaultErrHandler();
  
  const server = ServerBuilder(configs);
  
  for await (const conn of server) {
    (async () => {
      
      const httpConn = Deno.serveHttp(conn);
      for await (const requestEvent of httpConn) {
        const req = requestEvent.request;
        const url = new URL(req.url).pathname;
        console.log(`URL is  ${url}`);
        const method = req.method;
        console.log(`req method  ${method}`);
        
        let hasHandler = ctx.hasHandlerToMethodAndURL(method, url);

        if(hasHandler){
          console.log(`Route exists`);
          requestEvent.respondWith(ctx.getResponseByMethodAndURL(method,url, req));
        }
        else{
          console.log(`Route doesn't exists`);
          console.log(`Create your custom handlers to deal the issue.`);
          requestEvent.respondWith(
            errHandler.handler(req)
            );   
          }
        }
      })();
    }
  }

class Expressa{
  
  private static create(port : number): Deno.Listener {
    const PORT = port;
    const server = Deno.listen({ port: PORT });
    let getUTCDate = new Date();
    let NOW = format(getUTCDate, "dd-MM-yyyy"); 
    console.log(`Starting server at port: ${PORT} at ${NOW}`);
    return server;
  }
  
  static async run(configs: AppConfigs, ctx : AppContext, safeExit : boolean = true ){
      RunForever(configs, ctx, safeExit);
    }
    
  }
  
export { Expressa, ServerBuilder, RunForever };