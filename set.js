const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0NuNTlsdTRDUXVsUFdvNFUrZFAySWJuc1MrMWNDWmsvY1NPZ2lrZGtVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkZRSFFkVHFkUVlGRnZaa3hhNlQ2N1JxamdXVFFtSkF0dTQ5Nk1wRDEzaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TlhxVkZGVFN1dnFtWmxTczlwOXBOdDdlNVZoZ3VtUUh5MEg3SGRWNkVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNcXY2Q0N4TzM0bmdmblgxOWRyZVN1QVMzOUlKVW5LSDFsdU0vVG0wMGl3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZBOThNeEN5VGxZMXNDdXR6S3FCbTBkOXFNMHdZTVBDWTJCZUdPcmNoMmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxPV0R5SUxPc09MTVpETFJxR052R0tOQTJ4WTJncG9VS3RYREV1cE5UR0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JITUxvUGF0ZGV4S2lqT1I3MU1WVjB4eWhCa3BRdkoweE9rWEt3MTdrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTRHejZTa0NSU2ZHMWttTWdyR1h5cktlOUtYM3JIOForcXR4cmN2aUlScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlQeUZaWG9FMlFna01hR2FoaTBtUmtGdmMwVGlOQTVoNVp2eUhkVEhSYlRxcExnam5SL0ptaTBFK2ljdmQrL0tQSmVjNUVVd2RPd0ZLNU9YeFNqS2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6ImVPcktrR2E4QWVKSjVPQ3pmNkhFQ3pTUzhLYy92emowRTcyOHNONUNQK1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzkxMDM0NjRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjk5ODEzMjEwMzYyRTJDODBEMkQzODRGNDFGNUYyMjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzM4NTE1MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQkpKQWFKanNUTm1vbEY3NnR2bUtUQSIsInBob25lSWQiOiI1M2IwZjlmMC1lMWJmLTQ1NzEtYWU5NS0yODE5NzlhYjdlYmYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOURTdm1QV1NrTTF5YS9EVkxWd1BWK1pDK0drPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ4UVdSRUMya0lRT1k0VDcxRjVPUjhPU1VvOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJISkw3UjdQTiIsIm1lIjp7ImlkIjoiNTA5MzkxMDM0NjQ6MjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVs2HzL9JzYfMv1DNh8y/8J2QgPCdkKfwnZCo8J2Qp/CdkLLwnZCm8J2QqPCdkK7wnZCs8J2QlPCdkLPwnZCu8J2QpvCdkJrwnZCkaSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTW1TNFBBRkVLK2MxN2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRWs5b3dlOTJjbGRuWG0rTUtmZ1JWZ04vOW85UzA1SVl6RFRoc0YrNGUwMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZFU2RGh1REgxMTNsZDEvUXZpNnQ2RU40Tnc2M0tQY2FQbEdCZWlkdFdyR2ZQNU1kM0NzbTFIRXlGcDlpbE9hSUgvQUNib0NkUFh0UGZ0SFZLd09jQXc9PSIsImRldmljZVNpZ25hdHVyZSI6ImlzTUlNK3NwVXZ4QW9zMlRwY1ZMc1VkNGFndzl1THRZK25mWnJsQnRrOTVZcUFTYmtwdzlQdWV6Z1cvaDk5R05PTVZleVY1UnU4ZVhhM0ZRRGliSGh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzkxMDM0NjQ6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkpQYU1IdmRuSlhaMTV2akNuNEVWWURmL2FQVXRPU0dNdzA0YkJmdUh0TiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzM4NTE0NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLY3YifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
