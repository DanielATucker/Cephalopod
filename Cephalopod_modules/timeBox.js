// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function timebox(grid, screen) {
  setInterval(()=> {

    let Now = strftime('%y%m%d %X', new Date(1307472705067))

    var TimeBox = grid.set(0, 0, 2, 2, blessed.box, {
      width: '100%',
      height: '100%',
      content: Now,
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'magenta',
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