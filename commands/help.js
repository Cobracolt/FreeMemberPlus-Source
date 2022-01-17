const Discord = require('discord.js');
const client = new Discord.Client(); 
client.interaction = {}; 
const config = require('./config.json');
const DiscordButtons = require('discord-buttons'); 
const ButtonPages = require('discord-button-pages');
DiscordButtons(client);


client.on('ready', () => {
  console.log(`[V12 Buttons] connecter sur ${client.user.tag} !`);
});

client.on('clickButton', (button) => {
  ButtonPages.buttonInteractions(button, client.interaction);
});


    client.on('message', msg => {
  if (msg.content === '+help') {
    const embed1 = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        
       .setDescription(`● Si vous avez besoin d'aide, rejoignez notre [serveur support](${config.supportServer}).\n● \`FreeMember+\` a été créer par \`>Nion#0001\`.`)
    
    .addField("**__Liste des commande:__**", "\`+add`\ : Invitez le bot sur votre serveur\n\`+stats`\ : Voir les statistiques de FreeMember+\n\`+info`\ : Si vous souhaitez plus d'informations sur votre publicité.\n\`+money`\ : Pour voir toutes vos pièces\n\`+buy`\ : Pour acheter une publicité et gagner des membres\n\`+check`\ : Vérifiez si vous pouvez quitter le serveur\n\`+farm`\ : Trouvez des serveurs à rejoindre pour recevoir des pièces\n\`+pay`\ : Pour donner vos pièces à vos amis\n\`+giftcode`\: Pour créer une carte cadeaux", false)
    
    .addField("🔗 Links", `[Support](${config.supportServer}) ● [Add Me](https://discord.com/oauth2/authorize?client_id=931853036551290940&permissions=8&scope=bot)`, false)
    .setImage("https://share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
        .setColor('#2f3136');
        
    const embed2 = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
   .setDescription(`<:epingle:929228151387742249> **TUTORIEL <@929136655024128040>**\nQuand vous commencer avec notre système c\'est mieux de gagner qu\'elle que pièce soit en allant <:channel:929578867407077489>\`💸・free-pièces\` ([ici](https://discord.gg/j4jfr)) ou en fessent \`+farm\`.\nQuand vous aurez \`3 pièces\` *(vous pouvez vérifier avec la commande* \`+bal\`*)*, vous pourez par la suite faire \`+buy 3\` pour acheter \`3\` membres sur votre serveur Discord (Le bot doit être sur votre serveur et vous devez exécuter la commande sur votre serveur !)`)
    
     .setImage("https://images-ext-2.discordapp.net/external/TPRRlM1d7jIlDQz2TTuoSIYAt7g3DAzDwLApvWbZSkA/https/images-ext-1.discordapp.net/external/4DeaYQcsYoMmeYyfLXcXJU4ClNDBUxKNha2JOIqHn1c/https/share.creavite.co/f5GvKKVgvhoLj7Uf.gif")
        .setColor('#2f3136');
        
    
    
    const embedPages = [embed1, embed2];
    ButtonPages.createPages(client.interaction, msg, embedPages, 10 * 1000, "red", "➡️", "⬅️", "🗑");
  }
});

client.login(config.token1);