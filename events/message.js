const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js') 
const freecoins = require('../events/coins.js')
const ms = require('ms')
const parse = require('parse-ms')
const config = require('../config.json')
module.exports = {
  execute: async (client, message, prefix, db) => {
    
    if (message.author.bot || message.channel.type === "dm") return
    
    
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let x = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || !x) return;
    
    let command = client.commands.get(x) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(x))
    
    if (!command) return
    
    let time = Date.now() - message.author.createdTimestamp
    
    if (time < 300) {
      let text = []
      time = Date.now() - message.author.createdTimestamp
      time = 300 - time 
      Object.entries(parse(time)).map((x, y) => {
        if (x[1] > 0 && y < 4) text.push(`**${x[1]} ${x[0]}**`) 
      })
      return message.channel.send({
        embed: {
          color: "#2f3136",
          title: `Sorry, ${message.author.username}.`,
          description: "Vous êtes nouveau sur Discord",
          fields: [
            {
              name: "Veuiller attendre :",
              value: text.join(", ") 
            } 
          ] 
        }
      }) 
    } 
    
    let data = await get(message, message.author) 
    
    let embed1 = new Discord.MessageEmbed()
    .setTitle('❎ Ban system')
    .setDescription(`❎ - Viens dêtre ban du **systeme**`)
    .setColor('#2f3136')
    .setFooter(config.EmbedFooter)
    if (data.banned == true && message.author.id !== "750348126363320380") return message.channel.send(embed1)
    
    try {
    command.execute(client, message, args, data, db)
    } catch(e) {
      message.channel.send(e.message) 
    } 
  } 
} 