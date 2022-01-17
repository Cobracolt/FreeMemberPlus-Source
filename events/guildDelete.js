const Discord = require('discord.js')

module.exports = {
  execute: async(client, guild) => {

    let channel = client.channels.cache.get("929195392892026902")
 

const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setTitle(`<:leave:931955583786041374> FreeMember+ à quitter un serveur !`)
    .setColor(`#2f3136`)
    .setDescription("<:info:929201887511719946> __Informations :__\n• **Nom:** \`"+ guild.name +"\`\n• **ID:** \`"+guild.id+"\`\n• **Membres:** \`"+guild.memberCount+"\`")
    .setThumbnail(guild.iconURL())
    if (channel) channel.send(embed) 

  } 
} 