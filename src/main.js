var harvester = require('harvester');
var upgrader = require('upgrader');
var builder = require('builder');
var general = require('general');

var SPAWN_NAME = "S1";

var PARTS_BY_ROLE = {
    harvester: [WORK,CARRY,MOVE],
    upgrader: [WORK,CARRY,MOVE],
};

function spawnNeededCreeps(spawn)
{
    var hasHarvesters = false;
    var hasUpgrader = false;

    if (spawn.spawning) {
        switch (spawn.spawning.name.charAt(0)) {
        case 'H': hasHarvesters = true; break;
        case 'U': hasUpgrader = true; break;
        }
    }

    for (var name in Game.creeps) {
        switch(name.charAt(0)) {
        case 'H': hasHarvesters = true; break;
        case 'U': hasUpgrader = true; break;
        case 'B': break;
        default:
            console.error("unknown creep name " + creep.name);
        }
    }

    if (!hasHarvesters) {
        var newName = 'H' + Game.time;
        var res = spawn.spawnCreep(PARTS_BY_ROLE.harvester, newName);
        if (res == ERR_NOT_ENOUGH_ENERGY) console.error("not enough energy to spawn harvester");
        return;
    }

    if (!hasUpgrader) {
        var newName = 'U' + Game.time;
        spawn.spawnCreep(PARTS_BY_ROLE.upgrader, newName);
        if (res == ERR_NOT_ENOUGH_ENERGY) console.error("not enough energy to spawn upgrader");
        return;
    }
}

module.exports.loop = function()
{
    var spawn = Game.spawns[SPAWN_NAME];
    if (Game.time % 100 == 0) {
        general.cleanMemory();
    }
    if (Game.time % 10 == 0) {
        spawnNeededCreeps(spawn);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.name.charAt(0)) {
        case 'H': harvester.run(creep, spawn); break;
        case 'U': upgrader.run(creep); break;
        case 'B': builder.run(creep); break;
        default:
            console.error("unknown creep name " + creep.name);
        }
    }
}

// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
