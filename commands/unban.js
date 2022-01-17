const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "unban",
  description: "unbans an user from the bot, owner only.",
  execute: async(client, message, args, data, db) => {

    let owners = config.OwnerID;

    if (!owners.includes(message.author.id)) return

    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()

    const membernotfound = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`❎ ● I can't find this person`)
    .setFooter(config.EmbedFooter)
    if (user === undefined) return message.channel.send(membernotfound)

    let embedd = new Discord.MessageEmbed()
    .setTitle('❎ Unban system')
    .setDescription(`<@${message.author.id}>, You are now unbanned.`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: 'png', dynamic: true }))


    if (await db.fetch(`banned_${user.id}`) == true) 
	message.channel.send(embedd)



    let banned = await db.fetch(`banned_${user.id}`)

    if (banned == false) return message.channel.send(`${user.tag} n'est pas ban.`)
    db.set(`banned_${user.id}`, false)
    let unbannedchannel = client.channels.cache.get("ID SALON LOGS ADMIN")
    let can = new Discord.MessageEmbed()
    .setTitle('✔️ Unban system')
    .setDescription(`Name: **${user.username}**\nID: **${user.id}**\nUnban by: <@${message.author.id}>`)
    .setFooter(config.EmbedFooter, user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setColor('#2f3136')
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    unbannedchannel.send(can)
    
  }
}
