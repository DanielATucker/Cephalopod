// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  let Terminal = null;
  let terminalContent = "terminal WILL GO HERE";


  refresh(get_Terminal);

  function get_Terminal(TerminalIn){
    Terminal = TerminalIn
  }

  function refresh(callback) { 
    setInterval(()=> {
      var Terminal = grid.set(5, 0, 3, 8, contrib.log,({ fg: "red", selectedFg: "red", label: 'Terminal'}))

      Terminal.log(terminalContent);

      screen.render();
    
      callback(Terminal);
    });
  }

};