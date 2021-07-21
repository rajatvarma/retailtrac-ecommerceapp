const crypto = require('crypto')

const key = 'hl4BPBic73^ui6nu'
const input = 'CID=6169&RID=SO121221613373&CRN=974883&AMT=786.06&VER=1&TYP=TEST&RTU=http%3A%2F%2Fpvanam.retailtrac360.com%3A8080%2FPaymentGatewayReturnURL&PPI=1&RE1=MN&RE2=&RE3=&RE4=&RE5=&CKS=2371707f6c31b0ba205b3aa02413596ecd44869db75cd54f3b943b3e81e6217b'

function getBytes(string) {
    var bytes = new Array
    for (var i=0; i < string.length; i++) {
        bytes.push(string.charCodeAt(i))
    }
    return bytes.toString()
}

let cipher = crypto.createCipheriv('aes-128-cbc', key, crypto.randomBytes(16));
let encrypted = cipher.update(input, 'utf8', 'base64');
encrypted += cipher.final('base64');

// const encryptedString = CryptoES.AES.encrypt(input, key, CryptoES.enc.Base64).toString()
console.log(encryptedString)

let decrypted = crypto.createDecipheriv('aes-128-ccm')