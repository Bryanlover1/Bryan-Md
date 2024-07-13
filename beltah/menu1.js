const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*BRYAN-MD AVAILABLE MENUS* 
╭─────────────────✣
│❒⁠⁠⁠⁠╭─────────────✣
│❒⁠⁠⁠⁠│▸ *MENU1* 
│❒⁠⁠⁠⁠│▸ *MENU2* 
│❒⁠⁠⁠⁠│▸ *MENU3*
│❒⁠⁠⁠⁠╰──────────────✇
│❒⁠⁠⁠⁠│▸ *PLUGINS* : ${cm.length} 
│❒⁠⁠⁠⁠│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❒⁠⁠⁠⁠│▸ *SAVER* : ${os.platform()}
│❒⁠⁠⁠⁠│▸ *THEME* : *❣️𝙱𝚁𝚈𝙰𝙽 𝚃𝙴𝙲𝙷❣️*
│❒⁠⁠⁠⁠╰──────────────✇
╰──────────────────✇\n`;
    
let menuMsg = `
╭─────────❒⁠⁠⁠⁠
   *𝙼𝙰𝙳𝙴 𝙱𝚈 𝙱𝚁𝚈𝙰𝙽 𝚃𝙴𝙲𝙷.𝙸𝙽𝙲😌*
╰─────────❒
   ⁠⁠⁠⁠◔͜͡◔MADE EASY BY BRYAN TECH◔͜͡◔
╰───────────────────⏣`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryantmd*, déveloper Bryan Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryanmd*, déveloper Bryan Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

}); 
