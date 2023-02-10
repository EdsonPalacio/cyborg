const fs = require('fs');
const batepapo = JSON.parse(fs.readFileSync('https://raw.githubusercontent.com/EdsonPalacio/cyborg/main/arquivos/js/batepapo/batepapo.json'));


exports.insertp = async(type, info) => {
let keyword = (type == 'conversation') ? info.message.conversation : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.contextInfo.quotedMessage.conversation : ''
  
if (keyword.length > 40) return
if (keyword == '') return
  
async function check(key) {
let found = false
Object.keys(batepapo).forEach(i => {
if (batepapo[i].msg == key)
found = i
})
return found ? batepapo[found] : false
}
   
const verify = await check(keyword.toLowerCase())
if (type == 'conversation') {
if (verify) return 
batepapo.push({msg: info.message.conversation.toLowerCase(), messages: []})
fs.writeFileSync('https://raw.githubusercontent.com/EdsonPalacio/cyborg/main/arquivos/js/batepapo/batepapo.json', JSON.stringify(batepapo, null, 4))
} else if (type == 'extendedTextMessage') {
if (verify) {
verify.messages.push(info.message.extendedTextMessage.text.toLowerCase())
fs.writeFileSync('https://raw.githubusercontent.com/EdsonPalacio/cyborg/main/arquivos/js/batepapo/batepapo.json', JSON.stringify(batepapo, null, 4))
} else {
batepapo.push({msg: keyword.toLowerCase(), messages: [info.message.extendedTextMessage.text.toLowerCase()]})
fs.writeFileSync('https://raw.githubusercontent.com/EdsonPalacio/cyborg/main/arquivos/js/batepapo/batepapo.json', JSON.stringify(batepapo, null, 4))
}
}
}

exports.responsep = async(key) => {
let position = false
Object.keys(batepapo).forEach(i => {
if (batepapo[i].msg == key.toLowerCase())
position = i
})
return position ? batepapo[position].messages[Math.floor(Math.random() * batepapo[position].messages.length)] : false
}