import { AES, enc, mode, pad } from 'crypto-js';

function setAesStr(data: any, key: string, iv: string) {
    let _key = enc.Base64.parse(key),
        _iv = enc.Base64.parse(iv);
    let code = AES.encrypt(data, _key, {
        iv: _iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return code.toString(); 
}

function getAesStr(code: string, key: string, iv: string) {
    let _key = enc.Base64.parse(key),
        _iv = enc.Base64.parse(iv);
    let decode = AES.decrypt(code, _key, {
        iv: _iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return decode.toString(enc.Base64);
}

export function encode(data: any) {
    let key = 'lemon',
        iv = '12345678987654321';
    let code = setAesStr(data, key, iv);
    enc.Base64.parse(code);
    return code;
}

export function decode(data: any) {
    let key = 'lemon',
        iv = '12345678987654321';
    return getAesStr(data, key, iv);
}