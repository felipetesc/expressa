# expressa


Installation:
```typescript
  import { * } "https://deno.land/x/expressa@v0.0.1-alpha/mod.ts";
```

## Quick start:

Start by creating a new handler, such as:

```typescript
import {Handler} from "https://deno.land/x/expressa@v0.0.1-alpha/mod.ts";

export class SayGoodbyeHandler extends Handler{
    handler(request: Request): Response {
      let body = "Goodbye";
      
      return new Response(body, { status: 200 });
    }
}
```

The request parameter will give You access to everything needed. You should always return a new response.

After the creation of Your handler(s) it's time to add them to your application context and create a relation to a certain path. Before doing that though, we need to create a new application context:

```typescript

import { AppContext, RunApp } from "https://deno.land/x/expressa@v0.0.1-alpha/mod.ts";
const appCtx = new AppContext();

```
Once we have the AppContext, we add to it a new route and Handler, like so:

```typescript

appCtx.appendRouteHandler("/goodbye", new SayHelloHandler())

```

Finally, we run the application:

```typescript

RunApp(ExpressaConfigs.APP_PORT, appCtx);

```






