const Discord = require('discord.js');
const { get } = require('../constructors/sqlite.js');
const config = require('../config.json');
module.exports = {
  name: "pay",
  aliases: [],
  description: "pay coins",
  execute: async(client, message, args, data, db) => {
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "+";

    let amount = args.filter(x => !x.startsWith("<@"))[0]

    
    let embeded = new Discord.MessageEmbed()
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Vous devez avoir 1 pièces*`)
    .setColor('#2f3136')
    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(embeded)

    let user = message.mentions.users.first()


    /*-------------------------------------------------------------------------*/
    let errorembed = new Discord.MessageEmbed()
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Vous devez avoir 1 pièces*`)
    .setColor(`#2f3136`)
    
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    /*-------------------------------------------------------------------------*/
    let minimumbruh = new Discord.MessageEmbed()
    
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Vous devez avoir 1 pièces*`)
    .setColor(`#2f3136`)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    /*-------------------------------------------------------------------------*/
    let thisisbotbruh = new Discord.MessageEmbed()
    
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Vous devez avoir 1 pièces*`)
    .setColor(`#2f3136`)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    /*-------------------------------------------------------------------------*/
    let youcantpay = new Discord.MessageEmbed()
    
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Vous devez avoir 1 pièces*`)
    .setColor(`#2f3136`)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    /*-------------------------------------------------------------------------*/

    if (data.coins < Number(amount)) return message.channel.send(errorembed)

    if (Number(amount) < 1) return message.channel.send(minimumbruh)

    if (user.id === message.author.id) return message.channel.send(youcantpay)

    if (user.bot) return message.channel.send(thisisbotbruh)

    /*-------------------------------------------------------------------------*/

    let paidDMembed = new Discord.MessageEmbed()
    
    
    .setDescription(`<a:10:921359148476682270> Hey <@${message.author.id}>, Vous avez envoyer \`${amount}\` pièces à <@${user.id}> !`)
    
    
    .setColor('#2f3136')
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    
    message.channel.send(paidDMembed)

    /*-------------------------------------------------------------------------*/
        // message.channel.send(`Vous avez payé \`${amount}\` pièces, à ${user}`)
    /*-------------------------------------------------------------------------*/
    let paidembed = new Discord.MessageEmbed()
    
    .setDescription(`<@${message.author.id}> vous a envoyé **${amount}** pièces !`)
    
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#2f3136')
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    user.send(paidembed)
    /*-------------------------------------------------------------------------*/

    data.logs.unshift(`[-${amount}] - Vous avez payer ${user.tag}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.subtract(`coins_${message.author.id}`, Number(amount))

    data = await get(message, user)

    data.logs.unshift(`[+${amount}] - ${message.author.tag}  vous à payer.`)

    db.set(`logs_${user.id}`, data.logs)

    db.add(`coins_${user.id}`, Number(amount))
    
    let logchannel = client.channels.cache.get(`ID DU SALON LOGS ADMIN`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    
    .setDescription(`Pièces payer par: **${message.author.tag} (${message.author.id})**\nPièces payées à: **${user.tag} (${user.id})**\nTotal: **${amount}** piéces !`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTimestamp()
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    logchannel.send(embed)
    
  }
}