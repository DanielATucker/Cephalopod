// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  setInterval(()=> {

    let terminalContent = "terminal WILL GO HERE"


    var terminalBox = grid.set(5, 0, 3, 8, blessed.terminal, ({
        parent: screen,
        cursor: 'block',
        cursorBlink: true,
        screenKeys: false,
        label: ' multiplex.js ',
        left: '50%-1',
        top: 0,
        width: '50%+1',
        height: '50%',
        border: 'line',
        style: {
          fg: 'red',
          bg: 'black',
          focus: {
            border: {
              fg: 'red'
            }
          }
        }
      }));
  
    screen.render();
  
    return terminalBox, Terminal;
  },1000);
};