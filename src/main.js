var harvester = require('harvester');
var upgrader = require('upgrader');
var builder = require('builder');
var general = require('general');

var SPAWN_NAME = "Spawn1";

var PARTS_BY_ROLE = {
    0: [WORK,CARRY,MOVE],
    1: [WORK,CARRY,MOVE],
    2: [WORK,CARRY,MOVE]
};

var ROLES = {
    HARVESTER: 0,
    UPGRADER: 1,
    BUILDER: 2
};

function spawnCreep(spawn, role, roleName)
{
    let res = spawn.spawnCreep(PARTS_BY_ROLE[role], 'c' + Game.time,
        { memory: { role: role} });
    if (res == ERR_NOT_ENOUGH_ENERGY) console.log("not enough energy to spawn %s", roleName);
}

function spawnNeededCreeps(spawn)
{
    if (spawn.spawning) return;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.HARVESTER).length;
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.UPGRADER).length;
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.BUILDER).length;

    general.debug('#harvesters='+harvesters+' #upgraders='+upgraders);
    if (harvesters < 1 || (upgraders >= 1 && harvesters < 3)) {
        return spawnCreep(spawn, ROLES.HARVESTER, "harvester");
    }
    if (builders < 1) {
        return spawnCreep(spawn, ROLES.BUILDER, "builder");
    }
    if (upgraders < 2) {
        return spawnCreep(spawn, ROLES.UPGRADER, "upgrader");
    }
}

module.exports.loop = function()
{
    var spawn = Game.spawns[SPAWN_NAME];
    if (Game.time % 100 === 0) {
        general.cleanMemory();
    }
    if (Game.time % 10 === 0) {
        spawnNeededCreeps(spawn);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
        case ROLES.HARVESTER: harvester.run(creep, spawn); break;
        case ROLES.UPGRADER: upgrader.run(creep); break;
        case ROLES.BUILDER: builder.run(creep); break;
        default:
            console.log("unknown creep name " + creep.name);
        }
    }
};

// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
