const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
const config = require('../config.json');
module.exports = {
  name: "money",
  aliases: ["bal", "balance"], 
  description: "log of coins",
  execute: async(client, message, args, data, db) => {
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || message.author
    if (user.username === undefined) user = user.user
    data = await get(message, user)
    let page = Number(args[0]) 
    if (!page || isNaN(page) || page < 1) page = 1
    let obj = { min: page * 10 - 10, max: page * 1 }
    let tpages = 1
    let n = 1
    data.logs.map((x, y) => {
      if (y == 1) n += 1, tpages++
    })
    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ Error, veuillez réessayer en faisant : **${config.prefix}money <page_id>**`)
    .setColor('#2f3136')
    if (page > tpages) return message.channel.send(embeded)
    let logs = []
    data.logs.map((x, y) => {
      if (y >= obj.min && y < obj.max) logs.push(x)
    }) 

    let embed = new Discord.MessageEmbed()
    
    .setAuthor("FreeMember+", client.user.displayAvatarURL())
    .setDescription(`Bonjour ${user.username}, Vous avez \`${data.coins.toFixed(1)}\` pièce(s) 💰`)
    .addField("> Rejoint les serveur dans `+farm` pour gagner des **pièces**.\n", "> Obtenez des membres en achetant une publicité avec `+buy`.", true)
    .addField(`<:cartebancaire:914498177183391744> __**Vos dernières opérations**__`, logs.length == 0 ? "Aucune historique de transactions trouvé !" : logs.join("\n")) 
    .setColor("#2f3136")
    .setThumbnail("https://cdn.discordapp.com/attachments/633366106530381838/768753019130478612/233-2333229_money-bag-emoji-transparent-transparent-background-money-bag.png")
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    
    
    message.channel.send(embed)
  } 
}