// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const Gun = require('gun')


export default function CNS() {
  let startServer = function() {
    const app = express()
    const port = 3006

    app.use(Gun.serve)

    const server = app.listen(port, () => {
      console.log("Listening at: http://localhost://" + port)
    });

    Gun({web: server});
  };

  startServer();
};