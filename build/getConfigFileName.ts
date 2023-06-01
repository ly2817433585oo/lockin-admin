/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-24 16:49:14
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-24 17:12:36
 * @FilePath: /v3ts-lockin/build/getConfigFileName.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// \D：表示非数字

// \w：表示一个字 [0－9a-zA-Z_]
// \W：表示除[0－9a-zA-Z_]之外的字符
// \s 表示空白字符（空格、tab、换页符等） \S 表示非空白字符
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};
