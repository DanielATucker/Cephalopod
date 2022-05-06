function Environment(){}

module.exports = {
    Make: function(file){
        // Make Environment from File or String
        var env = new Environment();
        file.split(/\n/).forEach(function(line){
            var items = line.split('=',2);
            
            // Need Key _and_ Value
            if(items.length < 2) return;
            
            var key   = items[0];
            var value = items[1];
            
            env[key]  = value;
        })
        return env;
    }
}
