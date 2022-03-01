
import { serve } from "https://deno.land/std@0.125.0/http/server.ts";
import { parse, format } from "https://deno.land/std@0.126.0/datetime/mod.ts";
import { AppContext , DefaultErrHandler } from "../handlers/handlers.ts";

function CreateServer(port : number) : Deno.Listener{
  const PORT = port;
  const server = Deno.listen({ port: PORT });
  let getUTCDate = new Date();
  let NOW = format(getUTCDate, "dd-MM-yyyy"); 
  console.log(`Starting server at port: ${PORT} at ${NOW}`);
  return server;
}


async function RunApp(port : number, ctx : AppContext, safeExit : boolean = true ){
    
  const errHandler = new DefaultErrHandler();
    const server = CreateServer(port);
    
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

  export { CreateServer, RunApp };