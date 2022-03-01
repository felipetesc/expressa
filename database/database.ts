import { AppConfigs, DatabaseConfigs } from "../utils/configs.ts";

interface IDatabase{
    connect(dbconfig : DatabaseConfigs) : any;
}

type DBConn = Promise<object>;

class Database implements IDatabase{
    
    async connect(dbconfig: AppConfigs): DBConn {
        throw new Error("Method not implemented.");
    } 
}
export { Database };
export type { DBConn, IDatabase };
