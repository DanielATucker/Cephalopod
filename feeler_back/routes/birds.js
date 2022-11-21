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
birdRouter.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
birdRouter.get('/about', (req, res) => {
  res.send('About birds')
})

export default birdRouter;