// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  setInterval(()=> {

    let terminalContent = "terminal WILL GO HERE"


    var Terminal = contrib.log({ fg: "red", selectedFg: "green", label: 'Terminal'});


    var terminalBox = grid.set(5, 0, 3, 8, Terminal);  
  
    screen.render();
  
    return terminalBox;
  },1000);
};