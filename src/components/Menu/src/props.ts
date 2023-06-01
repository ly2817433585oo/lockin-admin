/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-04-03 10:15:00
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-09 16:36:52
 * @FilePath: /v3ts-lockin/src/components/Menu/props.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置:  x https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Menu } from '@/router/types';
import type { Prop, PropType } from 'vue';

import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { ThemeEnum } from '@/enums/appEnum';
import type { MenuTheme } from 'ant-design-vue';
import type { MenuMode } from 'ant-design-vue/lib/menu/src/interface';
import { propTypes } from '@/utils/propTypes';

// export interface basicPropsModule {
//   items: PropType<Menu[]>;
//   collapsedShowTitle: boolean;
//   inlineIndent: number;
//   mode: PropType<MenuMode>;
//   type: PropType<MenuTypeEnum>;
//   theme: PropType<MenuTheme>;
//   inlineCollapsed: boolean;
//   mixSider: boolean;
//   isHorizontal: boolean;
//   accordion: boolean;
//   beforeClickFn: PropType<(key: string) => Promise<boolean>>;
// }

// export interface contentPropsModule {
//   item: Menu;
//   showTitle: boolean;
//   level: number;
//   isHorizontal: boolean;
// }

// export interface itemProps {
//   item: Partial<Menu>;
//   level: number;
//   theme: PropType<ThemeEnum>;
//   showTitle: boolean;
//   isHorizontal: boolean;
// }

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: propTypes.bool,
  // 最好是 4 的倍数
  inlineIndent: propTypes.number.def(20),
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE,
  },
  // menu type
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX,
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: ThemeEnum.DARK,
  },
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,
  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>,
  },
};
export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: () => ({}),
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
};
export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true),
};
