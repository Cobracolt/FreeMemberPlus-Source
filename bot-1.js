const http = require ('http');
const express = require('express');
const app = express();
const { RichEmbed } = require("discord.js");
const config = require('./config.json');
const Discord = require('discord.js');
var cron = require('node-cron');
const client = new Discord.Client({ fetchAllMembers: false, messageCacheMaxSize: 5 }); 
const db = require('quick.db');
const fs = require('fs');
client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")); 
for (const commands of files) {
  const command = require(`./commands/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 
client.on("ready", async () => {
  const event = require('./events/ready-red.js').execute(client, db) 
})
client.on("message", async message => {
  let prefix = "&"
  try {
  const event = require('./events/message.js').execute(client, message, prefix, db) 
  } catch(e) {
    return message.channel.send(e.message) 
  } 
})
client.on("message", msg =>{
  const emmbed = new Discord.MessageEmbed()
    .setColor(`#2f3136`)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setDescription(`Mon prefix est : \`&\`\nUtilise \`&help\` pour avoir de l\'aide.`)
    
  if(msg.content === `<@L'ID-DE-VOTRE-BOT>`){
    msg.channel.send(emmbed);
  }
})
client.on("guildMemberAdd", async member => {
  const event = require('./events/guildMemberAdd.js').execute(client, member, db) 
})
client.on("guildMemberRemove", async member => {
  const event = require('./events/guildMemberRemove.js').execute(client, member, db) 
})

client.on("guildCreate", async guild => {
  console.log("[Event] -> Nouveau serveur rejoins") 
  const event = require('./events/guildCreate.js').execute(client, guild) 
}) 

client.on("guildDelete", async guild => {
  console.log("[Event] -> Je viens de quitter un serveur") 
  const event = require('./events/guildDelete.js').execute(client, guild) 
}) 


client.login(config.token2)
