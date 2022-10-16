// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  let terminalContent = "terminal WILL GO HERE"
  
  refresh()
  
  function refresh() { 
    setInterval((get_Terminal)=> {
      var Terminal = grid.set(5, 0, 3, 8, contrib.log,({ fg: "red", selectedFg: "red", label: 'Terminal'}))

      Terminal.log("TEST")

      screen.render();
    
      get_Terminal(Terminal);
    });
  }

  function get_Terminal(Terminal){

  }
};