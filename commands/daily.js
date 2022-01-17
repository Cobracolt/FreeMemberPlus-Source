const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
let cooldown = new Map();
const config = require('../config.json');

module.exports = {
  name: "daily",
  description: "Code modifier par >Nion#0001",
  execute: async(client, message, args, data, db) => {

    if (message.channel.id !== "ID DU SALON DAILY") return;
    
    let time = Date.now(); 
    if(cooldown.get(message.author.id) > time)
    { 
       const erreur = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`<:20:921359961005637632> Vous avez déjà récuperer votre récompense <@${message.author.id}>\n*Veillez attendre  \`1\` heures.*`)
      .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
      .setFooter(config.EmbedFooter)
      message.channel.send(erreur).then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error);return;}   
    
    
    db.add(`coins_${message.author.id}`, 1) 
    
    cooldown.set(message.author.id, time + 1800);

    data.logs.unshift(`[+1] - Daily bonus !`)
    db.set(`logs_${message.author.id}`, data.logs)

       const success = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`<a:giftfree:929564327747399741> **${message.author.tag}**, vous venez de récuperre \`1\` pièce.`)
      .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
      .setFooter(config.EmbedFooter)
      message.channel.send(success) 
  } 
   } 