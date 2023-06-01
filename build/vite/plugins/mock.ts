/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-29 20:02:42
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-29 20:04:46
 * @FilePath: /v3ts-lockin/build/vite/plugins/mock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {viteMockServe} from 'vite-plugin-mock'

export function configMockPlugin(isBuild:boolean) {
  return viteMockServe({
    ignore:/^\_/,
    mockPath:'mock',
    localEnabled:!isBuild,
    prodEnabled:isBuild,
   injectCode:`
    import {setupProdMockServer} from '../mock/_createProductionServer';
    
    setupProdMockServer();
   ` 
  })
}