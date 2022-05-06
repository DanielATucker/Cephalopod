var fs = require('fs');

function Command(string){
    if (!string) throw new Error('Cannot Initialize an Empty Command')
    this._commands = string.trim().split(' ')
}

Command.prototype.commands = function(){
    return this._commands.slice(1);
}

Command.prototype.command = function(){
    return this._commands[0];
}

function Procfile(){}

Procfile.prototype.keys = function(){
    return Object.keys(this._proces);
}

Procfile.prototype.process = function(key){
    return this._proces[key];
}

module.exports = {
    Load : function(file){
        // Load a Procfile from file
        var data = fs.readFileSync(file).toString().split(/\n/);
        var proc = new Procfile();
        proc._proces = {};
        data.forEach(function(line){
            var trimmed = line.trim();
            var items = trimmed.split(':',2);
            
            if(items.length != 2) return;
            
            var key   = items[0];
            var value = items[1];
            proc._proces[key] = new Command(value);
        })
        return proc;
    },
    Make : function(string){
        // Make a Procfile from a string
        throw new Error('Method Not Implemented')
    }
}
