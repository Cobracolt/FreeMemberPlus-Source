const Discord = require('discord.js')

module.exports = {
  execute: async(client) => {
   
    console.log(`FreeMember+ et connecter`)
    client.user.setPresence({ status: "online", activity:{name: `+help・>Nion#0001`, type: "WATCHING" }});
        setInterval(() => {
            client.user.setPresence({ status: "online", activity:{name: `Support -> .gg/j4jfr `, type: "WATCHING" }});
        }, 60000*60);
		

  } 
}
