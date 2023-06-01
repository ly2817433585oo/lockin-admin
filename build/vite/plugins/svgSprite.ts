/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-17 16:08:23
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-23 23:35:47
 * @FilePath: /v3ts-lockin/build/vite/plugins/svgSprite.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild:boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
    svgoOptions:isBuild,
    symbolId:'icon-[dir]-[name]'
  })
  return svgIconsPlugin;

}