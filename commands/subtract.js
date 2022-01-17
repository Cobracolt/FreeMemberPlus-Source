const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "remove",
  aliases: ["coinsremove", "removecoins"],
  description: "removed coins from a user, owner only.",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID

    if (!owners.includes(message.author.id)) return;

    let pay = Number(args[1])
    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ ● Syntax error, please try again by doing : **${config.prefix}remove <membre> <coins>**`)
    .setColor('#2f3136')
    if (!pay || isNaN(pay)) return message.channel.send(embeded)

    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.slice(0, user.username.split(" ").length).join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()

    let subembed = new Discord.MessageEmbed()
    .setTitle('FreeMember+ | Logs (Remove Command)')
    .setDescription(`**User: <@${message.author.id}>**, **${pay}** <@${user.id}>`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    
    .setColor(`#2f3136`)
    message.channel.send(subembed)
    user.send(subembed)
    db.subtract(`coins_${user.id}`, pay)

    let logchannel = client.channels.cache.get("ID SALON LOGS ADMIN")
    let embed1 = new Discord.MessageEmbed()
    .setDescription(`<:info:929201887511719946> <@${user.id}> vous avez perdu \`${pay}\` pièces.`)
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor("#2f3136")
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    logchannel.send(embed1)

  }
}
