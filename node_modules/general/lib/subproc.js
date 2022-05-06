var cp = require('child_process');

function ProcessBuilder(){}

ProcessBuilder.prototype.start = function(){
    var options = {
        env: this.env
    }
    return cp.spawn(this.command.command(), this.command.commands(), options);
}

module.exports = {
    Create: function(command){
        // Create a SubProcess from a Command object
        var sub = new ProcessBuilder();
        sub.command = command
        
        return sub;
    }
}
