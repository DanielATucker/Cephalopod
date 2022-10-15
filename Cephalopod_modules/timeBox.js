// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')

var strftime = require('strftime')

export default function timebox(grid, screen) {
  setInterval(()=> {

    let Now = strftime('%y%m%d %H:%M.%S', new Date())

    var TimeBox = grid.set(0, 0, 2, 2, blessed.box, {
      width: '100%',
      height: '100%',
      content: Now,
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'red',
        bg: 'black',
        border: {
          fg: '#f0f0f0'
        },
        hover: {
          bg: 'green'
        }
      }
    });
    
  
    screen.render();
  
    return TimeBox;
  },1000)
}