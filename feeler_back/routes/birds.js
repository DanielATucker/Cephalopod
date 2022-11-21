// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const birdRouter = express.Router()

// middleware that is specific to this router
birdRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
birdRouter.get('/get_birds', (req, res) => {
  res.send('Birds home page')
})

export default birdRouter;