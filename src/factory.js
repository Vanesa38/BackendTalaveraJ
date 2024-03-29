import DB_TYPE from "../config/config.js";
import DatabaseManagerMongo from "./mongo/dataBaseManager.js";
import DatabaseManagerMemory from "./memory/dataBaseManager.js";


let DATA;
switch (DB_TYPE) { 
  case "MONGO":
    console.log("iniciara con mongo");

    DATA = {
      CartManager: DatabaseManagerMongo.CartManager,
      ProductManager: DatabaseManagerMongo.ProductManager,
    };

    break;
  case "MEMORY":
    console.log("iniciara con memoria");
    DATA = {
      CartManager: DatabaseManagerMemory.CartManager,
      ProductManager: DatabaseManagerMemory.ProductManager,
    };
    break;
}
export default DATA;