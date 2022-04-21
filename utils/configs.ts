class AppConfigs{
    
    public port : number = 3000;
    public name : string = "eXpressa";
    public version : string = "0.0.1";
    public author : string =  "expressa";
    public license : string = "Mit";
    public database : DatabaseConfigs | undefined;

}

class DatabaseConfigs{
    
    name? : string;
    host? : string;
    port? : number;
    user? : string;
    pass? : string;
  
}

export { AppConfigs, DatabaseConfigs };
