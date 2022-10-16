// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  setInterval(()=> {

    let terminalContent = "terminal WILL GO HERE"


    var log = grid.set(5, 0, 3, 8, contrib.log, 
  { fg: "red"
  , selectedFg: "red"
  , label: 'Terminal'})
  
    screen.render();
  
    return terminalBox,
  },1000);
};