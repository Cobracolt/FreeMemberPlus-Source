const Discord = require('discord.js');
const config = require('../config.json');
const { get } = require('../constructors/sqlite.js');
module.exports = {
  name: "addbal",
  aliases: ["addcoins", "addcoin"],
  description: "",
  execute: async(client, message, args, data, db) => {
//
    let owners = config.OwnerID;

    

    if (!owners.includes(message.author.id)) return

    let pay = Number(args[1])

    let embeded = new Discord.MessageEmbed()
    .setDescription(`❎ Syntax error : **${config.prefix}addbal <membre> <coins>**`)
    .setColor('#2f3136')
    if (!pay || isNaN(pay)) return message.channel.send(embeded)

    let user = message.mentions.users.first()
    let logchannel = client.channels.cache.get("ID DU SALON LOGS ADMIN")
    let embed = new Discord.MessageEmbed()
    .setTitle('FreeMember+ | Logs (AddBal Command)')
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`**User: <@${message.author.id}>**, viens dajouter **${pay}** pièce(s) à <@${user.id}>`)
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: "png", dynamic: true }))
    let embedede = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`<:pandacontent:929992555788124190> <@${user.id}> vous avez reçu \`${pay}\` pièce(s).`)
    .setColor('#2f3136')
    .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    message.channel.send(embedede)
    logchannel.send(embed)
    db.add(`coins_${user.id}`, pay)
    data.logs.unshift(`[+${pay}] - Pièces donner par un administrateur.`)
    db.set(`logs_${user.id}`, data.logs)

  }
}
