import * as crypto from 'expo-crypto'
import CryptoES from 'crypto-es'

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
    const sha256 = CryptoES.algo.SHA256.create()
    sha256.update(input)
    const hash = sha256.finalize()
    return hash.toString(CryptoES.enc.Hex)
}

export function encryptForPayment(input, key) {
    const keyArray = CryptoES.enc.Utf8.parse(key)
    const encrypted = CryptoES.AES.encrypt(input, keyArray, {mode: CryptoES.mode.ECB, padding: CryptoES.pad.Pkcs7})
    const encryptedString = encrypted.ciphertext.toString(CryptoES.enc.Base64)
    return encryptedString
}


export function ccavenue(input, key) {
    const hash = CryptoES.MD5(key)
    const keyMod = hash.toString(CryptoES.enc.Hex)
    const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
    const ivArray = CryptoES.enc.Utf8.parse(iv)
    const keyArray = CryptoES.enc.Hex.parse(keyMod)
    const encrypted = CryptoES.AES.encrypt(input, keyArray, {mode: CryptoES.mode.CBC, iv: ivArray})
    const encryptedString = encrypted.ciphertext.toString(CryptoES.enc.Hex)
    return encryptedString
}