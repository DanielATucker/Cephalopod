var events = require('events');

// It's called Viagra because it's job is to keep it up
function Viagra(processBuilder){
    this.processBuilder = processBuilder;
    this.emitter        = new events.EventEmitter();
}

Viagra.prototype._run  = function(){
    var _this = this;
    this.process = this.processBuilder.start();
    var onStdout = function(data){
        _this.emitter.emit('stdout',data);
    }
    var onStderr = function(data){
        _this.emitter.emit('stderr',data);
    }
    this.process.stdout.on('data', onStdout);
    this.process.stderr.on('data', onStderr);
    this.process.on('exit',function(code){
        _this.emitter.emit('exit', code);
        _this._run();
    })
}

Viagra.prototype.begin = function(key){
    if(this.key) throw new Error('Already Started');
    this.key = key;
    this._run();
}

Viagra.prototype.stop = function(){
    
}

module.exports = {
    Create: function(pb){
        return new Viagra(pb);
    }
}
