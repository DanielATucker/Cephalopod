// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
var contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  let Terminal = null;
  let terminalContent = "terminal WILL GO HERE";

  function refresh(screen) { 
    setInterval(()=> {
      var terminalBox = grid.set(5, 0, 3, 8, blessed.box({
        width: '100%',
        height: '100%',
        content: terminalContent,
        tags: true,
        border: {
          type: 'line'
        },
        style: {
          fg: 'red',
          bg: 'black',
          border: {
            fg: 'red'
          },
          hover: {
            bg: 'black'
          }
        },
      }));

      Terminal.focus();

      screen.render();
    });

    refresh();

  /*
  refresh(get_Terminal);

  function get_Terminal(TerminalIn){
    Terminal = TerminalIn
  }

  function refresh(callback) { 
    setInterval(()=> {
      var Terminal = grid.set(5, 0, 3, 8, contrib.log,({ fg: "red", selectedFg: "red", label: 'Terminal'}));

      Terminal.log(terminalContent);

      screen.render();
    
      callback(Terminal);
    });
  }
  */
 }
};