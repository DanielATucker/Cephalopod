// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
var contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  let Terminal = null;
  let text = null;
  let terminalContent = "terminal WILL GO HERE";

  refresh(get_Terminal);

  function get_Terminal(TerminalIn, textIn){
    Terminal = TerminalIn
    text = textIn
  }

  function refresh(callback) { 
    setInterval(()=> {
      var TerminalIn = grid.set(6, 0, 3, 8, blessed.textarea, ({
        parent: screen,
        width: '100%',
        height: '100%',
        border: {
          type: 'line'
        },
        inputOnFocus: true,
        style: {
          border: {
            fg: 'red'
          }
        }
      }));

      TerminalIn.key(['enter'], () => TerminalIn.submit());
      TerminalIn.key(['escape'], () => TerminalIn.cancel());
      TerminalIn.on('submit', () => {
        let text = TerminalIn.getValue();

        callback(TerminalIn, text)

        TerminalIn.destroy();
      });
      TerminalIn.on('cancel', () => {
        TerminalIn.destroy();
      });
      TerminalIn.focus();
    });
  }
};