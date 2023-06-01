import { generateAntColors, primaryColor } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  // 通过ant-design 的方法生成由浅到深的主题色
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  // 获取ant-design 内置的 类名对应的 css
  const modifyVars = getThemeVariables({ dark });
  // primaryColorObj
  // {
  //   'primary-1': '#e3f4fc',
  //   'primary-2': '#a5d3f0',
  //   'primary-3': '#78b7e3',
  //   'primary-4': '#4f99d6',
  //   'primary-5': '#2a7dc9',
  //   'primary-6': '#0960bd',
  //   'primary-7': '#004496',
  //   'primary-8': '#002f70',
  //   'primary-9': '#001c4a',
  //   'primary-10': '#000c24'
  // }
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
  };
}
