var IN_DEBUG_MODE = true;

var general = {
    debug: function(msg) {
        if (IN_DEBUG_MODE) console.log(msg);
    },
    cleanMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
}
module.exports = general;