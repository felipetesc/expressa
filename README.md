# expressa

To use this micro lib you can import from deno.land or directly from github, like so

Installation:
```typescript
  import { * } "https://deno.land/x/expressa@v0.0.1-alpha/mod.ts";
```

## Quick start:

First import the lib like we showed above, than create a new handler, such as:

```typescript

class SayGoodbyeHandler extends Handler{
    handler(request: Request): Response {
      let body = "Goodbye";
      return new Response(body, { status: 200 });
    }
}
```

The request parameter will give You access to everything needed. You should always return a new response.

Create a new conf class

```typescript

let confs = new AppConfigs();
confs.port = 3000;

```

After that (read the comments below):


```typescript
//create a new AppContext
const appCtx = new AppContext();

//add to the app context a new route to your handler
appCtx.appendRouteHandler("/goodbye", new SayGoodbyeHandler());

//Run your application
Expressa.run(AppConfigs.APP_PORT, appCtx);

```
