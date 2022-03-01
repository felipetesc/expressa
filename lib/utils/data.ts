import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import {existsSync } from "https://deno.land/std/fs/mod.ts";

class AssetsBufferizer{
  
  static getDataFromRelPath(relPath : string) : Uint8Array {
    let curDir = Deno.cwd();
    let isWindows = os.platform() == "windows" ? true : false;
    let path = "";
    if(isWindows){
      path = curDir + "\\" + relPath.replaceAll("/", "\\");
    }else{
      path = curDir + "/" + relPath;
    }
    if (!existsSync(relPath)) return new Uint8Array();
    return  Deno.readFileSync(path);
  }
  static getDataFromFullPath(fullPath : string) : Uint8Array {
    return (fullPath !== undefined ? Deno.readFileSync(fullPath) : new Uint8Array()) ;
  }

}

class BlankFavicon{
  
  static bufferizedIcon() : Uint8Array{
    let exePath = Deno.cwd();
    let partial_str = "/expressa-app/assets/favicon.ico";
    let isWindows = os.platform() == "windows" ? true : false;
    
    if(isWindows){
      partial_str = partial_str.replaceAll("\\", "/");
    }

    exePath = exePath + partial_str;
    
    return  Deno.readFileSync(exePath);
    
  }
}
export { AssetsBufferizer, BlankFavicon };