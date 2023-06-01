/*
 * @Author: lynn 2871433485@qq.com
 * @Date: 2023-05-29 22:14:54
 * @LastEditors: lynn 2871433485@qq.com
 * @LastEditTime: 2023-05-31 14:51:44
 * @FilePath: /v3ts-lockin/src/components/Drawer/src/typing.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes';
import { ComputedRef } from 'vue';

export interface DrawerInstance {
  emitVisible?: (visible: boolean, uid: number) => void;
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void;
}

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDrawer: () => void;
  getVisible?: ComputedRef<boolean>;
}

export interface DrawerFooterProps {
  showOkBtn: boolean;
  showCancelBtn: boolean;
  cancelText: string;
  okText: string;
  okType: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default';
  okButtonProps: { prop: ButtonProps; on: {} };
}

export interface DrawerProps extends DrawerFooterProps {
  // isDetail?: boolean;
  // loading?: boolean;
  // showDetailBack?: boolean;
  visible?: boolean;
}
