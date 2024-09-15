import CryptoJS from 'crypto-js';


export const encryptText = (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
};

export const decryptText = (encryptedText, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};


