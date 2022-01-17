const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
  name: "order",
  aliases: ["info"],
  description: "info sustem",
  execute: async(client, message, args, data, db) => {
   
    if (data.code == 0) 
    { 
       const erreur = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setColor('#2f3136')
      .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre serveur dans ma base de données... Mais aucun achat n\'a été effectué pour ce serveur.`)
      .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
      message.channel.send(erreur).then(msg => {msg.delete({ timeout: 12000 })}).catch(console.error);return;}   
    
    let bar = []
    
    let progress = data.uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10)
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`) 
    }
    
    let warn = ""
    
    await client.fetchInvite('https://discord.gg/' + data.code).catch(e => warn = "Le lien d'invitation pour ce serveur a expiré !  Veuillez passer une nouvelle commande ou personne ne pourra vous rejoindre !")
    
   const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`${message.guild.name}`)
    
    .setDescription(`Membres commandés: **${data.orders}**\nTotal members: **${data.uses}/${data.orders}**`)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")

    message.channel.send(warn, embed) 
  } 
} 