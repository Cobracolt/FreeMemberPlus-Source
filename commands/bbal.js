const Discord = require('discord.js');
const { get } = require('../constructors/sqlite.js');
const config = require('../config.json');
module.exports = {
  name: "bbalance",
  aliases: ["bbal"],
  description: "",
  execute: async(client, message, args, data, db) => {
   
     
  
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first() || message.author
    
    
    if (user.username === undefined) user = user.user
    
    data = await get(message, user)
    
    let logs = []
    
    data.logs.map((x, y) => {
      if (y < 1) logs.push(x)
    })
    
    const embed = new Discord.MessageEmbed()
    .setAuthor("FreeMember+", client.user.displayAvatarURL())
    .setDescription(`Bonjour, ${user.username} à \`${data.coins.toFixed(1)}\` pièce(s) 💰`)
    .addField(`<:cartebancaire:914498177183391744> __**C'est dernières opérations**__`, logs.length == 0 ? "Aucune historique de transactions trouvé !" : logs.join("\n"))
    .setColor("#2f3136")
    .setThumbnail("https://cdn.discordapp.com/attachments/633366106530381838/768753019130478612/233-2333229_money-bag-emoji-transparent-transparent-background-money-bag.png")
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    message.channel.send(embed) 
  } 
}