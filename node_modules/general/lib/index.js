var http = require('http');
var util = require('util');
var cp   = require('child_process');
var path = require('path');
var fs   = require('fs');

var Logger         = require('./logger');
var Monitor        = require('./monitor');
var Procfile       = require('./procfile');
var ProcessBuilder = require('./subproc');
var Environment    = require('./envvars');

var globalLogger   = Logger.New(process.stdout);

function start(envs,procfile,options){
    
    globalLogger.info('Starting All Processes');
    
    procfile.keys().forEach(function(key){
        
        // Write file to _both_ STDOUT and a Log File
        var logpath = path.join( options.logdir, key + '.log' )
        var stream  = fs.createWriteStream( logpath, {flags: 'a', mode:'0644'} );
        var logview = Logger.New(process.stdout);
        var logfile = Logger.New(stream);
        
        logview.prefix = util.format('%s'.white, key);
        logview.info('Starting Processes:',key);
        
        var command = procfile.process(key);
        var builder = ProcessBuilder.Create(command);
        
        // Add Environment Variables
        builder.env = envs;
        
        var monitor = Monitor.Create(builder);
        
        // Log to multiple destinations
        monitor.emitter.on('stdout', function(data){
            logview.pipe(data);
            logfile.pipe(data);
        });
        monitor.emitter.on('stderr', function(data){
            logview.pipe(data);
            logfile.pipe(data);
        });
        monitor.emitter.on('exit',   function(code){
            logview.done('Process #code{%s} Exited with Code #code{%d}', key, code);
            logfile.done('Process #code{%s} Exited with Code #code{%d}', key, code);
        });
        
        monitor.begin(key);
        
    });
}

// Attack!!!
function attack(options){
    
    // Load Procfile and Start Processes
    var procfile = Procfile.Load(options.procfile);
    var chunks   = [];
    var environ;
    
    // Load Environment from a File or STDIN
    if(options.environ == '-'){
        globalLogger.info('Loading Environment from STDIN');
        process.stdin.setEncoding('ascii');
        process.stdin.resume();
        environ = process.stdin;
    }else{
        globalLogger.info('Loading Environment from %s',options.environ);
        environ = fs.createReadStream(options.environ);
    }
    
    environ.on('data',function(chunk){
        chunks.push(chunk);
    })
    
    environ.on('end',function(){
        var envs   = Environment.Make( chunks.join('') );
        start(envs,procfile,options);
    })

}

module.exports.attack = attack
