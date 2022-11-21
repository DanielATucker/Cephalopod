// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export default function indexRouter() {
  console.log("index test");

  var express = require('express');
  var router = express.Router();

  router.use((req, res) => {
    console.log('Time: ', Date.now())
  })

  /* GET home page. */
  app.get('/', (req, res) => {
    res.send('INDEX')
  });
}
