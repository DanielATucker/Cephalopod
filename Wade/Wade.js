import { Express_Init_Start } from "./modules/express_init.js";
import { Database_init_start } from "./modules/database_init.js";



function Start() {
    Express_Init_Start();

    setTimeout(() => {
        Database_init_start();
    }, 3000);
};


Start();