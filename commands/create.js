const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json');
module.exports = {
    name: "giftcode",
    description: "",
    execute: async(client, message, args, data, db) => {

      if(args[0] == 'create') {

        let COINS = Number(args[1])
        if (!COINS || isNaN(COINS) || COINS < 1) return message.channel.send(`<:20:921359961005637632> Commande incorrecte !\nPour acheter une carte-cadeau, faite \`+giftcode create <NombreDePièces> <Code>\``)
        if (COINS > data.coins) return message.channel.send(`<:20:921359961005637632> J\'ai essayer de trouver votre solde dans ma base de données... Mais j\'ai remarquer que vous n\'aviez pas assès de pièces.\n*Essayez de rejoindre certains serveurs*`)
        COINS = Math.round(COINS)

      let CODE = args[2]
      message.reply(`[GiftCode] -> Vérifier vos message privé !`)
      message.delete()
      let embed = new Discord.MessageEmbed()
   
      
      .addField(`Nom du code kdo :`, `${CODE}`, false)
      
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
      .setColor("#2f3136")
      
      message.author.send(embed)
      await new Promise(resolve => setTimeout(resolve, 100))
      db.add(`code_` + CODE, COINS)
      db.subtract(`coins_${message.author.id}`, Number(COINS))
      data.logs.unshift(`[-${COINS}] - Création d\'une carte cadeau.`)

      db.set(`logs_${message.author.id}`, data.logs)

      } else if(args[0] === 'redeem') {
        REDEEMINGCODE = args[1]
        let COINSTOADD = db.fetch(`code_` + REDEEMINGCODE)
        if (COINSTOADD == null || COINSTOADD == 0) {
              message.channel.send('Ce code a déjà été utilisé ou n\'est pas valide !')
            } else {
                const redeemed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                   .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
                
                .setDescription(`<a:giftfree:929564327747399741> Tu viens de récupérer \`${COINSTOADD}\` pièces !`)
                message.channel.send(redeemed)
          data.logs.unshift(`[+${COINSTOADD}] - Réclamation d\'un code cadeau.`)
          db.set(`logs_${message.author.id}`, data.logs)
          db.add(`coins_${message.author.id}`, COINSTOADD)
          db.subtract(`code_` + REDEEMINGCODE, COINSTOADD)
            }
        } else {
          let helpembed = new Discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setImage("https://images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
          .setDescription(`\`+giftcode create <10> <MonCode>\` : Si vous voulez offrir une carte kdo à un amis\n\`+giftcode redeem <MonCode>\` : Pour récupere un code kdo`)
          
          
          .setColor('#2f3136')
        message.channel.send(helpembed)
        }
    
     }

  }