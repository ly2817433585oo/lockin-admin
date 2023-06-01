/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-03-20 14:32:51
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-03-23 10:37:22
 * @FilePath: /v3ts-lockin/windi.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",
  plugins:[createEnterPlugin()],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      screens:{
        sm:'576px',
        md:'768px',
        lg:'992px',
        xl:'1200px',
        '2xl':'1600px'
      }
    },
  },
});

function createEnterPlugin(maxOutput = 6) {
  const createCss = (index:number,d='x') => {
    const upd = d.toUpperCase();
    return {
      [
        `*> .enter-${d}:nth-child(${index})`
      ]:{
        transform:`translate${upd}(50px)`
      },
      [
        `*> .-enter-${d}:nth-child(${index})`
      ]:{
        transform:`translate${upd}(-50px)`
      },
      [
        `* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`
      ]:{
        'z-index': `${10 - index}`,
        opacity: '0',
        animation:`enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode':'forwards',
        'animation-delay':`${(index * 1) / 10}s`,
      }
    }
  }
  const handler = ({addBase})=>{
    const addRawCss = {};
    for(let idx = 1;idx < maxOutput;idx++) {
      Object.assign(addRawCss,{
        ...createCss(idx,'x'),
        ...createCss(idx,'y')
      })
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]:{
        to:{
          opacity:'1',
          transform:'translateX(0)'
        }
      },
      [`@keyframes enter-y-animation`]:{
        to:{
          opacity:'1',
          transform:'translateY(0)'
        }
      }
    })
  }
  return {handler}
}
