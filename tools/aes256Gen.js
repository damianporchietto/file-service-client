const crypto = require('crypto');
const aesKey = crypto.randomBytes(32)
const aesKeyHex = aesKey.toString('hex')
console.log('AES-256 Key:', aesKeyHex)