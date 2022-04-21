import {AppContext, Handler} from "../handlers/handlers.ts";
import { Expressa, AppConfigs } from "../mod.ts";

class SayGoodbyeHandler extends Handler{
    handler(request: Request): Response {
      let body = "Goodbye";
      return new Response(body, { status: 200 });
    }
}

const appCtx = new AppContext();
appCtx.appendRouteHandler("/goodbye", new SayGoodbyeHandler());
Expressa.run(AppConfigs.APP_PORT, appCtx);
