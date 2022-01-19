const Discord = require('discord.js')

module.exports = {
  execute: async(client, guild) => {
    
    let channel = client.channels.cache.get("ID DU SALON LOGS SERVEUR")
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTitle(`<a:join:931955506602467438> FreeMember+ à rejoint un serveur !`)
    .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setColor(`#2f3136`)
    .setDescription("<:info:929201887511719946> __Informations :__\n• **Nom:** \`"+ guild.name +"\`\n• **ID:** \`"+guild.id+"\`\n• **Propriétaire:** \`"+ guild.owner.user.tag +"\`\n• **Membres:** \`"+guild.memberCount+"\`")
    .setThumbnail(guild.iconURL())
    if (channel) channel.send(embed) 

  } 
} 
