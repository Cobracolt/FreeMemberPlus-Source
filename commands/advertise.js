const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: "advertise",
  aliases: ["buy"],
  description: "Utilisé pour annoncer votre serveur et obtenir des membres sur votre serveur.",
  execute: async(client, message, args, data, db) => {
     let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || config.prefix;

    let amount = Number(args[0])

    const description = args.slice(1).join(" ")
    let needatleastcoins = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Je rappelle qu\'il faux au moins \`3\` pièces.*`)
    .setColor("#2f3136")
    
    if(amount < 3) return message.channel.send(needatleastcoins)
    if (data.coins < 3) return message.channel.send(needatleastcoins)
    let incorrectcommand = new Discord.MessageEmbed()
    .setDescription(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Je rappelle qu\'il faux au moins \`3\` pièces.*`)
    .setColor("#2f3136")

    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(incorrectcommand)

    if (amount > data.coins) return message.channel.send(needatleastcoins)

    amount = Math.round(amount)

    let link = data.code

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    let invitenotallowed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
       .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setDescription(`<:20:921359961005637632> Erreur : **Veuillez ne pas inclure de liens dinvitation**`)
    .setColor("#2f3136")
    let web = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
           .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setDescription(`<:20:921359961005637632> Erreur : **Veuillez ne pas inclure de liens d\'invitation**`)
    .setColor("#2f3136")
    let toolong = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
           .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    .setDescription(`<:20:921359961005637632> Erreur : **Votre description dépasse** \`75\` **mots**`)
    .setColor("#2f3136")
    if (description && description.includes("discord.gg")) return message.channel.send(invitenotallowed)
    if (description && description.includes("https://", "http://")) return message.channel.send(web)
    if (description && description.length > 75) return message.channel.send(toolong)
    


    await new Promise(resolve => setTimeout(resolve, 100))

    db.set(`code_${message.guild.id}`, link)

    data.logs.unshift(`[-${amount}] - Achat d\'une promotion pour ${message.guild.name}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\n<:invites:929560489372028948> [**Clique ici pour rejoindre**](https://discord.gg/${link})`)

    db.add(`orders_${message.guild.id}`, amount)

    db.subtract(`coins_${message.author.id}`, amount)
    
    let successembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    
    .setColor("#2f3136")
    .setDescription(`[<@${message.author.id}>] Vous venez  d\'acheté avec succès \`${amount}\` membres pour votre serveur.\nVous pouvez maintenant vérifier l\'état de votre commande de **${client.guilds.cache.get(message.guild.id).name}** avec \`+info\``)
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
    message.channel.send(successembed)
    let logchannel = client.channels.cache.get('ID DU SALON POUR ANNONCER LES NOUVELLE ACHAT')
    let embed = new Discord.MessageEmbed()
    
    .setColor("#2f3136")
    .setAuthor(client.user.username, client.user.displayAvatarURL())
     .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
     .setDescription("<:epingle:929228151387742249> Je viens t'annoncer qu'une personne à acheter une `promotion`. Donc fait vite la commande `+farm` pour rejoindre et gagner `1` pièces !")
    .addField(`Serveur :`, `${message.guild.name}`, false)
    
    logchannel.send(embed)
  }
}