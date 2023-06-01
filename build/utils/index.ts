/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 17:48:36
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-17 18:25:07
 * @FilePath: /v3ts-lockin/build/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function isDevFn(mode: string): boolean {
  return mode === "development";
}

export function isProdFn(mode: string): boolean {
  return mode === "production";
}

/* 
    读取所有的环境变量文件
*/
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PORXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (err) {
        realName = "";
      }
    }
    ret[envName] = realName;
  }
  return ret;
}
