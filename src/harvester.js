var harvester = {

    /** @param {Creep} creep **/
    run: function(creep, spawn) {
        if (spawn.energy == spawn.energyCapacity) return;

        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            let res = creep.transfer(spawn, RESOURCE_ENERGY);
            switch (res) {
            case OK:
                general.debug('spawn energy %d out of %d', spawn.energy, spawn.energyCapacity);
                if (spawn.energy == spawn.energyCapacity) {
                    console.log('Spawn is full of energy :-)');
                }
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
                break;
            }
        }
    }
};

module.exports = harvester;