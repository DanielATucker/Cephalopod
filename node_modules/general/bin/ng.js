#!/usr/bin/env node

var fs        = require('fs');
var path      = require('path');

var commander = require('commander');
var colors    = require('colors');

var general   = require('../lib/index');

commander
.option('-P, --procfile <FILE>', 'Load Processes from FILE', 'Procfile')
.option('-E, --environ  <PATH>', 'Read In Environment from PATH (use - for STDIN)', '-')
.option('-L, --logdir   <BASE>', 'Use BASE directory for logging application','.')

commander
.command('start')
.description('Run a Procfile')
.action(function(command){
    general.attack(commander);
})

commander
.command('upstart')
.description('Export Upstart Script')
.action(function(command){
    var file = path.join(__dirname, '..', 'share', 'upstart.conf');
    process.stdout.write( fs.readFileSync(file) );
})

commander.parse(process.argv);

if(commander.args.length==0) {
    console.log("          ☆    ☆    ☆    ☆                ".grey)
    console.log("    __   ___       ___  __                ".grey)
    console.log("   / _` |__  |\\ | |__  |__)  /\\  |      ".grey)
    console.log("   \\__> |___ | \\| |___ |  \\ /--\\ |___ ".grey)
    console.log()
    console.log("          ☆    ☆    ☆    ☆                ".grey)
    commander.help();
}
