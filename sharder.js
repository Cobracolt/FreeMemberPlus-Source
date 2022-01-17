const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

//Pour start le bot #1

const manager = new ShardingManager('./bot.js', {
    token: token,
    totalShards: 1
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));

//=========================

//Pour start le bot #2

const test = new ShardingManager('./bot-1.js', {
    token: token,
    totalShards: 1
});

test.spawn();
test.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));

//=========================

//Pour start le bot #1

const help = new ShardingManager('./commands/help.js', {
    token: token,
    totalShards: 1
});

help.spawn();
help.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));

//=========================

//Pour start le bot #2

const helpred = new ShardingManager('./commands/helpred.js', {
    token: token,
    totalShards: 1
});

helpred.spawn();
helpred.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));

//=========================

//Pour start le dashboard (n'est pas dans le Github)

//const dash = new ShardingManager('./dash/run.js', {
    //token: token,
    //totalShards: 1
//});

//dash.spawn();
//dash.on('shardCreate', shard => console.log(`[Shard] -> #${shard.id} viens de ce connecter`));
