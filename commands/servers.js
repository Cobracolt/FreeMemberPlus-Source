const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "farm",
  description: "servers",
  aliases: ["search"],
  execute: async(client, message, args, data, db) => {
   
    let orders = await db.startsWith(`orders_`, { sort: ".data" })
    
    let length = 2
    
    orders = orders.filter(x => x.data > 0 && client.guilds.cache.get(x.ID.split("_")[1]) && client.guilds.cache.get(x.ID.split("_")[1]).members.cache.get(message.author.id) === undefined)
    
    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor('FreeMember+', client.user.displayAvatarURL())
    
    .setDescription(`Rejoignez l\'un des serveurs en dessous \`⬇️\` pour gagner \`1\` pièce. \n\n`)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    for (let i = 0;i < orders.length;i++) {
     
      let handler = true
      
     if (length > 5) {} else {

       let id = orders[i].ID.split("_")[1]
     
       let guild = client.guilds.cache.get(orders[i].ID.split("_")[1]).name
     
        let code = await db.fetch(`code_${id}`)
     
       
        await client.fetchInvite("https://discord.gg/" + code)
       .then(link => { 
        console.log(`[+farm] -> Lien d\'invitation: discord.gg/` + link.code)
         if (link.code === null) handler = false 
       })
       .catch(error => {
         handler = false 
       }) 
       
       await new Promise(resolve => setTimeout(resolve, 1))
       
       if (handler) {
         let description = await db.fetch(`description_${id}`)
         embed.addField(`\`${guild}\``,  description, false)
          length++
     } 
   } 
 } 

 
    
    embed.addField(`<:info:929201887511719946> Vous voyez plus de serveur ?`, `Rejoignez notre serveur support pour avoir plus de [pièces](${config.supportServer})`, false)
    
    message.channel.send(embed)  
  } 
}