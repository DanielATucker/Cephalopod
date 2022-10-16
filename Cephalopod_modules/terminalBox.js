// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
var contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  let Terminal = null;
  let terminalContent = "terminal WILL GO HERE";

  refresh()

  function refresh() { 
    setInterval(()=> {
      var Terminal = grid.set(5, 0, 3, 8, blessed.textbox, ({
        top: 4,
        left: 5,
        height: 3,
        inputOnFocus: true,
        fg: 'red',
        border: {
          type: 'line',
        },
        style: {
          fg: 'red',
          bg: 'blue',
          border: {
            fg: 'red'
          },
        }
      }));

      Terminal.focus();
    });
  };

};
