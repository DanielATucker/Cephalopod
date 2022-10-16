// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var blessed = require('blessed')
, contrib = require('blessed-contrib')


export default function timebox(grid, screen) {
  setInterval(()=> {

    let StatsContent = "STATS WILL GO HERE"

    var StatsBox = grid.set(0, 6, 4, 2, blessed.box, {
      width: '100%',
      height: '100%',
      content: StatsContent,
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
  
    return StatsBox;
  },1000)
}