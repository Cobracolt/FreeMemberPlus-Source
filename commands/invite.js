const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");
const config = require('../config.json');
module.exports = {
  name: "add",
  aliases: ["invite", "link", "invites", "invs"],
  description: "",
  execute: async(client, message) => {
   
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    
    .setDescription(`Vous pouvez m\'ajouter sur votre serveur en cliquant [ici](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8).`)    
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setColor("#2f3136")
    message.channel.send(embed)
      
    
  } 
}