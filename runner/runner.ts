
import { serve, parse, format } from "../deps/deps.ts";

import { AppContext , DefaultErrHandler } from "../handlers/handlers.ts";

class Expressa{

  private static create(port : number): Deno.Listener {
    const PORT = port;
    const server = Deno.listen({ port: PORT });
    let getUTCDate = new Date();
    let NOW = format(getUTCDate, "dd-MM-yyyy"); 
    console.log(`Starting server at port: ${PORT} at ${NOW}`);
    return server;
  }

  static async run(port : number, ctx : AppContext, safeExit : boolean = true ){
    
    const errHandler = new DefaultErrHandler();
      const server = Expressa.create(port);
      
      for await (const conn of server) {
      (async () => {
          
          const httpConn = Deno.serveHttp(conn);
          for await (const requestEvent of httpConn) {
          const req = requestEvent.request;
          const url = new URL(req.url).pathname;
          console.log(`URL : ${url}`);
          
          if(ctx.urlExists(url)){
            if(req.method === "GET"){
              
            }
              console.log(`Route exists`);
              requestEvent.respondWith(ctx.getResponseByURL(url, req));
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

}

function ServerBuilder(port : number) : Deno.Listener{
  const PORT = port;
  const server = Deno.listen({ port: PORT });
  let getUTCDate = new Date();
  let NOW = format(getUTCDate, "dd-MM-yyyy"); 
  console.log(`Starting server at port: ${PORT} at ${NOW}`);
  return server;
}


async function RunForever(port : number, ctx : AppContext, safeExit : boolean = true ){
    
  const errHandler = new DefaultErrHandler();
    const server = ServerBuilder(port);
    
    for await (const conn of server) {
    (async () => {
        
        const httpConn = Deno.serveHttp(conn);
        for await (const requestEvent of httpConn) {
        const req = requestEvent.request;
        const url = new URL(req.url).pathname;
        console.log(`URL : ${url}`);
        
        if(ctx.urlExists(url)){
          if(req.method === "GET"){
            
          }
            console.log(`Route exists`);
            requestEvent.respondWith(ctx.getResponseByURL(url, req));
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

  export { Expressa, ServerBuilder, RunForever };