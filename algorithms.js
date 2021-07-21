import * as crypto from 'expo-crypto'
import CryptoES from 'crypto-es'
// const qs = require('qs')

function getBytes(string) {
    var bytes = new Array
    for (var i=0; i < string.length; i++) {
        bytes.push(string.charCodeAt(i))
    }
    return bytes.toString()
}

function toHex(byteArray) {
    return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
}

export async function generateCheckSum(input) {
    // const hash = crypto.createHash('sha256')
    // // console.log(getBytes(input))
    // hash.update(getBytes(input))
    // const byteData = hash.digest()
    // const hexString = toHex(byteData)
    // return hexString.toString()
    const sha256 = CryptoES.algo.SHA256.create()
    sha256.update(input)
    const hash = sha256.finalize()
    return hash.toString(CryptoES.enc.Hex)
}

export function encryptForPayment(input, key) {
    const keyArray = CryptoES.enc.Utf8.parse(key)
    const encrypted = CryptoES.AES.encrypt(input, keyArray, {mode: CryptoES.mode.ECB, padding: CryptoES.pad.Pkcs7})
    // console.log(encrypted.ciphertext.toString(CryptoES.enc.Base64))
    // console.log(encrypted.key.toString(CryptoES.enc.Utf8))
    const encryptedString = encrypted.ciphertext.toString(CryptoES.enc.Base64)
    return encryptedString
}
