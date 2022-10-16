// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function terminalbox(grid, screen) {
  setInterval(()=> {

    let terminalContent = "terminal WILL GO HERE"

    var terminalBox = grid.set(5, 0, 3, 8, blessed.box, {
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
          bg: 'green'
        }
      }
    });
    
  
    screen.render();
  
    return terminalBox;
  },1000)
}