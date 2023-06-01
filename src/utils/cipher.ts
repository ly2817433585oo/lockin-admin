/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 16:36:37
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-21 17:04:06
 * @FilePath: /v3ts-lockin/src/utils/cipher.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEi
 */
// 加密解密

import { encrypt, decrypt } from "crypto-js/aes";
import { parse } from "crypto-js/enc-utf8";
// Converts a hex string to a word array 将16进制字符串转化为单词
import ECB from "crypto-js/mode-ecb";
import UTF8 from "crypto-js/enc-utf8";
import pkcs7 from "crypto-js/pad-pkcs7";

export interface EncryptParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key;
  private iv;

  constructor(opt: Partial<EncryptParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = parse(key);
    }
    if (iv) {
      this.iv = parse(iv);
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }

  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}
