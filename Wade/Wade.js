import { Express_Init_Start } from "./modules/express_init.js";
import { Database_init_start } from "./modules/database_init.js";


function Start() {
    new Promise(() => {
        try {
            let value = Express_Init_Start();
            resolveExpressInit(value);
        } catch (err) {
            rejectExpressInit(err)
        };
    });


    function resolveExpressInit() {
        Database_init_start();
    }

    function rejectExpressInit(err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    }
};

Start();