// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  setInterval(()=> {
    var terminalBox = grid.set(8, 6, 4, 2, contrib.log, 
        { fg: "green"
        , selectedFg: "green"
        , label: 'Server Log'})
  
    screen.render();
  
    return terminalBox,
  },1000);
};