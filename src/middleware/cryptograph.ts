import { AES, enc, mode, pad } from 'crypto-js';

function setAesStr(data: any, key: string, iv: string) {
    let _key = enc.Base64.parse(enc.Base64.stringify(enc.Utf8.parse(key))),
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
    let key = 'lemonpai.cn shang hai china lwmc',
        iv = 'AAAAAAAAAAAAAAAAAAAAAA==';
    let code = setAesStr(data, key, iv);
    enc.Base64.parse(code);
    return code;
}

export function decode(data: any) {
    let key = 'lemonpai.cn shang hai china lwmc',
        iv = 'AAAAAAAAAAAAAAAAAAAAAA==';
    return getAesStr(data, key, iv);
}