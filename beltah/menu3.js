const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu3", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
╭────《《𝗕𝗥𝗬𝗔𝗡𝗧 𝗠𝗗》》────⬡
┴  ╭─────────────⬡
│❒⁠⁠⁠⁠│ *ADMIN* : ${s.OWNER_NAME}
│❒│⁠⁠⁠⁠ *CALENDER* : ${date}
│❒│⁠⁠⁠⁠ *PREFIX* : ${s.PREFIXE}
│❒⁠⁠⁠⁠│⁠⁠⁠ *BOT IS IN* : ${mode} mode
│❒│⁠⁠⁠⁠ *ORDERS* : ${cm.length} 
│❒│⁠⁠⁠⁠ *SPACE* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❒│⁠⁠⁠⁠ *CHROME* : ${os.platform()}
│❒│⁠⁠⁠⁠ *THEME* : *𝙱𝚁𝚈𝙰𝙽𝚃 𝚃𝙴𝙲𝙷*
┬  ╰──────────────⬡
╰─── ···▸ *✦𝚁𝙴𝚂𝙿𝙴𝙲𝚃 𝚃𝙷𝙸𝚂 𝚄𝚂𝙴𝚁✦* ··──⬡\n`;
    
let menuMsg = `
✇─────✇────✇ 
✇ *𝗕𝗥𝗬𝗔𝗡𝗧 𝗠𝗗* ✇
✇─────✇────✇


 *✦𝗕𝗥𝗬𝗔𝗡𝗧-𝗠𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦✦*
`;

    for (const cat in coms) {
        menuMsg += ` ╭─⬡ *${cat}* ⬡─`;
        for (const cmd of coms[cat]) {
            menuMsg += `
⬡│▸ ${cmd}`;
        }
        menuMsg += `
  ╰────────────··⬡ \n`
    }

    menuMsg += `
◇            ◇
*❒⁠⁠⁠⁠————————— ❒⁠⁠⁠⁠ ——————————❒⁠⁠⁠⁠*
|⏣ *RELEASED ON : 02.06.2024*

|⏣THANK YOU FOR CHOOSING 
    *𝗕𝗥𝗬𝗔𝗡𝗧 𝗠𝗗*
*❒⁠⁠⁠⁠—————————— ❒⁠⁠⁠⁠——————————❒⁠⁠⁠⁠*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryantmd*, déveloper Bryant Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Bryantmd*, déveloper Bryant Tech" }, { quoted: ms });
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
