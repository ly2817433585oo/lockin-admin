/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-21 17:11:42
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-22 09:34:56
 * @FilePath: /v3ts-lockin/src/utils/cache/storageCache.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { EncryptParams } from "@/utils/cipher";
import { cacheCipher } from "@/settings/encryptSetting";
import { AesEncryption } from "@/utils/cipher";
import { isNullOrUnDef } from "../is";

// 创建storage的参数类型
export interface CreateStorageParams extends EncryptParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

// 封装了storage类和加密方法
export const createStorage = ({
  prefixKey = "",
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  hasEncrypt = true,
  timeout = null,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("When hasEncrypt is true,the key or iv must be 16bits");
  }

  const encryption = new AesEncryption({ key, iv });

  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /*
      expire: Expiretion time in seconds  过期时间、以秒为单位
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire)
          ? new Date().getTime() + expire * 1000 // 当前时间加上expire秒
          : null,
      });
      // 判断内容是否需要加密
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        // 未设置过期时间或未过期返回解密后的值
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        // 如果过期了 就删除
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
      this.storage.clear();
    }
  };

  return new WebStorage();
};
